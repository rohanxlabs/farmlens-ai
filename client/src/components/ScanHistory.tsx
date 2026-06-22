import { useState, useEffect } from 'react' 
 
 interface Scan { 
   id: number 
   disease: string 
   confidence: number 
   severity: string 
   affected_area: string 
   pesticide: string 
   dosage: string 
   schedule: string 
   description: string 
   created_at: string 
 } 
 
 interface Props { 
   refreshKey: number 
 } 
 
 export default function ScanHistory({ 
   refreshKey 
 }: Props) { 
   const [scans, setScans] = useState<Scan[]>([]) 
   const [loading, setLoading] = useState(true) 
   const [error, setError] = useState<string|null>(null) 
 
   useEffect(() => { 
     setLoading(true) 
     fetch('/api/scans') 
       .then(res => res.json()) 
       .then(data => { 
         setScans(data) 
         setLoading(false) 
       }) 
       .catch(() => { 
         setError('Failed to load scan history') 
         setLoading(false) 
       }) 
   }, [refreshKey]) 
 
   const formatDate = (dateStr: string) => { 
     return new Date(dateStr).toLocaleDateString( 
       'en-US', { 
         month: 'short', 
         day: 'numeric', 
         year: 'numeric' 
       } 
     ) 
   } 
 
   const getSeverityStyle = (severity: string) => { 
     switch(severity?.toLowerCase()) { 
       case 'high': 
         return { 
           color: '#EF4444', 
           background: 'rgba(239,68,68,0.1)', 
           border: '1px solid rgba(239,68,68,0.2)' 
         } 
       case 'medium': 
         return { 
           color: '#F97316', 
           background: 'rgba(249,115,22,0.1)', 
           border: '1px solid rgba(249,115,22,0.2)' 
         } 
       case 'low': 
         return { 
           color: '#F59E0B', 
           background: 'rgba(245,158,11,0.1)', 
           border: '1px solid rgba(245,158,11,0.2)' 
         } 
       default: 
         return { 
           color: '#4ADE80', 
           background: 'rgba(74,222,128,0.1)', 
           border: '1px solid rgba(74,222,128,0.2)' 
         } 
     } 
   } 
 
   return ( 
     <> 
       <style>{` 
         @keyframes shimmer { 
           0% { opacity: 0.4 } 
           50% { opacity: 0.8 } 
           100% { opacity: 0.4 } 
         } 
         @keyframes fadeSlideUp { 
           from { opacity: 0; transform: translateY(16px) } 
           to { opacity: 1; transform: translateY(0) } 
         } 
         .scan-row:hover { 
           background: rgba(255,255,255,0.06) !important; 
           border-color: rgba(255,255,255,0.12) !important; 
           transform: translateY(-1px); 
         } 
       `}</style> 
 
       <div style={{ marginTop: '16px', 
         animation: 'fadeSlideUp 0.4s ease forwards' 
       }}> 
         <div style={{ 
           background: 'rgba(255,255,255,0.03)', 
           backdropFilter: 'blur(24px) saturate(200%)', 
           WebkitBackdropFilter: 'blur(24px) saturate(200%)', 
           border: '1px solid rgba(255,255,255,0.08)', 
           borderRadius: '24px', 
           padding: '24px', 
           boxShadow: '0 32px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)' 
         }}> 
 
           <div style={{ 
             display: 'flex', 
             justifyContent: 'space-between', 
             alignItems: 'center', 
             marginBottom: '20px' 
           }}> 
             <div> 
               <h3 style={{ 
                 color: '#F0FDF4', 
                 fontSize: '18px', 
                 fontWeight: 700, 
                 margin: 0 
               }}> 
                 🕒 Recent Scans 
               </h3> 
               <p style={{ 
                 color: 'rgba(240,253,244,0.4)', 
                 fontSize: '13px', 
                 margin: '4px 0 0' 
               }}> 
                 Your last 10 crop diagnoses 
               </p> 
             </div> 
             <span style={{ 
               background: 'rgba(74,222,128,0.08)', 
               border: '1px solid rgba(74,222,128,0.2)', 
               color: '#4ADE80', 
               padding: '4px 12px', 
               borderRadius: '999px', 
               fontSize: '12px', 
               fontWeight: 600 
             }}> 
               {scans.length} scans 
             </span> 
           </div> 
 
           {loading && ( 
             <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}> 
               {[1,2,3].map(i => ( 
                 <div key={i} style={{ 
                   height: '72px', 
                   borderRadius: '16px', 
                   background: 'rgba(255,255,255,0.04)', 
                   animation: 'shimmer 1.5s ease infinite' 
                 }} /> 
               ))} 
             </div> 
           )} 
 
           {!loading && error && ( 
             <div style={{ 
               padding: '20px', 
               textAlign: 'center', 
               color: '#EF4444', 
               background: 'rgba(239,68,68,0.05)', 
               border: '1px solid rgba(239,68,68,0.15)', 
               borderRadius: '12px' 
             }}> 
               {error} 
             </div> 
           )} 
 
           {!loading && !error && scans.length === 0 && ( 
             <div style={{ 
               textAlign: 'center', 
               padding: '40px 20px' 
             }}> 
               <div style={{ fontSize: '48px', marginBottom: '12px' }}> 
                 🌱 
               </div> 
               <p style={{ 
                 color: '#F0FDF4', 
                 fontSize: '16px', 
                 fontWeight: 600, 
                 marginBottom: '8px' 
               }}> 
                 No scans yet 
               </p> 
               <p style={{ 
                 color: 'rgba(240,253,244,0.4)', 
                 fontSize: '13px' 
               }}> 
                 Upload a crop photo to get started 
               </p> 
             </div> 
           )} 
 
           {!loading && !error && scans.length > 0 && ( 
             <div style={{ 
               display: 'flex', 
               flexDirection: 'column', 
               gap: '8px' 
             }}> 
               {scans.map((scan) => ( 
                 <div 
                   key={scan.id} 
                   className="scan-row" 
                   style={{ 
                     background: 'rgba(255,255,255,0.04)', 
                     border: '1px solid rgba(255,255,255,0.07)', 
                     borderRadius: '14px', 
                     padding: '14px 18px', 
                     display: 'flex', 
                     justifyContent: 'space-between', 
                     alignItems: 'center', 
                     transition: 'all 0.2s ease', 
                     cursor: 'default' 
                   }} 
                 > 
                   <div> 
                     <p style={{ 
                       color: '#F0FDF4', 
                       fontSize: '15px', 
                       fontWeight: 600, 
                       margin: 0 
                     }}> 
                       {scan.disease} 
                     </p> 
                     <p style={{ 
                       color: 'rgba(240,253,244,0.35)', 
                       fontSize: '12px', 
                       margin: '4px 0 0' 
                     }}> 
                       {formatDate(scan.created_at)} 
                     </p> 
                   </div> 
                   <div style={{ 
                     display: 'flex', 
                     gap: '8px', 
                     alignItems: 'center' 
                   }}> 
                     <span style={{ 
                       background: 'rgba(74,222,128,0.08)', 
                       border: '1px solid rgba(74,222,128,0.15)', 
                       color: '#4ADE80', 
                       padding: '3px 10px', 
                       borderRadius: '999px', 
                       fontSize: '12px', 
                       fontWeight: 600 
                     }}> 
                       {scan.confidence}% 
                     </span> 
                     <span style={{ 
                       padding: '3px 10px', 
                       borderRadius: '999px', 
                       fontSize: '12px', 
                       fontWeight: 500, 
                       ...getSeverityStyle(scan.severity) 
                     }}> 
                       {scan.severity} 
                     </span> 
                   </div> 
                 </div> 
               ))} 
             </div> 
           )} 
         </div> 
       </div> 
     </> 
   ) 
 }