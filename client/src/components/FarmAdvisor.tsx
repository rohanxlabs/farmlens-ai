import { useState, useEffect, useRef }  
   from 'react' 
  
 interface Message { 
   role: 'user' | 'assistant' 
   content: string 
 } 
  
 export default function FarmAdvisor() { 
   const [messages, setMessages] =  
     useState<Message[]>([{ 
       role: 'assistant', 
       content: 'Hello! I am your AI Farm Advisor. Ask me anything about crops, diseases, soil, or farming practices. How can I help you today?' 
     }]) 
   const [input, setInput] = useState('') 
   const [isLoading, setIsLoading] =  
     useState(false) 
   const messagesEndRef = useRef<HTMLDivElement>(null) 
   const suggestions = [ 
     'When should I water my crops?', 
     'How to prevent fungal diseases?', 
     'Best fertilizer for wheat?' 
   ] 
  
   useEffect(() => { 
     messagesEndRef.current?.scrollIntoView({  
       behavior: 'smooth'  
     }) 
   }, [messages]) 
  
   const handleSend = async () => { 
     if (!input.trim() || isLoading) return 
      
     const userMessage = input.trim() 
     setInput('') 
     setMessages(prev => [ 
       ...prev,  
       { role: 'user', content: userMessage } 
     ]) 
     setIsLoading(true) 
      
     try { 
       const response = await fetch('/api/chat', { 
         method: 'POST', 
         headers: {  
           'Content-Type': 'application/json'  
         }, 
         body: JSON.stringify({ 
           message: userMessage, 
           history: messages 
         }) 
       }) 
        
       const data = await response.json() 
       setMessages(prev => [ 
         ...prev,  
         { role: 'assistant', content: data.reply } 
       ]) 
     } catch (err) { 
       setMessages(prev => [ 
         ...prev, 
         { role: 'assistant', content: 'Sorry, I ran into an error. Please try again.' } 
       ]) 
     } finally { 
       setIsLoading(false) 
     } 
   } 
  
   const handleSuggestion = (suggestion: string) => { 
     setInput(suggestion) 
   } 
  
   return ( 
     <div style={{ marginTop: '16px' }}> 
       <div style={{ 
         background: 'rgba(255,255,255,0.03)', 
         backdropFilter: 'blur(24px) saturate(200%)', 
         WebkitBackdropFilter: 'blur(24px) saturate(200%)', 
         border: '1px solid rgba(255,255,255,0.08)', 
         borderRadius: '24px', 
         boxShadow: '0 32px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)', 
         display: 'flex', 
         flexDirection: 'column', 
         height: '500px' 
       }}> 
         {/* Header */} 
         <div style={{ 
           padding: '16px 20px', 
           borderBottom: '1px solid rgba(255,255,255,0.08)' 
         }}> 
           <h3 style={{ 
             color: '#F0FDF4', 
             fontSize: '16px', 
             fontWeight: 700, 
             margin: 0, 
             display: 'flex', 
             alignItems: 'center', 
             gap: '8px' 
           }}> 
             <span style={{ 
               width: '8px', height: '8px', 
               background: '#4ADE80', 
               borderRadius: '50%', 
               animation: 'pulse 2s infinite' 
             }} /> 
             AI Farm Advisor 
           </h3> 
         </div> 
  
         {/* Messages */} 
         <div style={{ 
           flex: 1, 
           overflowY: 'auto', 
           padding: '20px' 
         }}> 
           {messages.map((msg, i) => ( 
             <div 
               key={i} 
               style={{ 
                 display: 'flex', 
                 marginBottom: '16px', 
                 animation: 'fadeSlideUp 0.4s ease forwards' 
               }} 
             > 
               <div style={{ 
                 width: '32px', height: '32px', 
                 borderRadius: '50%', 
                 background: msg.role === 'assistant' 
                   ? 'rgba(74,222,128,0.15)' 
                   : 'rgba(255,255,255,0.1)', 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'center', 
                 marginRight: '12px', 
                 flexShrink: 0 
               }}> 
                 {msg.role === 'assistant' ? '🌿' : '🧑‍🌾'} 
               </div> 
               <div style={{ 
                 background: msg.role === 'assistant' 
                   ? 'rgba(255,255,255,0.04)' 
                   : 'transparent', 
                 padding: msg.role === 'assistant' ? '12px 16px' : '0', 
                 borderRadius: '12px' 
               }}> 
                 <p style={{ 
                   color: 'rgba(240,253,244,0.8)', 
                   fontSize: '14px', 
                   lineHeight: 1.6, 
                   margin: 0 
                 }}> 
                   {msg.content} 
                 </p> 
               </div> 
             </div> 
           ))} 
           {isLoading && ( 
             <div style={{ display: 'flex' }}> 
               <div style={{ 
                 width: '32px', height: '32px', 
                 borderRadius: '50%', 
                 background: 'rgba(74,222,128,0.15)', 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'center', 
                 marginRight: '12px', 
                 flexShrink: 0 
               }}> 
                 🌿 
               </div> 
               <div style={{ 
                 display: 'flex', 
                 alignItems: 'center', 
                 gap: '4px', 
                 padding: '12px 0' 
               }}> 
                 {[1,2,3].map(i => ( 
                   <div key={i} style={{ 
                     width: '8px', height: '8px', 
                     borderRadius: '50%', 
                     background: 'rgba(255,255,255,0.3)', 
                     animation: 'pulse 1.2s infinite', 
                     animationDelay: `${i * 0.2}s` 
                   }} /> 
                 ))} 
               </div> 
             </div> 
           )} 
           <div ref={messagesEndRef} /> 
         </div> 
  
         {/* Input */} 
         <div style={{ 
           padding: '16px 20px', 
           borderTop: '1px solid rgba(255,255,255,0.08)' 
         }}> 
           {messages.length <= 1 && ( 
             <div style={{ 
               display: 'flex', 
               gap: '8px', 
               marginBottom: '12px', 
               flexWrap: 'wrap' 
             }}> 
               {suggestions.map(s => ( 
                 <button 
                   key={s} 
                   onClick={() => handleSuggestion(s)} 
                   style={{ 
                     background: 'rgba(255,255,255,0.06)', 
                     border: '1px solid rgba(255,255,255,0.1)', 
                     color: 'rgba(240,253,244,0.6)', 
                     padding: '6px 12px', 
                     borderRadius: '8px', 
                     fontSize: '12px', 
                     cursor: 'pointer', 
                     transition: 'all 0.2s' 
                   }} 
                 > 
                   {s} 
                 </button> 
               ))} 
             </div> 
           )} 
           <div style={{ 
             display: 'flex', 
             gap: '8px' 
           }}> 
             <input 
               type="text" 
               value={input} 
               onChange={e => setInput(e.target.value)} 
               onKeyDown={e => e.key === 'Enter' && handleSend()} 
               placeholder="Ask the AI Farm Advisor..." 
               style={{ 
                 flex: 1, 
                 background: 'rgba(0,0,0,0.2)', 
                 border: '1px solid rgba(255,255,255,0.1)', 
                 borderRadius: '10px', 
                 padding: '10px 14px', 
                 color: '#F0FDF4', 
                 fontSize: '14px' 
               }} 
             /> 
             <button 
               onClick={handleSend} 
               disabled={isLoading} 
               style={{ 
                 background: 'rgba(74,222,128,0.15)', 
                 border: '1px solid rgba(74,222,128,0.3)', 
                 color: '#4ADE80', 
                 padding: '0 20px', 
                 borderRadius: '10px', 
                 fontSize: '14px', 
                 fontWeight: 600, 
                 cursor: 'pointer', 
                 opacity: isLoading ? 0.5 : 1 
               }} 
             > 
               Send 
             </button> 
           </div> 
         </div> 
       </div> 
     </div> 
   ) 
 }