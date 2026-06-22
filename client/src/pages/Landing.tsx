import { useNavigate } from 'react-router-dom' 
  
 export default function Landing() { 
   const navigate = useNavigate() 
  
   const scrollToFeatures = () => { 
     document.getElementById('features') 
       ?.scrollIntoView({ behavior: 'smooth' }) 
   } 
  
   const glassCard = { 
     background: 'rgba(255,255,255,0.03)', 
     backdropFilter: 'blur(24px) saturate(200%)', 
     WebkitBackdropFilter:  
       'blur(24px) saturate(200%)', 
     border: '1px solid rgba(255,255,255,0.08)', 
     borderRadius: '24px', 
     boxShadow:  
       '0 32px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)' 
   } 
  
   return ( 
     <div style={{ 
       minHeight: '100vh', 
       background: '#060a06', 
       color: '#F0FDF4', 
       fontFamily: 'Inter, system-ui, sans-serif', 
       position: 'relative', 
       overflowX: 'hidden' 
     }}> 
  
       <style>{` 
         @keyframes fadeSlideUp { 
           from {  
             opacity: 0;  
             transform: translateY(24px)  
           } 
           to {  
             opacity: 1;  
             transform: translateY(0)  
           } 
         } 
         @keyframes pulse { 
           0% { opacity: 1 } 
           50% { opacity: 0.4 } 
           100% { opacity: 1 } 
         } 
         .nav-btn:hover { 
           background: rgba(74,222,128,0.25) !important; 
         } 
         .hero-btn-primary:hover { 
           transform: translateY(-2px); 
           box-shadow: 0 0 32px  
             rgba(74,222,128,0.25) !important; 
         } 
         .hero-btn-secondary:hover { 
           border-color: rgba(255,255,255,0.2) !important; 
           color: rgba(240,253,244,0.8) !important; 
         } 
         .feature-card:hover { 
           background: rgba(255,255,255,0.06) !important; 
           border-color: rgba(74,222,128,0.15) !important; 
           transform: translateY(-2px); 
         } 
         .step-card:hover { 
           border-color: rgba(74,222,128,0.2) !important; 
           transform: translateY(-2px); 
         } 
       `}</style> 
  
       {/* Background orbs */} 
       <div style={{ 
         position: 'fixed', 
         width: '600px', height: '600px', 
         top: '-200px', left: '-200px', 
         background: 'radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)', 
         borderRadius: '50%', 
         filter: 'blur(60px)', 
         pointerEvents: 'none', 
         zIndex: 0 
       }} /> 
       <div style={{ 
         position: 'fixed', 
         width: '500px', height: '500px', 
         bottom: '-100px', right: '-100px', 
         background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)', 
         borderRadius: '50%', 
         filter: 'blur(80px)', 
         pointerEvents: 'none', 
         zIndex: 0 
       }} /> 
  
       {/* NAVBAR */} 
       <nav style={{ 
         position: 'sticky', top: 0, 
         zIndex: 50, 
         background: 'rgba(6,10,6,0.85)', 
         backdropFilter: 'blur(20px)', 
         WebkitBackdropFilter: 'blur(20px)', 
         borderBottom: '1px solid rgba(255,255,255,0.06)', 
         padding: '16px 24px' 
       }}> 
         <div style={{ 
           maxWidth: '1100px', 
           margin: '0 auto', 
           display: 'flex', 
           justifyContent: 'space-between', 
           alignItems: 'center' 
         }}> 
           <span style={{ 
             fontSize: '18px', 
             fontWeight: 700, 
             color: '#F0FDF4' 
           }}> 
             🌿 FarmLens AI 
           </span> 
           <button 
             className="nav-btn" 
             onClick={() => navigate('/scan')} 
             style={{ 
               background: 'rgba(74,222,128,0.15)', 
               border: '1px solid rgba(74,222,128,0.3)', 
               color: '#4ADE80', 
               padding: '8px 20px', 
               borderRadius: '10px', 
               fontSize: '14px', 
               fontWeight: 600, 
               cursor: 'pointer', 
               transition: 'all 0.2s' 
             }} 
           > 
             Try it free → 
           </button> 
         </div> 
       </nav> 
  
       {/* HERO */} 
       <section style={{ 
         maxWidth: '800px', 
         margin: '0 auto', 
         padding: '100px 24px 80px', 
         textAlign: 'center', 
         position: 'relative', 
         zIndex: 1, 
         animation: 'fadeSlideUp 0.6s ease forwards' 
       }}> 
         <div style={{ 
           display: 'inline-flex', 
           alignItems: 'center', 
           gap: '8px', 
           padding: '8px 16px', 
           borderRadius: '999px', 
           background: 'rgba(74,222,128,0.08)', 
           border: '1px solid rgba(74,222,128,0.2)', 
           marginBottom: '32px' 
         }}> 
           <div style={{ 
             width: '6px', height: '6px', 
             background: '#4ADE80', 
             borderRadius: '50%', 
             animation: 'pulse 2s infinite' 
           }} /> 
           <span style={{ 
             color: '#4ADE80', 
             fontSize: '13px', 
             fontWeight: 500 
           }}> 
             🔬 Powered by Vision AI 
           </span> 
         </div> 
  
         <h1 style={{ 
           fontSize: '64px', 
           fontWeight: 800, 
           letterSpacing: '-2px', 
           lineHeight: 1.1, 
           margin: '0 0 24px', 
           background: 'linear-gradient(135deg, #F0FDF4 0%, #4ADE80 60%)', 
           WebkitBackgroundClip: 'text', 
           WebkitTextFillColor: 'transparent' 
         }}> 
           Detect Crop Diseases<br /> 
           Before They Spread 
         </h1> 
  
         <p style={{ 
           color: 'rgba(240,253,244,0.55)', 
           fontSize: '18px', 
           lineHeight: 1.7, 
           maxWidth: '540px', 
           margin: '0 auto 40px' 
         }}> 
           Upload a photo of your crop and  
           get instant AI-powered disease  
           diagnosis, confidence scores, and  
           treatment plans — completely free. 
         </p> 
  
         <div style={{ 
           display: 'flex', 
           gap: '12px', 
           justifyContent: 'center', 
           flexWrap: 'wrap' 
         }}> 
           <button 
             className="hero-btn-primary" 
             onClick={() => navigate('/scan')} 
             style={{ 
               background: 'linear-gradient(135deg, rgba(74,222,128,0.2), rgba(34,197,94,0.1))', 
               border: '1px solid rgba(74,222,128,0.4)', 
               color: '#4ADE80', 
               padding: '14px 32px', 
               borderRadius: '12px', 
               fontSize: '16px', 
               fontWeight: 600, 
               cursor: 'pointer', 
               transition: 'all 0.2s' 
             }} 
           > 
             Analyze Your Crop → 
           </button> 
           <button 
             className="hero-btn-secondary" 
             onClick={scrollToFeatures} 
             style={{ 
               background: 'transparent', 
               border: '1px solid rgba(255,255,255,0.1)', 
               color: 'rgba(240,253,244,0.5)', 
               padding: '14px 32px', 
               borderRadius: '12px', 
               fontSize: '16px', 
               cursor: 'pointer', 
               transition: 'all 0.2s' 
             }} 
           > 
             See how it works ↓ 
           </button> 
         </div> 
  
         {/* Stats */} 
         <div style={{ 
           display: 'flex', 
           gap: '48px', 
           justifyContent: 'center', 
           marginTop: '64px', 
           flexWrap: 'wrap' 
         }}> 
           {[ 
             { value: '50+', label: 'Diseases Detected' }, 
             { value: '97%', label: 'Average Accuracy' }, 
             { value: 'Free', label: 'No signup needed' } 
           ].map(stat => ( 
             <div key={stat.label}  
               style={{ textAlign: 'center' }}> 
               <div style={{ 
                 fontSize: '36px', 
                 fontWeight: 800, 
                 color: '#4ADE80', 
                 lineHeight: 1 
               }}> 
                 {stat.value} 
               </div> 
               <div style={{ 
                 fontSize: '13px', 
                 color: 'rgba(240,253,244,0.4)', 
                 marginTop: '6px' 
               }}> 
                 {stat.label} 
               </div> 
             </div> 
           ))} 
         </div> 
       </section> 
  
       {/* HOW IT WORKS */} 
       <section style={{ 
         maxWidth: '1000px', 
         margin: '0 auto', 
         padding: '80px 24px', 
         position: 'relative', 
         zIndex: 1 
       }}> 
         <div style={{ textAlign: 'center', marginBottom: '60px' }}> 
           <p style={{ 
             letterSpacing: '3px', 
             fontSize: '11px', 
             color: 'rgba(74,222,128,0.6)', 
             fontWeight: 600, 
             marginBottom: '12px' 
           }}> 
             HOW IT WORKS 
           </p> 
           <h2 style={{ 
             fontSize: '40px', 
             fontWeight: 700, 
             color: '#F0FDF4', 
             letterSpacing: '-1px', 
             margin: 0 
           }}> 
             Three steps to healthy crops 
           </h2> 
         </div> 
  
         <div style={{ 
           display: 'grid', 
           gridTemplateColumns:  
             'repeat(auto-fit, minmax(280px, 1fr))', 
           gap: '24px' 
         }}> 
           {[ 
             { 
               num: '01', 
               title: 'Upload Photo', 
               desc: 'Take a photo of your diseased crop and upload it to FarmLens AI from any device' 
             }, 
             { 
               num: '02', 
               title: 'AI Analysis', 
               desc: 'Our vision AI analyzes the image and identifies diseases with confidence scoring' 
             }, 
             { 
               num: '03', 
               title: 'Get Treatment', 
               desc: 'Receive a precise treatment plan with pesticide name, dosage, and spray schedule' 
             } 
           ].map(step => ( 
             <div 
               key={step.num} 
               className="step-card" 
               style={{ 
                 ...glassCard, 
                 padding: '32px', 
                 transition: 'all 0.2s ease' 
               }} 
             > 
               <div style={{ 
                 fontSize: '56px', 
                 fontWeight: 800, 
                 color: 'rgba(74,222,128,0.12)', 
                 lineHeight: 1, 
                 marginBottom: '16px' 
               }}> 
                 {step.num} 
               </div> 
               <h3 style={{ 
                 fontSize: '18px', 
                 fontWeight: 600, 
                 color: '#F0FDF4', 
                 marginBottom: '8px' 
               }}> 
                 {step.title} 
               </h3> 
               <p style={{ 
                 fontSize: '14px', 
                 color: 'rgba(240,253,244,0.45)', 
                 lineHeight: 1.6, 
                 margin: 0 
               }}> 
                 {step.desc} 
               </p> 
             </div> 
           ))} 
         </div> 
       </section> 
  
       {/* FEATURES */} 
       <section 
         id="features" 
         style={{ 
           maxWidth: '1000px', 
           margin: '0 auto', 
           padding: '0 24px 80px', 
           position: 'relative', 
           zIndex: 1 
         }} 
       > 
         <div style={{  
           textAlign: 'center',  
           marginBottom: '48px'  
         }}> 
           <p style={{ 
             letterSpacing: '3px', 
             fontSize: '11px', 
             color: 'rgba(74,222,128,0.6)', 
             fontWeight: 600, 
             marginBottom: '12px' 
           }}> 
             FEATURES 
           </p> 
           <h2 style={{ 
             fontSize: '40px', 
             fontWeight: 700, 
             color: '#F0FDF4', 
             letterSpacing: '-1px', 
             margin: 0 
           }}> 
             Everything you need 
           </h2> 
         </div> 
  
         <div style={{ 
           display: 'grid', 
           gridTemplateColumns: 
             'repeat(auto-fit, minmax(280px, 1fr))', 
           gap: '16px' 
         }}> 
           {[ 
             { 
               icon: '🔬', 
               title: 'Instant Diagnosis', 
               desc: 'Get disease identification in under 3 seconds' 
             }, 
             { 
               icon: '📊', 
               title: 'Confidence Score', 
               desc: 'Know exactly how certain the AI is about its diagnosis' 
             }, 
             { 
               icon: '💊', 
               title: 'Treatment Plans', 
               desc: 'Specific pesticide, dosage and schedule for each disease' 
             }, 
             { 
               icon: '📱', 
               title: 'Mobile Friendly', 
               desc: 'Works on any device, no app download needed' 
             }, 
             { 
               icon: '🆓', 
               title: 'Completely Free', 
               desc: 'No signup, no credit card, no hidden limits' 
             }, 
             { 
               icon: '🌿', 
               title: '50+ Diseases', 
               desc: 'Detects diseases across all major crop types' 
             } 
           ].map(feature => ( 
             <div 
               key={feature.title} 
               className="feature-card" 
               style={{ 
                 ...glassCard, 
                 padding: '24px', 
                 transition: 'all 0.2s ease' 
               }} 
             > 
               <div style={{ 
                 fontSize: '28px', 
                 marginBottom: '12px' 
               }}> 
                 {feature.icon} 
               </div> 
               <h3 style={{ 
                 fontSize: '15px', 
                 fontWeight: 600, 
                 color: '#F0FDF4', 
                 marginBottom: '6px' 
               }}> 
                 {feature.title} 
               </h3> 
               <p style={{ 
                 fontSize: '13px', 
                 color: 'rgba(240,253,244,0.45)', 
                 lineHeight: 1.5, 
                 margin: 0 
               }}> 
                 {feature.desc} 
               </p> 
             </div> 
           ))} 
         </div> 
       </section> 
  
       {/* CTA SECTION */} 
       <section style={{ 
         maxWidth: '700px', 
         margin: '0 auto', 
         padding: '0 24px 100px', 
         position: 'relative', 
         zIndex: 1 
       }}> 
         <div style={{ 
           ...glassCard, 
           padding: '60px 40px', 
           textAlign: 'center', 
           boxShadow: '0 0 80px rgba(74,222,128,0.06), 0 32px 64px rgba(0,0,0,0.4)' 
         }}> 
           <h2 style={{ 
             fontSize: '40px', 
             fontWeight: 700, 
             color: '#F0FDF4', 
             letterSpacing: '-1px', 
             marginBottom: '16px' 
           }}> 
             Ready to protect<br />your crops? 
           </h2> 
           <p style={{ 
             color: 'rgba(240,253,244,0.5)', 
             fontSize: '16px', 
             marginBottom: '32px' 
           }}> 
             Start detecting diseases for free. 
             No account needed. 
           </p> 
           <button 
             className="hero-btn-primary" 
             onClick={() => navigate('/scan')} 
             style={{ 
               background: 'linear-gradient(135deg, rgba(74,222,128,0.2), rgba(34,197,94,0.1))', 
               border: '1px solid rgba(74,222,128,0.4)', 
               color: '#4ADE80', 
               padding: '16px 48px', 
               borderRadius: '12px', 
               fontSize: '17px', 
               fontWeight: 600, 
               cursor: 'pointer', 
               transition: 'all 0.2s' 
             }} 
           > 
             Start Analyzing Now → 
           </button> 
         </div> 
       </section> 
  
       {/* FOOTER */} 
       <footer style={{ 
         borderTop: '1px solid rgba(255,255,255,0.06)', 
         padding: '32px 24px', 
         textAlign: 'center', 
         position: 'relative', 
         zIndex: 1 
       }}> 
         <p style={{ 
           color: 'rgba(240,253,244,0.25)', 
           fontSize: '13px', 
           margin: '0 0 8px' 
         }}> 
           🌿 FarmLens AI — Built by Eren 
         </p> 
         <p style={{ 
           color: 'rgba(240,253,244,0.15)', 
           fontSize: '12px', 
           margin: 0 
         }}> 
           Powered by OpenRouter · React ·  
           Express · Neon PostgreSQL 
         </p> 
       </footer> 
     </div> 
   ) 
 }