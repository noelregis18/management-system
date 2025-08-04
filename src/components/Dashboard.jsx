/**
 * Dashboard Component
 * 
 * This is the main dashboard page that displays key statistics and metrics.
 * It shows summary cards for courses, rooms, departments, and weekly classes
 * exactly as shown in the provided design mockup.
 * Now includes real-time activity tracking with allow/deny system.
 */

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Building, Users, Calendar } from 'lucide-react'
import StatCard from './StatCard'
import ActivityTracker from './ActivityTracker'

const Dashboard = () => {
  const navigate = useNavigate()
  
  // State for activity tracking
  const [activityLog, setActivityLog] = useState([])

  // Real data for 5th Semester CSE B dashboard statistics
  const stats = [
    {
      title: 'Total Courses',
      value: '10',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Theory + Lab + Electives'
    },
    {
      title: 'Total Students',
      value: '65',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: '5th Semester CSE B'
    },
    {
      title: 'Total Credits',
      value: '24',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Credit hours this semester'
    },
    {
      title: 'Current Semester',
      value: 'Fall 2025',
      icon: Building,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Active academic term'
    }
  ]

  // Navigation handlers for Quick Actions
  const handleViewCourses = () => {
    navigate('/courses')
  }

  const handleCheckTimetable = () => {
    navigate('/timetable')
  }

  const handleLabSessions = () => {
    navigate('/timetable')
  }

  /**
   * Handle activity changes from ActivityTracker
   */
  const handleActivityChange = (activityId, action) => {
    const newLogEntry = {
      id: Date.now(),
      activityId,
      action,
      timestamp: new Date(),
      message: `Activity ${activityId} was ${action}`
    }
    
    setActivityLog(prev => [newLogEntry, ...prev])
    console.log(`Activity ${activityId} ${action} at ${new Date().toLocaleTimeString()}`)
  }

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome to your 5th Semester CSE B timetable management system. Here's an overview of your current semester.
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            bgColor={stat.bgColor}
            description={stat.description}
          />
        ))}
      </div>

      {/* Additional Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Activity Tracker */}
        <ActivityTracker onActivityChange={handleActivityChange} />

        {/* Quick Actions Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button 
              onClick={handleViewCourses}
              className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="font-medium text-gray-900">View Courses</div>
              <div className="text-sm text-gray-600">Browse 5th Semester CSE B courses</div>
            </button>
            <button 
              onClick={handleCheckTimetable}
              className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="font-medium text-gray-900">Check Timetable</div>
              <div className="text-sm text-gray-600">View LH-136 weekly schedule</div>
            </button>
            <button 
              onClick={handleLabSessions}
              className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="font-medium text-gray-900">Lab Sessions</div>
              <div className="text-sm text-gray-600">View lab timings and instructors</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard