import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'
const EXPIRES_IN = '7d'

export interface SessionPayload {
  id: string
  email: string
}

export function createSessionToken(user: SessionPayload): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: EXPIRES_IN })
}

export function verifySessionToken(token: string): SessionPayload {
  return jwt.verify(token, JWT_SECRET) as SessionPayload
}
