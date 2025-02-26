import pool from '../config/database';

export interface Doctor {
  id?: number;
  first_name: string;
  last_name: string;
  gender: string;
  phone_number: string;
  address: string;
  email_address: string;
  created_at?: Date;
  updated_at?: Date;
  birthdate?: Date;
  license_number: string;
}

export class DoctorModel {
  static async findAll(): Promise<Doctor[]> {
    const [rows] = await pool.query('SELECT * FROM doctors');
    return rows as Doctor[];
  }

  static async findById(id: number): Promise<Doctor | null> {
    const [rows] = await pool.query('SELECT * FROM doctors WHERE id = ?', [id]);
    return (rows as Doctor[])[0] || null;
  }

  static async create(doctor: Doctor): Promise<Doctor> {
    const [result] = await pool.query(
      'INSERT INTO doctors (first_name, last_name, gender, phone_number, address,'
      + 'email_address, created_at, '
      + 'updated_at, birthdate, license_number) VALUES (?, ?, ?, ?, ? ,?, ?, ?, ?, ?)',
      [doctor.first_name, doctor.last_name, doctor.gender, doctor.phone_number,
      doctor.address, doctor.email_address, doctor.created_at, doctor.updated_at, doctor.birthdate, doctor.license_number]
    );

    // Handle potential null with type assertion
    const createdDoctor = await this.findById((result as any).insertId);
    if (!createdDoctor) {
      throw new Error('Failed to create task');
    }

    return createdDoctor;
  }

  static async update(id: number, patient: Doctor): Promise<Doctor> {
    await pool.query(
      'UPDATE doctors SET address = ?, email_address=?, phone_number=?, updated_at=?, birthdate=?,  license_number= ? WHERE id = ?',
      [patient.address, patient.email_address, patient.phone_number, patient.updated_at, patient.birthdate, patient.license_number, id]
    );

    const updatedUser = await this.findById(id);
    if (!updatedUser) {
      throw new Error('Doctor not found after update');
    }

    return updatedUser;
  }

  static async delete(id: number): Promise<void> {
    await pool.query('DELETE FROM doctors WHERE id = ?', [id]);
  }

  static async findByDoctorNo(patient: Doctor): Promise<Doctor | null> {
    const [rows] = await pool.query('SELECT * FROM doctors WHERE license_number = ?', [patient.license_number]);
    return (rows as Doctor[])[0] || null;
  }
}