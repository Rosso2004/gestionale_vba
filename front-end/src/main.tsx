// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import {GlobalStateProvider} from "./global/GlobalStateContext";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <GlobalStateProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </GlobalStateProvider>
  // </React.StrictMode>,
)
