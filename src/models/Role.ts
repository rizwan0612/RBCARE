import pool from '../config/database';

export interface Role {
  id?: number;
  role_name: string;
}

export class RoleModel {    

    static async findAll(): Promise<Role[]> {
      const [rows] = await pool.query('SELECT id,role_name FROM roles');
      return rows as Role[];
    }
    
  }