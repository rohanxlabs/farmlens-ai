import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const { signInWithEmail, signUpWithEmail } = useAuth()

  if (!isOpen) return null

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
      onClose()
      if (onSuccess) onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setError(null)
    setIsSignUp(false)
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '16px'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#0A0F0A',
          border: '1px solid rgba(74,222,128,0.15)',
          borderRadius: '20px',
          padding: '32px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 32px 64px rgba(0,0,0,0.5), 0 0 80px rgba(74,222,128,0.06)',
          position: 'relative'
        }}
      >
        <button
          onClick={() => { onClose(); resetForm() }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            color: 'rgba(240,253,244,0.4)',
            fontSize: '20px',
            cursor: 'pointer',
            lineHeight: 1
          }}
        >
          ×
        </button>

        <h2 style={{ color: '#F0FDF4', fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>
          {isSignUp ? 'Create account' : 'Welcome back'}
        </h2>
        <p style={{ color: 'rgba(240,253,244,0.5)', fontSize: '13px', marginBottom: '24px' }}>
          {isSignUp ? 'Sign up to save your scans and history' : 'Sign in to continue to FarmLens AI'}
        </p>

        {error && (
          <div
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: '10px',
              padding: '10px 14px',
              marginBottom: '16px',
              color: '#EF4444',
              fontSize: '13px'
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
              cursor: 'pointer',
              marginTop: '4px'
            }}
          >
            {loading ? 'Please wait...' : isSignUp ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <button
          onClick={() => { setIsSignUp(!isSignUp); setError(null) }}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(240,253,244,0.5)',
            fontSize: '13px',
            cursor: 'pointer',
            marginTop: '12px',
            width: '100%'
          }}
        >
          {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
        </button>
      </div>
    </div>
  )
}
