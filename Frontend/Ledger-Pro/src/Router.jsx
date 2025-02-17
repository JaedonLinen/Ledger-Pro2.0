import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Authentication } from './Pages/Authentication'

export const router = createBrowserRouter([
    { path: "/Ledger-Pro2.0", element: <App />}, 
    { path: "/Ledger-Pro2.0/authentication", element: <Authentication />}
])