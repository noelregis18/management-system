/**
 * StatCard Component
 * 
 * A reusable card component for displaying statistics on the dashboard.
 * Shows an icon, title, value, and description in a clean, professional layout.
 */

import React from 'react'

const StatCard = ({ title, value, icon: Icon, color, bgColor, description }) => {
  return (
    <div className="stat-card animate-fade-in">
      {/* Icon Container */}
      <div className={`inline-flex items-center justify-center w-12 h-12 ${bgColor} rounded-lg mb-4`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>

      {/* Card Content */}
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
        <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
        <p className="text-xs text-gray-500">{description}</p>
      </div>

      {/* Hover Effect Indicator */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  )
}

export default StatCard