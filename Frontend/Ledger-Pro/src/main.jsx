import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import Authentication from './Pages/Authentication'
import HomePage from './Pages/HomePage'
import Users from './Pages/Users'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/authentications' element={<Authentication />} />
        <Route path='/Home' element={<HomePage />} />
        <Route path='/Users' element={<Users />} />
      </Routes>
    </Router>
  </StrictMode>,
)
