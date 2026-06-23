import { Request, Response, NextFunction } from 'express'
import { verifySessionToken, SessionPayload } from '../services/sessionToken'

export interface AuthedRequest extends Request {
  user?: SessionPayload
}

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  const token = header.slice('Bearer '.length)

  try {
    req.user = verifySessionToken(token)
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired session' })
  }
}
