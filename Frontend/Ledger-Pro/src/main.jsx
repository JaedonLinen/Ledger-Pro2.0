import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import Authentication from './Pages/Authentication'
import HomePage from './Pages/HomePage'
import Users from './Pages/Users'
import ForgotPassword from './Pages/ForgotPassword'
import AccountsLanding from './Pages/AccountsLanding'
import Accounts from './Pages/Accounts'
import Wizard from './Pages/CreateAccount'
import GeneralInfo from './Pages/AccountLedger'
import Events from './Pages/EventsLog'
import JournalEntry from './Pages/JournalEntry'
import JournalTablePage from './Pages/JournalTablePage'
import JournalInfo from './Pages/JournalInfo'
import JournalLanding from './Pages/JournalLanding'
import StatementsLanding from './Pages/StatementsLanding'
import Statement from './Pages/Statement'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/authentications' element={<Authentication />} />
        <Route path='/Home' element={<HomePage />} />
        <Route path='/Users' element={<Users />} />
        <Route path='/Accounts_Landing' element={<AccountsLanding />} />
        <Route path='/Accounts_List' element={<Accounts />} />
        <Route path='/CreateAccount' element={<Wizard />} />
        <Route path='/ForgotPassword' element={<ForgotPassword />} />
        <Route path='/AccountGeneralInformation' element={<GeneralInfo />} />
        <Route path='/events' element={<Events />} />
        <Route path='/JournalEntry' element={<JournalEntry />} />
        <Route path='/JournalTable' element={<JournalTablePage />} />
        <Route path='/JournalInfo' element={<JournalInfo />} />
        <Route path='/JournalLanding' element={<JournalLanding/>} />
        <Route path='/Statements_menu' element={<StatementsLanding/>} />
        <Route path='/Statement' element={<Statement/>} />
      </Routes>
    </Router>
  </StrictMode>,
)
