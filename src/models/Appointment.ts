import pool from '../config/database';

export interface Appointment {
    id?: number;
    patient_id: number;
    doctor_id: number;
    appointment_date: Date;
    start_time: string;
    end_time: string;
    created_at?: Date;
    updated_at?: Date;
}

export class AppointmentModel {

    static async findAll(): Promise<Appointment[]> {
        const [rows] = await pool.query('SELECT * FROM appointments');
        return rows as Appointment[];
    }

    static async findById(id: number): Promise<Appointment | null> {
        const [rows] = await pool.query('SELECT * FROM appointments WHERE id = ?', [id]);
        return (rows as Appointment[])[0] || null;
    }

    static async create(doctor: Appointment): Promise<Appointment> {
        const [result] = await pool.query(
            'INSERT INTO appointments (patient_id, doctor_id, appointment_date, start_time, end_time, created_at, '
            + 'updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [doctor.patient_id, doctor.doctor_id, doctor.appointment_date, doctor.start_time, doctor.end_time, doctor.created_at, doctor.updated_at]
        );

        // Handle potential null with type assertion
        const createdDoctor = await this.findById((result as any).insertId);
        if (!createdDoctor) {
            throw new Error('Failed to create appointment');
        }

        return createdDoctor;
    }

    static async update(id: number, patient: Appointment): Promise<Appointment> {
        await pool.query(
            'UPDATE appointments SET patient_id = ?, doctor_id=?, appointment_date= ?, start_time= ?, end_time=?, updated_at=? WHERE id = ?',
            [patient.patient_id, patient.doctor_id, patient.appointment_date, patient.start_time, patient.end_time, patient.updated_at, id]
        );

        const updatedUser = await this.findById(id);
        if (!updatedUser) {
            throw new Error('Department not found after update');
        }

        return updatedUser;
    }

    static async delete(id: number): Promise<void> {
        await pool.query('DELETE FROM appointments WHERE id = ?', [id]);
    }

}