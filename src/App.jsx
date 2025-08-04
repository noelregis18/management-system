/**
 * Main Application Component
 * 
 * This is the root component that manages the overall layout and routing.
 * It combines the sidebar navigation with the main content area and handles
 * the application's routing logic.
 */

import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Timetable from './components/Timetable'
import Courses from './components/Courses'
import Rooms from './components/Rooms'
import Settings from './components/Settings'
import Help from './components/Help'

function App() {
  // State to track the currently active page for navigation highlighting
  const [activePage, setActivePage] = useState('dashboard')

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto">
          <Routes>
            {/* Define all application routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App