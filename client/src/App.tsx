<<<<<<< HEAD
import { BrowserRouter, Routes, Route }  
   from 'react-router-dom' 
 import Home from './pages/Home' 
 import Landing from './pages/Landing' 
  
 export default function App() { 
   return ( 
     <BrowserRouter> 
       <Routes> 
         <Route path="/" element={<Landing />} /> 
         <Route path="/scan" element={<Home />} /> 
       </Routes> 
     </BrowserRouter> 
   ) 
 }
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import Home from './pages/Home' 
import Landing from './pages/Landing' 
 
export default function App() { 
  return ( 
    <BrowserRouter> 
      <Routes> 
        <Route path="/" element={<Landing />} /> 
        <Route path="/scan" element={<Home />} /> 
      </Routes> 
    </BrowserRouter> 
  ) 
}
>>>>>>> 6b2041f152492a2c77aa1b5a1bac61ac69606cbe
