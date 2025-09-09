/**
 * Sidebar Navigation Component
 * 
 * This component renders the left sidebar navigation with all menu items.
 * It matches the design from the provided image with proper icons and styling.
 * The sidebar includes the app title and navigation items with active states.
 * 
 * Key features:
 * - Responsive navigation menu
 * - Active state highlighting
 * - Icon-based navigation items
 * - Gradient background design
 * - Version information display
 */

// Import React for component creation
import React from 'react'
// Import React Router hooks for navigation and location tracking
import { useNavigate, useLocation } from 'react-router-dom'
// Import Clerk authentication hooks
import { useClerk } from '@clerk/clerk-react'
// Import Lucide React icons for navigation items
import { 
  LayoutDashboard,  // Dashboard icon
  Calendar,         // Timetable icon
  BookOpen,         // Courses icon
  Building,         // Rooms icon
  Users,            // Users icon (if needed)
  Settings,         // Settings icon
  HelpCircle,       // Help icon
  LogOut            // Logout icon
} from 'lucide-react'

/**
 * Sidebar Component
 * 
 * @param {string} activePage - Current active page identifier
 * @param {function} setActivePage - Function to update active page state
 * 
 * This component provides:
 * - Application branding and title
 * - Navigation menu with icons
 * - Active state management
 * - Route navigation functionality
 */
const Sidebar = ({ activePage, setActivePage }) => {
  // React Router hook for programmatic navigation
  const navigate = useNavigate()
  // React Router hook to get current location information
  const location = useLocation()
  // Clerk hook for authentication actions
  const { signOut } = useClerk()

  // Navigation menu items with their corresponding icons and routes
  // Each item contains an id, display label, icon component, and route path
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
   * 
   * @param {Object} item - The menu item object containing id and path
   */
  const handleNavigation = (item) => {
    // Update the active page state for highlighting
    setActivePage(item.id)
    // Navigate to the selected route
    navigate(item.path)
  }

  /**
   * Check if a menu item is currently active
   * Compares the current location pathname with the item's path
   * Special handling for dashboard route (both '/' and '/dashboard')
   * 
   * @param {string} path - The route path to check
   * @returns {boolean} - True if the item is currently active
   */
  const isActiveItem = (path) => {
    // Special case for dashboard: both '/' and '/dashboard' should highlight dashboard
    if (path === '/dashboard' && (location.pathname === '/' || location.pathname === '/dashboard')) {
      return true
    }
    // For other routes, check exact path match
    return location.pathname === path
  }

  /**
   * Handle user logout
   * Signs out the user and redirects to landing page
   */
  const handleLogout = async () => {
    try {
      await signOut()
      // After logout, the App component will automatically show the landing page
      // due to the authentication state change
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return (
    // Main sidebar container with gradient background and fixed width
    <div className="w-64 bg-gradient-to-b from-primary-600 to-primary-800 text-white flex flex-col shadow-xl">
      {/* Application Header Section */}
      <div className="p-6 border-b border-white/10">
        {/* Main application title */}
        <h1 className="text-xl font-bold text-white">Timetable App</h1>
        {/* Subtitle describing the application */}
        <p className="text-primary-100 text-sm mt-1">College Management System</p>
      </div>

      {/* Navigation Menu Section */}
      <nav className="flex-1 p-4 space-y-2">
        {/* Map through menu items to create navigation buttons */}
        {menuItems.map((item) => {
          // Extract the icon component from the item
          const Icon = item.icon
          // Check if this item is currently active
          const isActive = isActiveItem(item.path)
          
          return (
            // Navigation item container with click handler
            <div
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              {/* Icon for the navigation item */}
              <Icon className="w-5 h-5 mr-3" />
              {/* Label text for the navigation item */}
              <span className="font-medium">{item.label}</span>
            </div>
          )
        })}
      </nav>

      {/* Logout Button Section */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 cursor-pointer group"
        >
          <LogOut className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>

      {/* Footer Section with Version Information */}
      <div className="p-4 border-t border-white/10">
        <div className="text-xs text-primary-200 text-center">
          Version 1.0.0
        </div>
      </div>
    </div>
  )
}

// Export the Sidebar component as the default export
export default Sidebar