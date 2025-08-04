/**
 * ActivityLog Component
 * 
 * This component provides a comprehensive view of all activities
 * with filtering, search, and bulk action capabilities.
 */

import React, { useState, useEffect } from 'react'
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Activity, 
  Search, 
  Filter, 
  Download,
  Trash2,
  Eye,
  Calendar,
  User
} from 'lucide-react'

const ActivityLog = ({ activities = [], onBulkAction }) => {
  // State for filtering and search
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [selectedActivities, setSelectedActivities] = useState([])
  const [viewMode, setViewMode] = useState('list') // list or grid

  // Filter activities based on search and filters
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || activity.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || activity.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  /**
   * Handle bulk actions
   */
  const handleBulkAction = (action) => {
    if (selectedActivities.length === 0) return
    
    if (onBulkAction) {
      onBulkAction(selectedActivities, action)
    }
    
    setSelectedActivities([])
  }

  /**
   * Toggle activity selection
   */
  const toggleActivitySelection = (activityId) => {
    setSelectedActivities(prev => 
      prev.includes(activityId)
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    )
  }

  /**
   * Select all activities
   */
  const selectAllActivities = () => {
    setSelectedActivities(filteredActivities.map(activity => activity.id))
  }

  /**
   * Clear all selections
   */
  const clearSelections = () => {
    setSelectedActivities([])
  }

  /**
   * Get status color
   */
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-50'
      case 'denied': return 'text-red-600 bg-red-50'
      case 'pending': return 'text-yellow-600 bg-yellow-50'
      case 'completed': return 'text-blue-600 bg-blue-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  /**
   * Get priority color
   */
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  /**
   * Format timestamp
   */
  const formatTimestamp = (timestamp) => {
    const now = new Date()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Activity className="w-6 h-6 text-primary-600 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Activity Log</h2>
          <span className="ml-3 px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
            {filteredActivities.length} activities
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title={`Switch to ${viewMode === 'list' ? 'grid' : 'list'} view`}
          >
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="denied">Denied</option>
          <option value="completed">Completed</option>
        </select>
        
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        
        <button className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </button>
      </div>

      {/* Bulk Actions */}
      {selectedActivities.length > 0 && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">
              {selectedActivities.length} activities selected
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleBulkAction('approve')}
                className="flex items-center px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Approve All
              </button>
              <button
                onClick={() => handleBulkAction('deny')}
                className="flex items-center px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
              >
                <XCircle className="w-4 h-4 mr-1" />
                Deny All
              </button>
              <button
                onClick={clearSelections}
                className="flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Activities List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredActivities.map((activity) => (
          <div 
            key={activity.id} 
            className={`border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors ${
              selectedActivities.includes(activity.id) ? 'bg-blue-50 border-blue-200' : ''
            }`}
          >
            <div className="flex items-start">
              {/* Checkbox for selection */}
              <input
                type="checkbox"
                checked={selectedActivities.includes(activity.id)}
                onChange={() => toggleActivitySelection(activity.id)}
                className="mt-1 mr-3"
              />
              
              {/* Activity content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">
                      {activity.message}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(activity.priority)}`}>
                      {activity.priority}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatTimestamp(activity.timestamp)}
                  </div>
                </div>
                
                {/* Activity details */}
                <div className="flex items-center space-x-4 text-xs text-gray-600">
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {activity.timestamp.toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    System
                  </span>
                  {activity.requiresApproval && (
                    <span className="text-orange-600 font-medium">
                      Requires Approval
                    </span>
                  )}
                </div>
              </div>
              
              {/* Action buttons for pending activities */}
              {activity.status === 'pending' && activity.requiresApproval && (
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => onBulkAction && onBulkAction([activity.id], 'approve')}
                    className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                    title="Approve"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onBulkAction && onBulkAction([activity.id], 'deny')}
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Deny"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredActivities.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Activity className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium mb-2">No activities found</p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Pagination */}
      {filteredActivities.length > 0 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {filteredActivities.length} of {activities.length} activities
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 text-sm bg-primary-600 text-white rounded">
              1
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ActivityLog 