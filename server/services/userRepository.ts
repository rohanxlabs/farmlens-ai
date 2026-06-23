import { pool } from '../db/pool'

export interface DbUser {
  id: string
  email: string
  password_hash: string
  created_at: string
}

export async function findUserByEmail(email: string): Promise<DbUser | null> {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email.toLowerCase()]
  )
  return result.rows[0] || null
}

export async function findUserById(id: string): Promise<DbUser | null> {
  const result = await pool.query(
    'SELECT * FROM users WHERE id = $1',
    [id]
  )
  return result.rows[0] || null
}

export async function createUser(email: string, passwordHash: string): Promise<DbUser> {
  const result = await pool.query(
    'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
    [email.toLowerCase(), passwordHash]
  )
  return result.rows[0]
}
