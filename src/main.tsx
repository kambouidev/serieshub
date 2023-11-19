import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import 'primeicons/primeicons.css';
import 'react-loading-skeleton/dist/skeleton.css'

import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';                       // core css

import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
