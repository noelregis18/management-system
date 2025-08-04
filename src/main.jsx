/**
 * Main Application Entry Point
 * 
 * This file initializes the React application and sets up the routing system.
 * It serves as the bridge between the HTML and the React component tree.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Create the root element and render the application
// BrowserRouter enables client-side routing for navigation
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)