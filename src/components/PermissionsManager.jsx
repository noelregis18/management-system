/**
 * PermissionsManager Component
 * 
 * This component provides comprehensive control over activity permissions,
 * approval workflows, and bulk action management.
 */

import React, { useState } from 'react'
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Settings, 
  Users, 
  Lock, 
  Unlock,
  Activity,
  Clock,
  UserCheck,
  UserX
} from 'lucide-react'

const PermissionsManager = ({ onPermissionChange, onBulkAction }) => {
  // State for permissions and settings
  const [permissions, setPermissions] = useState({
    autoApprove: false,
    requireConfirmation: true,
    notifyOnChanges: true,
    trackAllActivities: true,
    allowBulkApproval: false,
    requireReasonForDenial: true,
    allowSystemChanges: false,
    requireAdminApproval: false,
    autoBackupBeforeChanges: true,
    logAllActions: true
  })

  const [approvalWorkflow, setApprovalWorkflow] = useState({
    singleApproval: true,
    multiLevelApproval: false,
    timeBasedApproval: false,
    roleBasedApproval: true
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    desktopNotifications: true,
    weeklyReports: false,
    immediateAlerts: true
  })

  /**
   * Handle permission changes
   */
  const handlePermissionChange = (key, value) => {
    setPermissions(prev => ({
      ...prev,
      [key]: value
    }))

    if (onPermissionChange) {
      onPermissionChange(key, value)
    }
  }

  /**
   * Handle workflow changes
   */
  const handleWorkflowChange = (key, value) => {
    setApprovalWorkflow(prev => ({
      ...prev,
      [key]: value
    }))
  }

  /**
   * Handle notification changes
   */
  const handleNotificationChange = (key, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  /**
   * Bulk action handlers
   */
  const handleAllowAllChanges = () => {
    if (onBulkAction) {
      onBulkAction('allow_all')
    }
  }

  const handleDenyAllChanges = () => {
    if (onBulkAction) {
      onBulkAction('deny_all')
    }
  }

  const handleResetPermissions = () => {
    setPermissions({
      autoApprove: false,
      requireConfirmation: true,
      notifyOnChanges: true,
      trackAllActivities: true,
      allowBulkApproval: false,
      requireReasonForDenial: true,
      allowSystemChanges: false,
      requireAdminApproval: false,
      autoBackupBeforeChanges: true,
      logAllActions: true
    })
  }

  return (
    <div className="space-y-6">
      {/* Main Permissions Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center mb-6">
          <Shield className="w-6 h-6 text-primary-600 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Activity Permissions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Core Permissions */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 mb-3">Core Permissions</h3>
            {Object.entries(permissions).slice(0, 5).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <div className="font-medium text-gray-900 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </div>
                  <div className="text-sm text-gray-600">
                    {key === 'autoApprove' && 'Automatically approve all changes'}
                    {key === 'requireConfirmation' && 'Require manual approval for changes'}
                    {key === 'notifyOnChanges' && 'Send notifications for all changes'}
                    {key === 'trackAllActivities' && 'Track and log all activities'}
                    {key === 'allowBulkApproval' && 'Allow bulk approval actions'}
                  </div>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handlePermissionChange(key, e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-primary-600' : 'bg-gray-200'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
                </label>
              </div>
            ))}
          </div>

          {/* Advanced Permissions */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 mb-3">Advanced Permissions</h3>
            {Object.entries(permissions).slice(5).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <div className="font-medium text-gray-900 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </div>
                  <div className="text-sm text-gray-600">
                    {key === 'requireReasonForDenial' && 'Require reason when denying changes'}
                    {key === 'allowSystemChanges' && 'Allow system-level changes'}
                    {key === 'requireAdminApproval' && 'Require admin approval for sensitive changes'}
                    {key === 'autoBackupBeforeChanges' && 'Auto-backup before making changes'}
                    {key === 'logAllActions' && 'Log all user actions'}
                  </div>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handlePermissionChange(key, e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-primary-600' : 'bg-gray-200'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Approval Workflow */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center mb-6">
          <UserCheck className="w-6 h-6 text-primary-600 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Approval Workflow</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(approvalWorkflow).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div>
                <div className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </div>
                <div className="text-sm text-gray-600">
                  {key === 'singleApproval' && 'Single level approval process'}
                  {key === 'multiLevelApproval' && 'Multi-level approval workflow'}
                  {key === 'timeBasedApproval' && 'Time-based approval system'}
                  {key === 'roleBasedApproval' && 'Role-based approval hierarchy'}
                </div>
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleWorkflowChange(key, e.target.checked)}
                  className="sr-only"
                />
                <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-primary-600' : 'bg-gray-200'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center mb-6">
          <AlertTriangle className="w-6 h-6 text-primary-600 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(notificationSettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div>
                <div className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </div>
                <div className="text-sm text-gray-600">
                  {key === 'emailNotifications' && 'Receive notifications via email'}
                  {key === 'pushNotifications' && 'Receive push notifications'}
                  {key === 'desktopNotifications' && 'Show desktop notifications'}
                  {key === 'weeklyReports' && 'Receive weekly activity reports'}
                  {key === 'immediateAlerts' && 'Get immediate alerts for urgent changes'}
                </div>
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleNotificationChange(key, e.target.checked)}
                  className="sr-only"
                />
                <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-primary-600' : 'bg-gray-200'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center mb-6">
          <Activity className="w-6 h-6 text-primary-600 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleAllowAllChanges}
            className="flex items-center justify-center p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
          >
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-700 font-medium">Allow All Changes</span>
          </button>

          <button
            onClick={handleDenyAllChanges}
            className="flex items-center justify-center p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
          >
            <XCircle className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-red-700 font-medium">Deny All Changes</span>
          </button>

          <button
            onClick={handleResetPermissions}
            className="flex items-center justify-center p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-600 mr-2" />
            <span className="text-gray-700 font-medium">Reset Permissions</span>
          </button>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-blue-600 mr-2" />
            <div className="text-sm text-blue-700">
              <strong>Note:</strong> Changes to permissions will affect all future activities. 
              Existing pending activities will retain their current approval requirements.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PermissionsManager 