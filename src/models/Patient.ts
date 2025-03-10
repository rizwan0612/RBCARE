import pool from '../config/database';

export interface Patient {
  id?: number;
  patient_number: string;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  gender: string;
  phone_number: string;
  address: string;
  email_address: string;
  emergency_contact_name: string;
  emergency_contact_number: string;
  created_at?: Date;
  updated_at?: Date;
  birthdate?: Date;
  hi_no: string;
}

export class PatientModel {
  static async findAll(): Promise<Patient[]> {
    const [rows] = await pool.query('SELECT * FROM patients');
    return rows as Patient[];
  }

  static async findById(id: number): Promise<Patient | null> {
    const [rows] = await pool.query('SELECT * FROM patients WHERE id = ?', [id]);
    return (rows as Patient[])[0] || null;
  }

  static async create(patient: Patient): Promise<Patient> {
    const [result] = await pool.query(
      'INSERT INTO patients (first_name, last_name, gender, phone_number, address,'
      + 'email_address, emergency_contact_name, emergency_contact_number, created_at, '
      + 'updated_at, patient_number, birthdate, hi_no) VALUES (?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?)',
      [patient.first_name, patient.last_name, patient.gender, patient.phone_number,
      patient.address, patient.email_address, patient.emergency_contact_name,
      patient.emergency_contact_number, patient.created_at, patient.updated_at,
      patient.patient_number, patient.birthdate, patient.hi_no]
    );

    // Handle potential null with type assertion
    const createdPatient = await this.findById((result as any).insertId);
    if (!createdPatient) {
      throw new Error('Failed to create task');
    }

    return createdPatient;
  }

  static async update(id: number, patient: Patient): Promise<Patient> {
    await pool.query(
      'UPDATE patients SET address = ?, email_address=?, phone_number=?, emergency_contact_name=?, emergency_contact_number=?, updated_at=?, birthdate=?,  hi_no= ? WHERE id = ?',
      [patient.address, patient.email_address, patient.phone_number, patient.emergency_contact_name, patient.emergency_contact_number, patient.updated_at, patient.birthdate, patient.hi_no, id]
    );

    const updatedUser = await this.findById(id);
    if (!updatedUser) {
      throw new Error('User not found after update');
    }

    return updatedUser;
  }

  static async delete(id: number): Promise<void> {
    await pool.query('DELETE FROM patients WHERE id = ?', [id]);
  }

  static async findByPatientNo(patient: Patient): Promise<Patient | null> {
    const [rows] = await pool.query('SELECT * FROM patients WHERE patient_number = ?', [patient.patient_number]);
    return (rows as Patient[])[0] || null;
  }
}