import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ArenaProvider } from './state/ArenaContext'
import App from './app/App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ArenaProvider>
      <App />
    </ArenaProvider>
  </StrictMode>,
)
