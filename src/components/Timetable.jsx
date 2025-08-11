/**
 * Timetable Component
 * 
 * This component displays the weekly timetable in a clean, organized format.
 * It shows class schedules with proper time slots and room information.
 */

import React, { useState } from 'react'
import { Calendar, Clock, MapPin, Users, Settings, Eye, EyeOff } from 'lucide-react'

const Timetable = () => {
  const [view, setView] = useState('weekly')
  const [showWeekends, setShowWeekends] = useState(false)

  // Sample timetable data for 5th Semester CSE B
  const timetableData = {
    'Monday': {
      '09:30-10:20': null,
      '10:20-11:10': null,
      '11:10-12:00': null,
      '12:00-12:50': null,
      'LUNCH': { subject: 'Lunch Break', room: '', instructor: '' },
      '13:40-14:30': null,
      '14:30-15:20': null,
      '15:20-16:10': null,
      '16:10-17:00': null
    },
    'Tuesday': {
      '09:30-10:20': { course: 'PCC CS-503', instructor: 'AB(CS)', subject: 'Object Oriented Programming' },
      '10:20-11:10': { course: 'ESC-501', instructor: 'SAR(CS)', subject: 'Software Engineering' },
      '11:10-12:00': { course: 'PEC IT-501B', instructor: 'PKP(CS)', subject: 'Artificial Intelligence' },
      '12:00-12:50': { course: 'PCC CS-502', instructor: 'BTM(CS)', subject: 'Operating Systems' },
      'LUNCH': { subject: 'Lunch Break', room: '', instructor: '' },
      '13:40-14:30': { course: 'HSMC 501', instructor: 'NF', subject: 'Introduction to Industrial Management' },
      '14:30-15:20': { course: 'PCC CS-502', instructor: 'BTM(CS)', subject: 'Operating Systems' },
      '15:20-16:10': { course: 'MC CS-501A', instructor: 'TB(E)', subject: 'Constitution of India' },
      '16:10-17:00': { course: 'GROOM', instructor: 'PR(CS)', subject: 'Grooming Session' }
    },
    'Wednesday': {
      '09:30-10:20': { course: 'PCC CS-501', instructor: 'RDB(CS)', subject: 'Compiler Design' },
      '10:20-11:10': { course: 'ESC-501', instructor: 'SAR(CS)', subject: 'Software Engineering' },
      '11:10-12:00': { course: 'PEC IT-501B', instructor: 'PKP(CS)', subject: 'Artificial Intelligence' },
      '12:00-12:50': { course: 'PCC CS-502', instructor: 'BTM(CS)', subject: 'Operating Systems' },
      'LUNCH': { subject: 'Lunch Break', room: '', instructor: '' },
      '13:40-14:30': { course: 'HSMC 501', instructor: 'NF', subject: 'Introduction to Industrial Management' },
      '14:30-15:20': { course: 'ESC 591 (LAB 3&4)', instructor: 'SAR(CS)+SKHC(CS)+ASH(CS)+SHD(CS)', subject: 'Software Engineering Lab' },
      '15:20-16:10': { course: 'ESC 591 (LAB 3&4)', instructor: 'SAR(CS)+SKHC(CS)+ASH(CS)+SHD(CS)', subject: 'Software Engineering Lab' },
      '16:10-17:00': { course: 'ESC 591 (LAB 3&4)', instructor: 'SAR(CS)+SKHC(CS)+ASH(CS)+SHD(CS)', subject: 'Software Engineering Lab' }
    },
    'Thursday': {
      '09:30-10:20': { course: 'PCC CS-503', instructor: 'AB(CS)', subject: 'Object Oriented Programming' },
      '10:20-11:10': { course: 'PCC CS-503', instructor: 'AB(CS)', subject: 'Object Oriented Programming' },
      '11:10-12:00': { course: 'ESC-501', instructor: 'SAR(CS)', subject: 'Software Engineering' },
      '12:00-12:50': { course: 'PCC CS-501', instructor: 'RDB(CS)', subject: 'Compiler Design' },
      'LUNCH': { subject: 'Lunch Break', room: '', instructor: '' },
      '13:40-14:30': { course: 'LIB', instructor: 'LIBRARIAN', subject: 'Library' },
      '14:30-15:20': { course: 'PCC CS-593 (LAB 3&4)', instructor: 'BTM(CS)+PR(CS)+MM(CS)+PK(CS)', subject: 'Operating Systems Lab' },
      '15:20-16:10': { course: 'PCC CS-593 (LAB 3&4)', instructor: 'BTM(CS)+PR(CS)+MM(CS)+PK(CS)', subject: 'Operating Systems Lab' },
      '16:10-17:00': { course: 'PCC CS-593 (LAB 3&4)', instructor: 'BTM(CS)+PR(CS)+MM(CS)+PK(CS)', subject: 'Operating Systems Lab' }
    },
    'Friday': {
      '09:30-10:20': { course: 'PEC IT-501B', instructor: 'PKP(CS)', subject: 'Artificial Intelligence' },
      '10:20-11:10': { course: 'PCC CS-501', instructor: 'RDB(CS)', subject: 'Compiler Design' },
      '11:10-12:00': { course: 'PCC CS-502', instructor: 'BTM(CS)', subject: 'Operating Systems' },
      '12:00-12:50': { course: 'MC CS-501A', instructor: 'TB(E)', subject: 'Constitution of India' },
      'LUNCH': { subject: 'Lunch Break', room: '', instructor: '' },
      '13:40-14:30': { course: 'LIB', instructor: '', subject: 'Library' },
      '14:30-15:20': { course: 'APTI', instructor: 'AM(CS)', subject: 'Aptitude Training' },
      '15:20-16:10': { course: 'APTI', instructor: 'BTM(CS)', subject: 'Aptitude Training' },
      '16:10-17:00': { course: 'GROOM', instructor: 'PKC(CS)', subject: 'Grooming Session' }
    },
    'Saturday': {
      '09:30-10:20': { course: 'PCC CS-502', instructor: 'BTM(CS)', subject: 'Operating Systems' },
      '10:20-11:10': { course: 'ESC-501', instructor: 'SAR(CS)', subject: 'Software Engineering' },
      '11:10-12:00': { course: 'PCC CS-501', instructor: 'RDB(CS)', subject: 'Compiler Design' },
      '12:00-12:50': { course: 'PEC IT-501B', instructor: 'PKP(CS)', subject: 'Artificial Intelligence' },
      'LUNCH': { subject: 'Lunch Break', room: '', instructor: '' },
      '13:40-14:30': { course: 'HSMC 501', instructor: 'NF', subject: 'Introduction to Industrial Management' },
      '14:30-15:20': { course: 'PCC CS-593 (LAB 7&8)', instructor: 'AB(CS)+LKM(CS)+RR(CS)', subject: 'Object Oriented Programming Lab' },
      '15:20-16:10': { course: 'PCC CS-593 (LAB 7&8)', instructor: 'AB(CS)+LKM(CS)+RR(CS)', subject: 'Object Oriented Programming Lab' },
      '16:10-17:00': { course: 'PCC CS-593 (LAB 7&8)', instructor: 'AB(CS)+LKM(CS)+RR(CS)', subject: 'Object Oriented Programming Lab' }
    },
    'Sunday': {
      '09:30-10:20': null,
      '10:20-11:10': null,
      '11:10-12:00': null,
      '12:00-12:50': null,
      'LUNCH': { subject: 'Lunch Break', room: '', instructor: '' },
      '13:40-14:30': null,
      '14:30-15:20': null,
      '15:20-16:10': null,
      '16:10-17:00': null
    }
  }

  const timeSlots = ['09:30-10:20', '10:20-11:10', '11:10-12:00', '12:00-12:50', 'LUNCH', '13:40-14:30', '14:30-15:20', '15:20-16:10', '16:10-17:00']
  // Fixed weekend logic: Tuesday-Saturday are class days, Sunday-Monday are weekends
  const days = showWeekends ? ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] : ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const getClassData = (day, time) => {
    return timetableData[day]?.[time] || null
  }

  const renderWeeklyView = () => (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-gray-900 min-w-[1200px]">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th className="p-4 text-left font-bold text-gray-800 text-sm min-w-[100px] sticky left-0 bg-white z-10">Time</th>
            {days.map(day => (
              <th key={day} className={`p-4 text-center font-bold text-sm min-w-[140px] max-w-[160px] ${
                (day === 'Sunday' || day === 'Monday') ? 'text-gray-600 bg-gray-100' : 'text-gray-800'
              }`}>
                <div className="truncate">{day}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time) => (
            <tr key={time} className="border-b border-gray-200">
              <td className="p-4 font-bold text-gray-700 text-xs sticky left-0 bg-white z-10 border-r border-gray-200">
                <div className="truncate">{time}</div>
              </td>
              {days.map((day) => {
                const classData = getClassData(day, time)
                
                if (time === 'LUNCH') {
                  // Show lunch break as null on Sunday and Monday (weekends)
                  if (day === 'Sunday' || day === 'Monday') {
                    return (
                      <td key={day} className={`p-3 border border-gray-200 ${
                        (day === 'Sunday' || day === 'Monday') ? 'bg-gray-100' : ''
                      }`}>
                        <div className="h-52 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 p-4">
                          <span className="text-base text-gray-600 font-semibold text-center leading-tight">No Lunch Break</span>
                        </div>
                      </td>
                    )
                  }
                  
                  return (
                    <td key={day} className="p-3 bg-orange-50 border border-orange-200">
                      <div className="text-center text-orange-800 font-bold text-xs h-52 flex flex-col justify-center">
                        <div className="mb-2">LUNCH</div>
                        <div className="text-orange-600 text-xs">
                          12:50-1:40
                        </div>
                      </div>
                    </td>
                  )
                }

                if (!classData) {
                  return (
                    <td key={day} className={`p-3 border border-gray-200 ${
                      (day === 'Sunday' || day === 'Monday') ? 'bg-gray-100' : ''
                    }`}>
                      <div className="h-52 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 p-4">
                        <span className="text-base text-gray-600 font-semibold text-center leading-tight">No Class</span>
                      </div>
                    </td>
                  )
                }

                return (
                  <td key={day} className={`p-3 border border-gray-200 ${
                    (day === 'Sunday' || day === 'Monday') ? 'bg-gray-100' : ''
                  }`}>
                    <div className="h-52 p-4 rounded-lg bg-blue-50 border border-blue-200 flex flex-col justify-between">
                      <div className="font-bold text-sm mb-2 text-blue-900 leading-tight truncate">
                        {classData.course}
                      </div>
                      <div className="font-semibold text-sm mb-2 text-blue-900 leading-tight line-clamp-3">
                        {classData.subject}
                      </div>
                      <div className="text-xs text-blue-700 font-medium leading-tight line-clamp-3 mb-2">
                        {classData.instructor}
                      </div>
                      {/* Lab sessions have special styling */}
                      {classData.course.includes('LAB') && (
                        <div className="mt-auto text-xs bg-green-100 text-green-800 px-3 py-1.5 rounded-full font-bold text-center">
                          LAB
                        </div>
                      )}
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderDailyView = () => (
    <div className="space-y-6">
      {days.map((day) => (
        <div key={day} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">{day}</h3>
          <div className="space-y-4">
            {timeSlots.map((time) => {
              const classData = getClassData(day, time)
              
              if (time === 'LUNCH') {
                // Show lunch break as null on Sunday and Monday (weekends)
                if (day === 'Sunday' || day === 'Monday') {
                  return (
                    <div key={time} className="flex items-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                      <div className="w-20 font-bold text-gray-700 text-sm">{time}</div>
                      <div className="flex-1 text-center text-gray-500 font-medium text-sm">
                        No Lunch Break (Weekend)
                      </div>
                    </div>
                  )
                }
                
                return (
                  <div key={time} className="flex items-center p-6 bg-orange-50 rounded-lg border-2 border-orange-200">
                    <div className="w-20 font-bold text-orange-800 text-sm">{time}</div>
                    <div className="flex-1 text-center text-orange-800 font-bold text-sm">
                      LUNCH BREAK (12:50 - 1:40 PM)
                    </div>
                  </div>
                )
              }

              if (!classData) {
                return (
                  <div key={time} className="flex items-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-gray-500">
                    <div className="w-20 font-bold text-gray-700 text-sm">{time}</div>
                    <div className="flex-1 text-center font-medium text-sm">No Class</div>
                  </div>
                )
              }

              return (
                <div key={time} className="p-6 rounded-lg bg-blue-50 border-2 border-blue-200">
                  <div className="flex items-start">
                    <div className="font-bold text-gray-700 text-sm mr-6 flex-shrink-0">{time}</div>
                    <div className="flex-1">
                      <div className="font-bold text-sm text-blue-900 mb-2">{classData.course}</div>
                      <div className="font-semibold text-sm text-blue-900 mb-2">{classData.subject}</div>
                      <div className="text-xs text-blue-700 font-medium leading-tight mb-2">{classData.instructor}</div>
                      {/* Lab sessions have special styling */}
                      {classData.course.includes('LAB') && (
                        <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-bold">
                          LAB SESSION
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )

  const renderListView = () => (
    <div className="w-full">
      <table className="w-full text-gray-900">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th className="p-4 text-left font-bold text-gray-800 text-base">Day</th>
            <th className="p-4 text-left font-bold text-gray-800 text-base">Time</th>
            <th className="p-4 text-left font-bold text-gray-800 text-base">Course</th>
            <th className="p-4 text-left font-bold text-gray-800 text-base">Subject</th>
            <th className="p-4 text-left font-bold text-gray-800 text-base">Instructor</th>
          </tr>
        </thead>
        <tbody>
          {days.map((day, dayIndex) => {
            const dayEntries = timeSlots.map((time) => {
              const classData = getClassData(day, time)
              
              if (time === 'LUNCH') {
                // Show lunch break as null on Sunday and Monday (weekends)
                if (day === 'Sunday' || day === 'Monday') {
                  return (
                    <tr key={`${day}-${time}`} className="border-b border-gray-200">
                      <td className="p-4 font-bold text-gray-700 text-base">{day}</td>
                      <td className="p-4 text-gray-600 text-base">{time}</td>
                      <td className="p-4 text-gray-500 text-base" colSpan="3">
                        No Lunch Break (Weekend)
                      </td>
                    </tr>
                  )
                }
                
                return (
                  <tr key={`${day}-${time}`} className="border-b border-gray-200">
                    <td className="p-4 font-bold text-gray-700 text-base">{day}</td>
                    <td className="p-4 text-gray-600 text-base">{time}</td>
                    <td className="p-4 text-orange-800 font-bold text-base" colSpan="3">
                      LUNCH BREAK
                    </td>
                  </tr>
                )
              }

              if (!classData) {
                return (
                  <tr key={`${day}-${time}`} className="border-b border-gray-200">
                    <td className="p-4 font-bold text-gray-700 text-base">{day}</td>
                    <td className="p-4 text-gray-600 text-base">{time}</td>
                    <td className="p-4 text-gray-500 text-base" colSpan="3">
                      No Class
                    </td>
                  </tr>
                )
              }

              return (
                <tr key={`${day}-${time}`} className="border-b border-gray-200">
                  <td className="p-4 font-bold text-gray-700 text-base">{day}</td>
                  <td className="p-4 text-gray-600 text-base">{time}</td>
                  <td className="p-4 font-bold text-gray-900 text-base">{classData.course}</td>
                  <td className="p-4 font-semibold text-gray-900 text-base">{classData.subject}</td>
                  <td className="p-4 text-gray-600 text-base">{classData.instructor}</td>
                </tr>
              )
            })

            return (
              <React.Fragment key={day}>
                {dayEntries}
                {/* Add spacing row between days (except for the last day) */}
                {dayIndex < days.length - 1 && (
                  <tr className="h-6 bg-gray-50">
                    <td colSpan="5" className="border-b-2 border-gray-300"></td>
                  </tr>
                )}
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )

  const renderLegend = () => (
    <div className="mt-8 bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Timetable Legend</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Course Subjects */}
        <div>
          <h4 className="font-bold text-gray-800 mb-3">Course Subjects</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded mr-3"></div>
              <span className="text-sm text-gray-700"><span className="font-bold">ESC-501:</span> Software Engineering</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded mr-3"></div>
              <span className="text-sm text-gray-700"><span className="font-bold">PCC CS-501:</span> Compiler Design</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded mr-3"></div>
              <span className="text-sm text-gray-700"><span className="font-bold">PCC CS-502:</span> Operating Systems</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded mr-3"></div>
              <span className="text-sm text-gray-700"><span className="font-bold">PCC CS-503:</span> Object Oriented Programming</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded mr-3"></div>
              <span className="text-sm text-gray-700"><span className="font-bold">PEC IT-501B:</span> Artificial Intelligence</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded mr-3"></div>
              <span className="text-sm text-gray-700"><span className="font-bold">HSMC 501:</span> Introduction to Industrial Management</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded mr-3"></div>
              <span className="text-sm text-gray-700"><span className="font-bold">MC CS-501A:</span> Constitution of India</span>
            </div>
          </div>
        </div>

        {/* Lab Sessions */}
        <div>
          <h4 className="font-bold text-gray-800 mb-3">Lab Sessions</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-100 border border-green-200 rounded mr-3"></div>
              <span className="text-sm text-gray-700"><span className="font-bold">ESC 591:</span> Software Engineering Lab</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-100 border border-green-200 rounded mr-3"></div>
              <span className="text-sm text-gray-700"><span className="font-bold">PCC CS-593:</span> Operating Systems Lab</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-100 border border-green-200 rounded mr-3"></div>
              <span className="text-sm text-gray-700"><span className="font-bold">PCC CS-593:</span> Object Oriented Programming Lab</span>
            </div>
          </div>
        </div>

        {/* Special Sessions */}
        <div>
          <h4 className="font-bold text-gray-800 mb-3">Special Sessions</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-orange-50 border border-orange-200 rounded mr-3"></div>
              <span className="text-sm text-gray-700"><span className="font-bold">LUNCH BREAK:</span> 12:50 - 1:40 PM</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded mr-3"></div>
              <span className="text-sm text-gray-700"><span className="font-bold">FREE PERIOD:</span> No Class Scheduled</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded mr-3"></div>
              <span className="text-sm text-gray-700"><span className="font-bold">LIB:</span> Library</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded mr-3"></div>
              <span className="text-sm text-gray-700"><span className="font-bold">APTI:</span> Aptitude Training</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded mr-3"></div>
              <span className="text-sm text-gray-700"><span className="font-bold">GROOM:</span> Grooming Session</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Timetable</h1>
            <p className="text-gray-600 text-lg">
              5th Semester CSE B • LH-136 • Fall 2025
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3 p-4 rounded-xl bg-white border-2 border-gray-200">
              <Calendar className="w-6 h-6 text-primary-600" />
              <span className="text-lg font-bold text-gray-700">LH-136</span>
            </div>
            <div className="flex items-center space-x-3 p-4 rounded-xl bg-white border-2 border-gray-200">
              <Users className="w-6 h-6 text-primary-600" />
              <span className="text-lg font-bold text-gray-700">65 Students</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setView('weekly')}
                className={`px-6 py-3 rounded-xl transition-all duration-200 font-bold text-lg ${
                  view === 'weekly'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setView('daily')}
                className={`px-6 py-3 rounded-xl transition-all duration-200 font-bold text-lg ${
                  view === 'daily'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setView('list')}
                className={`px-6 py-3 rounded-xl transition-all duration-200 font-bold text-lg ${
                  view === 'list'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                List
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showWeekends}
                onChange={(e) => setShowWeekends(e.target.checked)}
                className="mr-3 w-5 h-5"
              />
              <span className="text-lg font-bold text-gray-700">Show Weekends (Sun-Mon)</span>
            </label>
          </div>
        </div>
      </div>

      {/* Timetable Content */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6">
        <div className={`${showWeekends ? 'overflow-x-auto' : ''}`}>
          {view === 'weekly' && renderWeeklyView()}
          {view === 'daily' && renderDailyView()}
          {view === 'list' && renderListView()}
        </div>
      </div>

      {/* Legend */}
      {renderLegend()}
    </div>
  )
}

export default Timetable