import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function AuthForm() {
  const { signInWithEmail, signUpWithEmail } = useAuth()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (isSignUp) {
        await signUpWithEmail(email, password)
      } else {
        await signInWithEmail(email, password)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '320px' }}>
      <h3 style={{ color: '#F0FDF4', fontSize: '16px', fontWeight: 600, margin: 0 }}>
        {isSignUp ? 'Create account' : 'Sign in'}
      </h3>
      {error && (
        <p style={{ color: '#EF4444', fontSize: '13px', margin: 0 }}>{error}</p>
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '10px',
          padding: '10px 14px',
          color: '#F0FDF4',
          fontSize: '14px',
          outline: 'none'
        }}
      />
      <input
        type="password"
        placeholder="Password (6+ chars)"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        minLength={6}
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '10px',
          padding: '10px 14px',
          color: '#F0FDF4',
          fontSize: '14px',
          outline: 'none'
        }}
      />
      <button
        type="submit"
        disabled={loading}
        style={{
          background: 'rgba(74,222,128,0.2)',
          border: '1px solid rgba(74,222,128,0.4)',
          borderRadius: '10px',
          padding: '10px',
          color: '#4ADE80',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        {loading ? 'Please wait...' : isSignUp ? 'Sign up' : 'Sign in'}
      </button>
      <button
        type="button"
        onClick={() => { setIsSignUp(!isSignUp); setError(null) }}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'rgba(240,253,244,0.5)',
          fontSize: '13px',
          cursor: 'pointer'
        }}
      >
        {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
      </button>
    </form>
  )
}
