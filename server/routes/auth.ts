import { Router } from 'express'
import { findUserByEmail, createUser } from '../services/userRepository'
import { hashPassword, comparePassword } from '../services/password'
import { createSessionToken } from '../services/sessionToken'
import { requireAuth, AuthedRequest } from '../middleware/auth'

const router = Router()

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password || password.length < 6) {
      return res.status(400).json({ error: 'Valid email and password (6+ chars) required' })
    }

    const existing = await findUserByEmail(email)
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists' })
    }

    const passwordHash = await hashPassword(password)
    const user = await createUser(email, passwordHash)
    const token = createSessionToken({ id: user.id, email: user.email })

    res.json({ token, user: { id: user.id, email: user.email } })
  } catch (err) {
    console.error('Signup error:', err)
    res.status(500).json({ error: 'Signup failed' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }

    const user = await findUserByEmail(email)
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const valid = await comparePassword(password, user.password_hash)
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = createSessionToken({ id: user.id, email: user.email })
    res.json({ token, user: { id: user.id, email: user.email } })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Login failed' })
  }
})

router.get('/me', requireAuth, (req: AuthedRequest, res) => {
  res.json({ user: req.user })
})

export default router
