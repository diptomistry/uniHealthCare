import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ContextProvider } from './contexts/ContextProvider.jsx'
import UserProvider from './services/auth/UserProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
    <ContextProvider>
    <App />
    </ContextProvider>
    </UserProvider>
  

  </React.StrictMode>,
)
