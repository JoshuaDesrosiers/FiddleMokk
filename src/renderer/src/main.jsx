import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
window._css=''
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
