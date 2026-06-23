import { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent 
  extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: string }>
}

export default function InstallPWA() {
  const [installPrompt, setInstallPrompt] = 
    useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = 
    useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(
        e as BeforeInstallPromptEvent
      )
    }
    window.addEventListener(
      'beforeinstallprompt', handler
    )
    
    if (window.matchMedia(
      '(display-mode: standalone)'
    ).matches) {
      setIsInstalled(true)
    }
    
    return () => window.removeEventListener(
      'beforeinstallprompt', handler
    )
  }, [])

  const handleInstall = async () => {
    if (!installPrompt) return
    await installPrompt.prompt()
    const { outcome } = await 
      installPrompt.userChoice
    if (outcome === 'accepted') {
      setIsInstalled(true)
      setInstallPrompt(null)
    }
  }

  if (isInstalled || !installPrompt) 
    return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      background: 'rgba(6,10,6,0.95)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      border: '1px solid rgba(74,222,128,0.25)',
      borderRadius: '16px',
      padding: '14px 20px',
      boxShadow: 
        '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(74,222,128,0.1)',
      whiteSpace: 'nowrap'
    }}>
      <span style={{ fontSize: '20px' }}>
        🌿
      </span>
      <div>
        <p style={{
          color: '#F0FDF4',
          fontSize: '13px',
          fontWeight: 600,
          margin: 0
        }}>
          Install FarmLens AI
        </p>
        <p style={{
          color: 'rgba(240,253,244,0.4)',
          fontSize: '11px',
          margin: '2px 0 0'
        }}>
          Add to home screen for quick access
        </p>
      </div>
      <button
        onClick={handleInstall}
        style={{
          background: 'linear-gradient(135deg, rgba(74,222,128,0.2), rgba(34,197,94,0.1))',
          border: '1px solid rgba(74,222,128,0.3)',
          color: '#4ADE80',
          padding: '8px 16px',
          borderRadius: '10px',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
          whiteSpace: 'nowrap'
        }}
      >
        Install
      </button>
      <button
        onClick={() => setInstallPrompt(null)}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'rgba(240,253,244,0.3)',
          cursor: 'pointer',
          fontSize: '16px',
          padding: '4px'
        }}
      >
        ✕
      </button>
    </div>
  )
}