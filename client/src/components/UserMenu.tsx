import { useAuth } from '../context/AuthContext'

export default function UserMenu() {
  const { user, signOut } = useAuth()
  if (!user) return null

  const initial = user.email.charAt(0).toUpperCase()

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      background: 'rgba(6,10,6,0.85)',
      border: '1px solid rgba(74,222,128,0.25)',
      borderRadius: '999px',
      padding: '6px 14px 6px 6px'
    }}>
      <div style={{
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        background: 'rgba(74,222,128,0.2)',
        color: '#4ADE80',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '13px',
        fontWeight: 700
      }}>
        {initial}
      </div>
      <span style={{ color: '#F0FDF4', fontSize: '13px', fontWeight: 600 }}>
        {user.email}
      </span>
      <button
        onClick={signOut}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'rgba(240,253,244,0.4)',
          fontSize: '12px',
          cursor: 'pointer'
        }}
      >
        Sign out
      </button>
    </div>
  )
}
