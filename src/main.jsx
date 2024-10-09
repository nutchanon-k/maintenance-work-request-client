import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './pages/authenticate/Login.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>
)
