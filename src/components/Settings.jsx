/**
 * Settings Component
 * 
 * This component provides essential settings for the timetable management system.
 * Users can customize timetable display preferences and basic application settings.
 */

import React, { useState } from 'react'
import { Settings as SettingsIcon, Save, RefreshCw, Bell, CheckCircle, XCircle } from 'lucide-react'

const Settings = () => {
  // Essential settings for timetable management
  const [settings, setSettings] = useState({
    timetable: {
      defaultView: 'weekly',
      showWeekends: false,
      startTime: '09:30',
      endTime: '17:00',
      autoRefresh: true
    },
    notifications: {
      classReminders: true,
      scheduleChanges: true,
      activityUpdates: true
    }
  })

  /**
   * Handle settings changes
   */
  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }))
  }

  /**
   * Save settings
   */
  const handleSaveSettings = () => {
    console.log('Settings saved:', settings)
    // Apply settings to timetable
    applySettingsToTimetable()
    // Show success notification
  }

  /**
   * Apply settings to timetable view
   */
  const applySettingsToTimetable = () => {
    // Store settings in localStorage for persistence
    localStorage.setItem('timetableSettings', JSON.stringify(settings))
    
    // Navigate to timetable with new settings
    window.location.href = '/timetable'
  }

  /**
   * Handle immediate view change
   */
  const handleViewChange = (newView) => {
    handleSettingChange('timetable', 'defaultView', newView)
    // Apply view change immediately
    setTimeout(() => {
      applySettingsToTimetable()
    }, 500)
  }

  /**
   * Handle immediate time change
   */
  const handleTimeChange = (type, newTime) => {
    handleSettingChange('timetable', type, newTime)
    // Apply time change immediately
    setTimeout(() => {
      applySettingsToTimetable()
    }, 500)
  }

  /**
   * Reset settings to default
   */
  const handleResetSettings = () => {
    setSettings({
      timetable: {
        defaultView: 'weekly',
        showWeekends: false,
        startTime: '09:30',
        endTime: '17:00',
        autoRefresh: true
      },
      notifications: {
        classReminders: true,
        scheduleChanges: true,
        activityUpdates: true
      }
    })
  }

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">
          Customize your timetable management preferences.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Timetable Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-6">
            <SettingsIcon className="w-6 h-6 text-primary-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Timetable Settings</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default View</label>
              <select 
                value={settings.timetable.defaultView}
                onChange={(e) => handleViewChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
              >
                <option value="weekly">Weekly View</option>
                <option value="daily">Daily View</option>
                <option value="list">List View</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
              <input
                type="time"
                value={settings.timetable.startTime}
                onChange={(e) => handleTimeChange('startTime', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
              <input
                type="time"
                value={settings.timetable.endTime}
                onChange={(e) => handleTimeChange('endTime', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.timetable.showWeekends}
                  onChange={(e) => handleSettingChange('timetable', 'showWeekends', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Show Weekends</span>
              </label>



              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.timetable.autoRefresh}
                  onChange={(e) => handleSettingChange('timetable', 'autoRefresh', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Auto Refresh Timetable</span>
              </label>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-6">
            <Bell className="w-6 h-6 text-primary-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.classReminders}
                onChange={(e) => handleSettingChange('notifications', 'classReminders', e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Class Reminders</span>
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.scheduleChanges}
                onChange={(e) => handleSettingChange('notifications', 'scheduleChanges', e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Schedule Change Notifications</span>
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.activityUpdates}
                onChange={(e) => handleSettingChange('notifications', 'activityUpdates', e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Activity Updates</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleResetSettings}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset to Default
          </button>
          <button
            onClick={handleSaveSettings}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings