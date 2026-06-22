<<<<<<< HEAD
import { useState, useEffect } from 'react' 
 
 export default function ScanningLoader() { 
   const [dots, setDots] = useState('') 
 
   useEffect(() => { 
     const interval = setInterval(() => { 
       setDots(prev => 
         prev.length >= 3 ? '' : prev + '.' 
       ) 
     }, 400) 
     return () => clearInterval(interval) 
   }, []) 
 
   return ( 
     <> 
       <style>{` 
         @keyframes spin { 
           from { transform: rotate(0deg) } 
           to { transform: rotate(360deg) } 
         } 
         @keyframes scanLine { 
           0% { transform: translateX(-100%) } 
           100% { transform: translateX(350%) } 
         } 
         @keyframes pulseGlow { 
           0% { opacity: 0.4 } 
           100% { opacity: 1 } 
         } 
         @keyframes fadeSlideUp { 
           from { opacity: 0; transform: translateY(20px) } 
           to { opacity: 1; transform: translateY(0) } 
         } 
       `}</style> 
 
       <div style={{ 
         background: 'rgba(255,255,255,0.03)', 
         backdropFilter: 'blur(24px) saturate(200%)', 
         WebkitBackdropFilter: 'blur(24px) saturate(200%)', 
         border: '1px solid rgba(255,255,255,0.08)', 
         borderRadius: '24px', 
         padding: '40px 32px', 
         textAlign: 'center', 
         marginTop: '16px', 
         boxShadow: '0 32px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)', 
         animation: 'fadeSlideUp 0.4s ease forwards' 
       }}> 
 
         <div style={{ 
           width: '80px', height: '80px', 
           borderRadius: '50%', 
           border: '2px solid rgba(74,222,128,0.15)', 
           margin: '0 auto 24px', 
           position: 'relative' 
         }}> 
           <div style={{ 
             position: 'absolute', inset: 0, 
             borderRadius: '50%', 
             border: '2px solid transparent', 
             borderTopColor: '#4ADE80', 
             animation: 'spin 1s linear infinite' 
           }} /> 
           <div style={{ 
             position: 'absolute', 
             top: '50%', left: '50%', 
             transform: 'translate(-50%, -50%)' 
           }}> 
             <svg width="20" height="20" 
               viewBox="0 0 24 24" fill="none" 
               stroke="#4ADE80" strokeWidth="1.5"> 
               <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/> 
               <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/> 
             </svg> 
           </div> 
         </div> 
 
         <div style={{ 
           width: '200px', height: '2px', 
           background: 'rgba(255,255,255,0.06)', 
           borderRadius: '999px', 
           margin: '0 auto 24px', 
           overflow: 'hidden' 
         }}> 
           <div style={{ 
             width: '40%', height: '100%', 
             background: 'linear-gradient(90deg, transparent, #4ADE80, transparent)', 
             animation: 'scanLine 1.5s ease-in-out infinite' 
           }} /> 
         </div> 
 
         <p style={{ 
           color: '#F0FDF4', fontSize: '16px', 
           fontWeight: 600, marginBottom: '8px' 
         }}> 
           Analyzing your crop... 
         </p> 
         <p style={{ 
           color: 'rgba(240,253,244,0.4)', 
           fontSize: '13px', marginBottom: '20px' 
         }}> 
           AI is identifying diseases{dots} 
         </p> 
 
         <div style={{ 
           display: 'flex', gap: '8px', 
           justifyContent: 'center' 
         }}> 
           {[ 
             { label: '🔍 Scanning', active: true }, 
             { label: '🧬 Analyzing', active: false }, 
             { label: '💊 Preparing', active: false } 
           ].map((pill) => ( 
             <span key={pill.label} style={{ 
               padding: '4px 12px', 
               borderRadius: '999px', 
               fontSize: '11px', fontWeight: 500, 
               background: pill.active 
                 ? 'rgba(74,222,128,0.08)' 
                 : 'rgba(255,255,255,0.04)', 
               border: pill.active 
                 ? '1px solid rgba(74,222,128,0.2)' 
                 : '1px solid rgba(255,255,255,0.08)', 
               color: pill.active 
                 ? '#4ADE80' 
                 : 'rgba(240,253,244,0.3)', 
               animation: pill.active 
                 ? 'pulseGlow 1.5s ease infinite alternate' 
                 : 'none' 
             }}> 
               {pill.label} 
             </span> 
           ))} 
         </div> 
       </div> 
     </> 
   ) 
=======
import { useState, useEffect } from 'react'
 
 export default function ScanningLoader() {
   const [dots, setDots] = useState('')
 
   useEffect(() => {
     const interval = setInterval(() => {
       setDots(prev => 
         prev.length >= 3 ? '' : prev + '.'
       )
     }, 400)
     return () => clearInterval(interval)
   }, [])
 
   return (
     <>
       <style>{`
         @keyframes spin {
           from { transform: rotate(0deg) }
           to { transform: rotate(360deg) }
         }
         @keyframes scanLine {
           0% { transform: translateX(-100%) }
           100% { transform: translateX(350%) }
         }
         @keyframes pulse {
           0% { opacity: 0.4 }
           100% { opacity: 1 }
         }
         @keyframes fadeSlideUp {
           from {
             opacity: 0;
             transform: translateY(20px)
           }
           to {
             opacity: 1;
             transform: translateY(0)
           }
         }
       `}</style>
 
       <div style={{
         background: 'rgba(255,255,255,0.03)',
         backdropFilter: 'blur(24px) saturate(200%)',
         WebkitBackdropFilter: 'blur(24px) saturate(200%)',
         border: '1px solid rgba(255,255,255,0.08)',
         borderRadius: '24px',
         padding: '40px 32px',
         textAlign: 'center',
         marginTop: '16px',
         boxShadow: '0 32px 64px rgba(0,0,0,0.4)',
         animation: 'fadeSlideUp 0.4s ease forwards'
       }}>
 
         {/* Spinning circle */}
         <div style={{
           width: '80px',
           height: '80px',
           borderRadius: '50%',
           border: '2px solid rgba(74,222,128,0.15)',
           margin: '0 auto 24px',
           position: 'relative'
         }}>
           {/* Spinning arc */}
           <div style={{
             position: 'absolute',
             inset: 0,
             borderRadius: '50%',
             border: '2px solid transparent',
             borderTopColor: '#4ADE80',
             animation: 'spin 1s linear infinite'
           }} />
           {/* Leaf icon */}
           <div style={{
             position: 'absolute',
             top: '50%',
             left: '50%',
             transform: 'translate(-50%, -50%)'
           }}>
             <svg
               width="20"
               height="20"
               viewBox="0 0 24 24"
               fill="none"
               stroke="#4ADE80"
               strokeWidth="1.5"
             >
               <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
               <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
             </svg>
           </div>
         </div>
 
         {/* Scanning line */}
         <div style={{
           width: '200px',
           height: '2px',
           background: 'rgba(255,255,255,0.06)',
           borderRadius: '999px',
           margin: '0 auto 24px',
           overflow: 'hidden'
         }}>
           <div style={{
             width: '40%',
             height: '100%',
             background: 'linear-gradient(90deg, transparent, #4ADE80, transparent)',
             animation: 'scanLine 1.5s ease-in-out infinite'
           }} />
         </div>
 
         {/* Text */}
         <p style={{
           color: '#F0FDF4',
           fontSize: '16px',
           fontWeight: 600,
           marginBottom: '8px'
         }}>
           Analyzing your crop...
         </p>
         <p style={{
           color: 'rgba(240,253,244,0.4)',
           fontSize: '13px',
           marginBottom: '20px'
         }}>
           AI is identifying diseases{dots}
         </p>
 
         {/* Status pills */}
         <div style={{
           display: 'flex',
           gap: '8px',
           justifyContent: 'center'
         }}>
           <span style={{
             padding: '4px 12px',
             borderRadius: '999px',
             fontSize: '11px',
             fontWeight: 500,
             background: 'rgba(74,222,128,0.08)',
             border: '1px solid rgba(74,222,128,0.2)',
             color: '#4ADE80',
             animation: 'pulse 1.5s ease infinite alternate'
           }}>
             🔍 Scanning
           </span>
           <span style={{
             padding: '4px 12px',
             borderRadius: '999px',
             fontSize: '11px',
             fontWeight: 500,
             background: 'rgba(255,255,255,0.04)',
             border: '1px solid rgba(255,255,255,0.08)',
             color: 'rgba(240,253,244,0.3)'
           }}>
             🧬 Analyzing
           </span>
           <span style={{
             padding: '4px 12px',
             borderRadius: '999px',
             fontSize: '11px',
             fontWeight: 500,
             background: 'rgba(255,255,255,0.04)',
             border: '1px solid rgba(255,255,255,0.08)',
             color: 'rgba(240,253,244,0.3)'
           }}>
             💊 Preparing
           </span>
         </div>
       </div>
     </>
   )
>>>>>>> 6b2041f152492a2c77aa1b5a1bac61ac69606cbe
 }