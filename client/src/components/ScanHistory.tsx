<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from 'react';

interface Scan {
  id: number;
  disease: string;
  confidence: number;
  severity: string;
  affected_area: string;
  pesticide: string;
  dosage: string;
  schedule: string;
  description: string;
  created_at: string;
}

const glassmorphicCardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(24px) saturate(200%)',
  WebkitBackdropFilter: 'blur(24px) saturate(200%)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '24px',
  boxShadow: '0 32px 64px rgba(0, 0, 0, 0.4)',
};

const severityStyles: { [key: string]: React.CSSProperties } = {
  Low: {
    color: '#F59E0B',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  Medium: {
    color: '#F97316',
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    borderColor: 'rgba(249, 115, 22, 0.2)',
  },
  High: {
    color: '#EF4444',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  Healthy: {
    color: '#4ADE80',
    backgroundColor: 'rgba(74, 222, 128, 0.1)',
    borderColor: 'rgba(74, 222, 128, 0.2)',
  },
};

const ScanHistory: React.FC = () => {
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const response = await fetch('/api/scans');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setScans(data);
      } catch (err) {
        setError('Failed to load scan history');
      } finally {
        setLoading(false);
      }
    };

    fetchScans();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-20 rounded-2xl animate-pulse"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div
          className="p-5 text-center rounded-2xl"
          style={{
            background: 'rgba(239, 68, 68, 0.05)',
            border: '1px solid rgba(239, 68, 68, 0.15)',
            color: '#EF4444',
          }}
        >
          {error}
        </div>
      );
    }

    if (scans.length === 0) {
      return (
        <div className="text-center py-10">
          <div className="text-5xl mb-4">🌱</div>
          <h3 className="text-base font-semibold text-[#F0FDF4]">No scans yet</h3>
          <p className="text-sm text-[rgba(240,253,244,0.4)]">
            Upload a crop photo to get started
          </p>
        </div>
      );
    }

    return (
      <div>
        {scans.map((scan) => (
          <div
            key={scan.id}
            className="group mb-2.5 flex justify-between items-center p-4 rounded-2xl transition-all duration-200 ease-in-out cursor-default"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.07)',
            }}
          >
            <div>
              <h4 className="text-sm font-semibold text-[#F0FDF4] mb-1">
                {scan.disease}
              </h4>
              <p className="text-xs text-[rgba(240,253,244,0.35)]">
                {formatDate(scan.created_at)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full border"
                style={{
                  color: '#4ADE80',
                  backgroundColor: 'rgba(74, 222, 128, 0.08)',
                  borderColor: 'rgba(74, 222, 128, 0.15)',
                }}
              >
                {scan.confidence}%
              </span>
              <span
                className="text-xs font-medium px-2.5 py-1 rounded-full border"
                style={severityStyles[scan.severity] || severityStyles.Healthy}
              >
                {scan.severity}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6" style={glassmorphicCardStyle}>
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-lg font-bold text-[#F0FDF4]">🕒 Recent Scans</h2>
          <p className="text-sm text-[rgba(240,253,244,0.4)]">
            Your last 10 crop diagnoses
          </p>
        </div>
        {!loading && !error && (
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{
              color: '#4ADE80',
              background: 'rgba(74, 222, 128, 0.08)',
              border: '1px solid rgba(74, 222, 128, 0.2)',
            }}
          >
            {scans.length} scans
          </span>
        )}
      </div>
      {renderContent()}
    </div>
  );
};

export default ScanHistory;
>>>>>>> 6b2041f152492a2c77aa1b5a1bac61ac69606cbe
