import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.clean.jsx'

// Global error overlay to help debug white-screen issues (shows on-page on any device)
function showErrorOverlay(message) {
  try {
    const existing = document.getElementById('error-overlay')
    if (existing) existing.remove()
    const el = document.createElement('div')
    el.id = 'error-overlay'
    Object.assign(el.style, {
      position: 'fixed',
      inset: '0',
      background: '#fff',
      color: '#b00020',
      padding: '20px',
      zIndex: 2147483647,
      overflow: 'auto',
      fontFamily: 'system-ui, Arial, sans-serif',
      lineHeight: '1.4',
    })
    el.innerHTML = `<h2 style="margin-top:0;">Runtime Error</h2><pre style="white-space:pre-wrap;">${String(
      message,
    )}</pre>`
    document.body.appendChild(el)
  } catch (err) {
    // ignore overlay failures
    // eslint-disable-next-line no-console
    console.error('Failed to show error overlay', err)
  }
}

window.addEventListener('error', (e) => {
  try {
    e.preventDefault()
  } catch (err) {
    // ignore
  }
  const msg = (e && e.error && e.error.stack) || e.message || String(e)
  showErrorOverlay(msg)
})

window.addEventListener('unhandledrejection', (e) => {
  try {
    e.preventDefault()
  } catch (err) {
    // ignore
  }
  const msg = (e && e.reason && (e.reason.stack || e.reason.message)) || String(e.reason) || String(e)
  showErrorOverlay(msg)
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
