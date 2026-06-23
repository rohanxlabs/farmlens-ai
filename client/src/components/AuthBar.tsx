import { useAuth } from '../context/AuthContext'
import AuthForm from './AuthForm'
import UserMenu from './UserMenu'

export default function AuthBar() {
  const { user, loading } = useAuth()

  if (loading) return null

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '12px 24px',
      background: 'rgba(6,10,6,0.85)',
      borderBottom: '1px solid rgba(255,255,255,0.06)'
    }}>
      {user ? <UserMenu /> : <AuthForm />}
    </div>
  )
}
