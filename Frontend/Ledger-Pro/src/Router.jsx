import { createBrowserRouter } from 'react-router-dom'
import { Authentication } from './Pages/Authentication'
import { App } from './App';


export const router = createBrowserRouter([
    {
        path: "/Ledger-Pro2.0", 
        element: <App />,
        children: [
            { path: "/Ledger-Pro2.0/authentication", element: <Authentication />},
        ],
    },
]);