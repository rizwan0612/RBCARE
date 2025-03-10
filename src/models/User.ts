import pool from '../config/database';

export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
  address: string;
  phone: string;
  role_id: number;
  created_at?: Date;
  updated_at?: Date;
  status: number;
  birthdate: Date;
}

export class UserModel {

  static async findByLoginId(user: User): Promise<User | null> {
    const [rows] = await pool.query('SELECT * FROM user WHERE email = ? and password = ? and status=1', [user.email, user.password]);
    return (rows as User[])[0] || null;
  }

  static async findAll(): Promise<User[]> {
    const [rows] = await pool.query('SELECT * FROM user');
    return rows as User[];
  }

  static async findById(id: number): Promise<User | null> {
    const [rows] = await pool.query('SELECT * FROM user WHERE id = ?', [id]);
    return (rows as User[])[0] || null;
  }

  static async create(user: User): Promise<User> {
    const [result] = await pool.query(
      'INSERT INTO user (username, password, email,role_id,created_at,updated_at,address,phone,birthdate) VALUES (?,?, ?, ?, ?, ?, ?, ?,?)',
      [user.username, user.password, user.email, user.role_id, user.created_at, user.updated_at, user.address, user.phone, user.birthdate]
    );

    // Handle potential null with type assertion
    const createdUser = await this.findById((result as any).insertId);
    if (!createdUser) {
      throw new Error('Failed to create task');
    }

    return createdUser;
  }

  static async update(id: number, user: User): Promise<User> {
    await pool.query(
      'UPDATE user SET password = ?, role_id = ?, status = ?, updated_at = ?, address = ?, phone = ?, birthdate=? WHERE id = ?',
      [user.password, user.role_id, user.status, user.updated_at, user.address, user.phone, user.birthdate, id]
    );

    const updatedUser = await this.findById(id);
    if (!updatedUser) {
      throw new Error('User not found after update');
    }

    return updatedUser;
  }

  static async resetPassword(user: User): Promise<User> {
    await pool.query(
      'UPDATE user SET password = ? WHERE email = ?',
      [user.password, user.email]
    );

    const updatedUser = await this.findByEmail(user);
    if (!updatedUser) {
      throw new Error('User not found after update');
    }

    return updatedUser;
  }

  static async findByEmail(user: User): Promise<User | null> {
    const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', [user.email]);
    return (rows as User[])[0] || null;
  }

  static async delete(id: number): Promise<void> {
    await pool.query('DELETE FROM user WHERE id = ?', [id]);
  }
}