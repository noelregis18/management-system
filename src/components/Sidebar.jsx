/**
 * Sidebar Navigation Component
 * 
 * This component renders the left sidebar navigation with all menu items.
 * It matches the design from the provided image with proper icons and styling.
 * The sidebar includes the app title and navigation items with active states.
 */

import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  Building, 
  Users, 
  Settings, 
  HelpCircle 
} from 'lucide-react'

const Sidebar = ({ activePage, setActivePage }) => {
  const navigate = useNavigate()
  const location = useLocation()

  // Navigation menu items with their corresponding icons and routes
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'timetable', label: 'Timetable', icon: Calendar, path: '/timetable' },
    { id: 'courses', label: 'Courses', icon: BookOpen, path: '/courses' },
    { id: 'rooms', label: 'Rooms', icon: Building, path: '/rooms' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
    { id: 'help', label: 'Help', icon: HelpCircle, path: '/help' },
  ]

  /**
   * Handle navigation item clicks
   * Updates the active page state and navigates to the selected route
   */
  const handleNavigation = (item) => {
    setActivePage(item.id)
    navigate(item.path)
  }

  /**
   * Check if a menu item is currently active
   * Compares the current location pathname with the item's path
   */
  const isActiveItem = (path) => {
    if (path === '/dashboard' && (location.pathname === '/' || location.pathname === '/dashboard')) {
      return true
    }
    return location.pathname === path
  }

  return (
    <div className="w-64 bg-gradient-to-b from-primary-600 to-primary-800 text-white flex flex-col shadow-xl">
      {/* Application Header */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold text-white">Timetable App</h1>
        <p className="text-primary-100 text-sm mt-1">College Management System</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = isActiveItem(item.path)
          
          return (
            <div
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </div>
          )
        })}
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-white/10">
        <div className="text-xs text-primary-200 text-center">
          Version 1.0.0
        </div>
      </div>
    </div>
  )
}

export default Sidebar