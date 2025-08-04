/**
 * ActivityTracker Component
 *
 * This component manages real-time activity tracking and provides
 * an allow/deny system for changes made to the timetable.
 * Now shows actual upcoming classes based on current date and time.
 */

import React, { useState, useEffect } from 'react'
import { Clock, CheckCircle, XCircle, AlertCircle, Activity, Settings, Calendar, BookOpen } from 'lucide-react'

const ActivityTracker = ({ onActivityChange }) => {
  // Real 5th Semester CSE B timetable data from LH-136
  const timetableData = {
    // Tuesday Schedule
    'Tuesday-9:30-10:20': { course: 'PCC CS-503', instructor: 'AB(CS)', subject: 'Object Oriented Programming' },
    'Tuesday-10:20-11:10': { course: 'ESC-501', instructor: 'SAR(CS)', subject: 'Software Engineering' },
    'Tuesday-11:10-12:00': { course: 'PEC IT-501B', instructor: 'PKP(CS)', subject: 'Artificial Intelligence' },
    'Tuesday-12:00-12:50': { course: 'PCC CS-502', instructor: 'BTM(CS)', subject: 'Operating Systems' },
    'Tuesday-1:40-2:30': { course: 'HSMC 501', instructor: 'NF', subject: 'Introduction to Industrial Management' },
    'Tuesday-2:30-3:20': { course: 'PCC CS-502', instructor: 'BTM(CS)', subject: 'Operating Systems' },
    'Tuesday-3:20-4:10': { course: 'MC CS-501A', instructor: 'TB(E)', subject: 'Constitution of India' },
    'Tuesday-4:10-5:00': { course: 'GROOM', instructor: 'PR(CS)', subject: 'Grooming Session' },

    // Wednesday Schedule  
    'Wednesday-9:30-10:20': { course: 'PCC CS-501', instructor: 'RDB(CS)', subject: 'Compiler Design' },
    'Wednesday-10:20-11:10': { course: 'ESC-501', instructor: 'SAR(CS)', subject: 'Software Engineering' },
    'Wednesday-11:10-12:00': { course: 'PEC IT-501B', instructor: 'PKP(CS)', subject: 'Artificial Intelligence' },
    'Wednesday-12:00-12:50': { course: 'PCC CS-502', instructor: 'BTM(CS)', subject: 'Operating Systems' },
    'Wednesday-1:40-2:30': { course: 'HSMC 501', instructor: 'NF', subject: 'Introduction to Industrial Management' },
    'Wednesday-2:30-3:20': { course: 'ESC 591 (LAB 3&4)', instructor: 'SAR(CS)+SKHC(CS)+ASH(CS)+SHD(CS)', subject: 'Software Engineering Lab' },
    'Wednesday-3:20-4:10': { course: 'ESC 591 (LAB 3&4)', instructor: 'SAR(CS)+SKHC(CS)+ASH(CS)+SHD(CS)', subject: 'Software Engineering Lab' },
    'Wednesday-4:10-5:00': { course: 'ESC 591 (LAB 3&4)', instructor: 'SAR(CS)+SKHC(CS)+ASH(CS)+SHD(CS)', subject: 'Software Engineering Lab' },

    // Thursday Schedule
    'Thursday-9:30-10:20': { course: 'PCC CS-503', instructor: 'AB(CS)', subject: 'Object Oriented Programming' },
    'Thursday-10:20-11:10': { course: 'PCC CS-503', instructor: 'AB(CS)', subject: 'Object Oriented Programming' },
    'Thursday-11:10-12:00': { course: 'ESC-501', instructor: 'SAR(CS)', subject: 'Software Engineering' },
    'Thursday-12:00-12:50': { course: 'PCC CS-501', instructor: 'RDB(CS)', subject: 'Compiler Design' },
    'Thursday-1:40-2:30': { course: 'LIB', instructor: 'LIBRARIAN', subject: 'Library' },
    'Thursday-2:30-3:20': { course: 'PCC CS-593 (LAB 13&14)', instructor: 'BTM(CS)+PR(CS)+MM(CS)+PK(CS)', subject: 'Operating Systems Lab' },
    'Thursday-3:20-4:10': { course: 'PCC CS-593 (LAB 13&14)', instructor: 'BTM(CS)+PR(CS)+MM(CS)+PK(CS)', subject: 'Operating Systems Lab' },
    'Thursday-4:10-5:00': { course: 'PCC CS-593 (LAB 13&14)', instructor: 'BTM(CS)+PR(CS)+MM(CS)+PK(CS)', subject: 'Operating Systems Lab' },

    // Friday Schedule
    'Friday-9:30-10:20': { course: 'PEC IT-501B', instructor: 'PKP(CS)', subject: 'Artificial Intelligence' },
    'Friday-10:20-11:10': { course: 'PCC CS-501', instructor: 'RDB(CS)', subject: 'Compiler Design' },
    'Friday-11:10-12:00': { course: 'PCC CS-502', instructor: 'BTM(CS)', subject: 'Operating Systems' },
    'Friday-12:00-12:50': { course: 'MC CS-501A', instructor: 'TB(E)', subject: 'Constitution of India' },
    'Friday-1:40-2:30': { course: 'LIB', instructor: '', subject: 'Library' },
    'Friday-2:30-3:20': { course: 'APTI', instructor: 'AM(CS)', subject: 'Aptitude Training' },
    'Friday-3:20-4:10': { course: 'APTI', instructor: 'BTM(CS)', subject: 'Aptitude Training' },
    'Friday-4:10-5:00': { course: 'GROOM', instructor: 'PKC(CS)', subject: 'Grooming Session' },

    // Saturday Schedule
    'Saturday-9:30-10:20': { course: 'PCC CS-502', instructor: 'BTM(CS)', subject: 'Operating Systems' },
    'Saturday-10:20-11:10': { course: 'ESC-501', instructor: 'SAR(CS)', subject: 'Software Engineering' },
    'Saturday-11:10-12:00': { course: 'PCC CS-501', instructor: 'RDB(CS)', subject: 'Compiler Design' },
    'Saturday-12:00-12:50': { course: 'PEC IT-501B', instructor: 'PKP(CS)', subject: 'Artificial Intelligence' },
    'Saturday-1:40-2:30': { course: 'HSMC 501', instructor: 'NF', subject: 'Introduction to Industrial Management' },
    'Saturday-2:30-3:20': { course: 'PCC CS-593 (LAB 7&8)', instructor: 'AB(CS)+LKM(CS)+RR(CS)', subject: 'Object Oriented Programming Lab' },
    'Saturday-3:20-4:10': { course: 'PCC CS-593 (LAB 7&8)', instructor: 'AB(CS)+LKM(CS)+RR(CS)', subject: 'Object Oriented Programming Lab' },
    'Saturday-4:10-5:00': { course: 'PCC CS-593 (LAB 7&8)', instructor: 'AB(CS)+LKM(CS)+RR(CS)', subject: 'Object Oriented Programming Lab' },
  }

  // Time slots in order
  const timeSlots = [
    '9:30-10:20', '10:20-11:10', '11:10-12:00', '12:00-12:50', 
    'LUNCH', '1:40-2:30', '2:30-3:20', '3:20-4:10', '4:10-5:00'
  ]

  // Days of the week
  const days = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  // State for activities and permissions
  const [activities, setActivities] = useState([])
  const [currentTime, setCurrentTime] = useState(new Date())

  const [permissions, setPermissions] = useState({
    autoApprove: false,
    requireConfirmation: true,
    notifyOnChanges: true,
    trackAllActivities: true
  })

  /**
   * Get the next class based on current date and time
   */
  const getNextClass = () => {
    const now = new Date()
    const currentDay = now.getDay() // 0 = Sunday, 1 = Monday, etc.
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    
    // Convert current time to minutes for comparison
    const currentTimeInMinutes = currentHour * 60 + currentMinute
    
    // Map JavaScript day to our timetable days
    const dayMap = {
      0: null, // Sunday - no classes
      1: null, // Monday - no classes  
      2: 'Tuesday',
      3: 'Wednesday', 
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    }
    
    const currentDayName = dayMap[currentDay]
    
    // If it's Sunday or Monday, show Tuesday's first class
    if (!currentDayName) {
      const tuesdayFirstClass = timetableData['Tuesday-9:30-10:20']
      return {
        day: 'Tuesday',
        time: '9:30-10:20',
        class: tuesdayFirstClass,
        message: `Next class: ${tuesdayFirstClass.course} (${tuesdayFirstClass.subject}) on Tuesday at 9:30 AM`,
        priority: 'high',
        status: 'upcoming'
      }
    }
    
    // Find the next class for today
    for (let i = 0; i < timeSlots.length; i++) {
      const timeSlot = timeSlots[i]
      if (timeSlot === 'LUNCH') continue
      
      const [startTime] = timeSlot.split('-')
      const [startHour, startMinute] = startTime.split(':').map(Number)
      const startTimeInMinutes = startHour * 60 + startMinute
      
      // If this time slot is in the future today
      if (startTimeInMinutes > currentTimeInMinutes) {
        const classData = timetableData[`${currentDayName}-${timeSlot}`]
        if (classData) {
          return {
            day: currentDayName,
            time: timeSlot,
            class: classData,
            message: `Next class: ${classData.course} (${classData.subject}) today at ${startTime}`,
            priority: 'high',
            status: 'upcoming'
          }
        }
      }
    }
    
    // If no more classes today, find tomorrow's first class
    const currentDayIndex = days.indexOf(currentDayName)
    const nextDayIndex = (currentDayIndex + 1) % days.length
    const nextDay = days[nextDayIndex]
    
    // Find first class of next day
    for (const timeSlot of timeSlots) {
      if (timeSlot === 'LUNCH') continue
      
      const classData = timetableData[`${nextDay}-${timeSlot}`]
      if (classData) {
        const [startTime] = timeSlot.split('-')
        return {
          day: nextDay,
          time: timeSlot,
          class: classData,
          message: `Next class: ${classData.course} (${classData.subject}) on ${nextDay} at ${startTime}`,
          priority: 'medium',
          status: 'upcoming'
        }
      }
    }
    
    return null
  }

  /**
   * Get current class if any
   */
  const getCurrentClass = () => {
    const now = new Date()
    const currentDay = now.getDay()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    const currentTimeInMinutes = currentHour * 60 + currentMinute
    
    const dayMap = {
      0: null, 1: null, 2: 'Tuesday', 3: 'Wednesday', 
      4: 'Thursday', 5: 'Friday', 6: 'Saturday'
    }
    
    const currentDayName = dayMap[currentDay]
    if (!currentDayName) return null
    
    // Check if we're currently in a class
    for (let i = 0; i < timeSlots.length; i++) {
      const timeSlot = timeSlots[i]
      if (timeSlot === 'LUNCH') continue
      
      const [startTime, endTime] = timeSlot.split('-')
      const [startHour, startMinute] = startTime.split(':').map(Number)
      const [endHour, endMinute] = endTime.split(':').map(Number)
      
      const startTimeInMinutes = startHour * 60 + startMinute
      const endTimeInMinutes = endHour * 60 + endMinute
      
      if (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes) {
        const classData = timetableData[`${currentDayName}-${timeSlot}`]
        if (classData) {
          return {
            day: currentDayName,
            time: timeSlot,
            class: classData,
            message: `Currently in: ${classData.course} (${classData.subject})`,
            priority: 'high',
            status: 'ongoing'
          }
        }
      }
    }
    
    return null
  }

  /**
   * Generate real-time activities based on timetable
   */
  const generateRealTimeActivities = () => {
    const newActivities = []
    
    // Add current class if any
    const currentClass = getCurrentClass()
    if (currentClass) {
      newActivities.push({
        id: Date.now(),
        type: 'current_class',
        message: currentClass.message,
        timestamp: new Date(),
        status: 'ongoing',
        priority: 'high',
        requiresApproval: false,
        classData: currentClass
      })
    }
    
    // Add next class
    const nextClass = getNextClass()
    if (nextClass) {
      newActivities.push({
        id: Date.now() + 1,
        type: 'next_class',
        message: nextClass.message,
        timestamp: new Date(),
        status: 'upcoming',
        priority: 'medium',
        requiresApproval: false,
        classData: nextClass
      })
    }
    
    return newActivities
  }

  // Update activities and current time every minute
  useEffect(() => {
    const updateActivities = () => {
      const newActivities = generateRealTimeActivities()
      setActivities(newActivities)
      setCurrentTime(new Date())
    }
    
    // Update immediately
    updateActivities()
    
    // Update every minute
    const interval = setInterval(updateActivities, 60000)
    
    return () => clearInterval(interval)
  }, [])

  /**
   * Handle activity approval/rejection
   */
  const handleActivityAction = (activityId, action) => {
    setActivities(prev =>
      prev.map(activity =>
        activity.id === activityId
          ? { ...activity, status: action }
          : activity
      )
    )

    // Notify parent component
    if (onActivityChange) {
      onActivityChange(activityId, action)
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
   * Get status icon
   */
  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'denied': return <XCircle className="w-4 h-4 text-red-500" />
      case 'pending': return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case 'completed': return <CheckCircle className="w-4 h-4 text-blue-500" />
      case 'ongoing': return <Clock className="w-4 h-4 text-blue-500" />
      case 'upcoming': return <Calendar className="w-4 h-4 text-green-500" />
      default: return <Activity className="w-4 h-4 text-gray-500" />
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
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          <div className="ml-3 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            Live
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {currentTime.toLocaleTimeString()}
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  {getStatusIcon(activity.status)}
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    {activity.message}
                  </span>
                  {activity.classData && (
                    <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {activity.classData.class.course}
                    </span>
                  )}
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  {formatTimestamp(activity.timestamp)}
                  {activity.classData && (
                    <>
                      <span className="mx-2">•</span>
                      <BookOpen className="w-3 h-3 mr-1" />
                      {activity.classData.class.instructor}
                    </>
                  )}
                </div>
              </div>
              
              {/* Action Buttons for Pending Activities */}
              {activity.status === 'pending' && activity.requiresApproval && (
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleActivityAction(activity.id, 'approved')}
                    className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                    title="Approve"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleActivityAction(activity.id, 'denied')}
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
      {activities.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Activity className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No recent activity</p>
        </div>
      )}
    </div>
  )
}

export default ActivityTracker 