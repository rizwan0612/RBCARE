import pool from '../config/database';

export interface Department {
    id?: number;
    department_name: string;
    description: string;
    created_at?: Date;
    updated_at?: Date;
}

export class DepartmentModel {

    static async findAll(): Promise<Department[]> {
        const [rows] = await pool.query('SELECT id,department_name,description FROM departments');
        return rows as Department[];
    }

    static async findById(id: number): Promise<Department | null> {
        const [rows] = await pool.query('SELECT * FROM departments WHERE id = ?', [id]);
        return (rows as Department[])[0] || null;
    }

    static async create(doctor: Department): Promise<Department> {
        const [result] = await pool.query(
            'INSERT INTO departments (department_name, description, created_at, '
            + 'updated_at) VALUES (?, ?, ?, ?)',
            [doctor.department_name, doctor.description, doctor.created_at, doctor.updated_at]
        );

        // Handle potential null with type assertion
        const createdDoctor = await this.findById((result as any).insertId);
        if (!createdDoctor) {
            throw new Error('Failed to create task');
        }

        return createdDoctor;
    }

    static async update(id: number, patient: Department): Promise<Department> {
        await pool.query(
            'UPDATE departments SET department_name = ?, description=?, updated_at=? WHERE id = ?',
            [patient.department_name, patient.description, patient.updated_at, id]
        );

        const updatedUser = await this.findById(id);
        if (!updatedUser) {
            throw new Error('Department not found after update');
        }

        return updatedUser;
    }

    static async delete(id: number): Promise<void> {
        await pool.query('DELETE FROM departments WHERE id = ?', [id]);
    }

}