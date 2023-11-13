import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './config/reportWebVitals'
import './tailwindcss.output.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

reportWebVitals()
