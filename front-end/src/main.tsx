// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {GlobalStateProvider} from "./global/GlobalStateContext";
import { HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <GlobalStateProvider>
      <HashRouter>
          <App />
        </HashRouter>
    </GlobalStateProvider>
  // </React.StrictMode>,
)