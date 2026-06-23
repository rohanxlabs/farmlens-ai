import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Landing from './pages/Landing'
import InstallPWA from './components/InstallPWA'

export default function App() {
  return (
    <BrowserRouter>
      <InstallPWA />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/scan" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}