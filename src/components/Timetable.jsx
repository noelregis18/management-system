/**
 * Timetable Component
 * 
 * This component displays the weekly timetable in a clean, organized format.
 * It shows class schedules with proper time slots and room information.
 * 
 * Key features:
 * - Weekly timetable view with customizable display options
 * - Weekend toggle functionality
 * - Real-time class data display
 * - Professional grid layout
 * - Responsive design for different screen sizes
 */

// Import React and useState hook for state management
import React, { useState, useEffect, useRef } from 'react'
// Import Lucide React icons for UI elements
import { Calendar, Clock, MapPin, Users, Settings, Eye, EyeOff, Edit } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import { loadUserTimetable, upsertUserTimetable } from '../services/timetableService'

/**
 * Timetable Component
 * 
 * This component provides a comprehensive timetable display system:
 * - Shows weekly class schedules
 * - Allows weekend visibility toggle
 * - Displays class details including instructors and subjects
 * - Provides professional grid layout
 */
const Timetable = () => {
  const { user, isSignedIn } = useUser()
  // State management for view preferences
  const [view, setView] = useState('weekly')           // Current view mode
  const [showWeekends, setShowWeekends] = useState(false) // Weekend visibility toggle
  const [section, setSection] = useState('CSE B')      // Selected section: CSE A | CSE B | CSE C

  // Timetable data for 5th Semester CSE A
  const timetableDataA = {
    'Monday': {
      '09:30-10:20': null,
      '10:20-11:10': null,
      '11:10-12:00': null,
      '12:00-12:50': null,
      'LUNCH': { subject: 'Lunch Break', room: '', instructor: '' },
      '13:40-14:30': { course: 'PCC CS-592 (LAB 13&14)', instructor: 'RKM(CS)+AS(CS)+SP(CS)+AD(CS)', subject: 'Operating Systems Lab' },
      '14:30-15:20': { course: 'PCC CS-592 (LAB 3&4)', instructor: 'RKM(CS)+AS(CS)+SP(CS)+AD(CS)', subject: 'Operating Systems Lab' },
      '15:20-16:10': { course: 'PCC CS-592 (LAB 3&4)', instructor: 'RKM(CS)+AS(CS)+SP(CS)+AD(CS)', subject: 'Operating Systems Lab' },
      '16:10-17:00': { course: 'PCC CS-592 (LAB 3&4)', instructor: 'RKM(CS)+AS(CS)+SP(CS)+AD(CS)', subject: 'Operating Systems Lab' }
    },
    'Tuesday': {
      '09:30-10:20': { course: 'PCC CS-501', instructor: 'J(CS)', subject: 'Compiler Design' },
      '10:20-11:10': { course: 'ESC-501', instructor: 'BR(CS)', subject: 'Software Engineering' },
      '11:10-12:00': { course: 'PCC CS-502', instructor: 'RKM(CS)', subject: 'Operating Systems' },
      '12:00-12:50': { course: 'MC CS-501A', instructor: 'TB(E)', subject: 'Constitution of India' },
      'LUNCH': { subject: 'Lunch Break', room: '', instructor: '' },
      '13:40-14:30': { course: 'PCC CS-503', instructor: 'SKHC(CS)', subject: 'Object Oriented Programming' },
      '14:30-15:20': { course: 'PCC CS-592 (LAB 3&4)', instructor: 'RKM(CS)+AS(CS)+SP(CS)+AD(CS)', subject: 'Operating Systems Lab' },
      '15:20-16:10': { course: 'PCC CS-592 (LAB 3&4)', instructor: 'RKM(CS)+AS(CS)+SP(CS)+AD(CS)', subject: 'Operating Systems Lab' },
      '16:10-17:00': { course: 'PCC CS-592 (LAB 3&4)', instructor: 'RKM(CS)+AS(CS)+SP(CS)+AD(CS)', subject: 'Operating Systems Lab' }
    },
    'Wednesday': {
      '09:30-10:20': { course: 'PEC IT-501B', instructor: 'PC(CS)', subject: 'Artificial Intelligence' },
      '10:20-11:10': { course: 'ESC-501', instructor: 'BR(CS)', subject: 'Software Engineering' },
      '11:10-12:00': { course: 'PCC CS-502', instructor: 'RKM(CS)', subject: 'Operating Systems' },
      '12:00-12:50': { course: 'PCC CS-501', instructor: 'J(CS)', subject: 'Compiler Design' },
      'LUNCH': { subject: 'Lunch Break', room: '', instructor: '' },
      '13:40-14:30': { course: 'LIB', instructor: '', subject: 'Library' },
      '14:30-15:20': { course: 'HSMC 501', instructor: 'NF', subject: 'Introduction to Industrial Management' },
      '15:20-16:10': { course: 'MC CS-501A', instructor: 'TB(E)', subject: 'Constitution of India' },
      '16:10-17:00': { course: 'GROOM', instructor: 'BR(CS)', subject: 'Grooming Session' }
    },
    'Thursday': {
      '09:30-10:20': { course: 'PCC CS-501', instructor: 'J(CS)', subject: 'Compiler Design' },
      '10:20-11:10': { course: 'PCC CS-503', instructor: 'SKHC(CS)', subject: 'Object Oriented Programming' },
      '11:10-12:00': { course: 'ESC-501', instructor: 'BR(CS)', subject: 'Software Engineering' },
      '12:00-12:50': { course: 'PEC IT-501B', instructor: 'PC(CS)', subject: 'Artificial Intelligence' },
      'LUNCH': { subject: 'Lunch Break', room: '', instructor: '' },
      '13:40-14:30': { course: 'LIB', instructor: '', subject: 'Library' },
      '14:30-15:20': { course: 'PCC CS-593 (LAB 7&8)', instructor: 'SKHC(CS)+AS(CS)+PC(CS)+AD(CS)', subject: 'Object Oriented Programming Lab' },
      '15:20-16:10': { course: 'PCC CS-593 (LAB 7&8)', instructor: 'SKHC(CS)+AS(CS)+PC(CS)+AD(CS)', subject: 'Object Oriented Programming Lab' },
      '16:10-17:00': { course: 'PCC CS-593 (LAB 7&8)', instructor: 'SKHC(CS)+AS(CS)+PC(CS)+AD(CS)', subject: 'Object Oriented Programming Lab' }
    },
    'Friday': {
      '09:30-10:20': { course: 'ESC-501', instructor: 'BR(CS)', subject: 'Software Engineering' },
      '10:20-11:10': { course: 'PCC CS-502', instructor: 'RKM(CS)', subject: 'Operating Systems' },
      '11:10-12:00': { course: 'PEC IT-501B', instructor: 'PC(CS)', subject: 'Artificial Intelligence' },
      '12:00-12:50': { course: 'PCC CS-503', instructor: 'SKHC(CS)', subject: 'Object Oriented Programming' },
      'LUNCH': { subject: 'Lunch Break', room: '', instructor: '' },
      '13:40-14:30': { course: 'LIB', instructor: '', subject: 'Library' },
      '14:30-15:20': { course: 'ESC 591 (LAB 3&4)', instructor: 'BR(CS)+PR(CS)+LKM(CS)', subject: 'Software Engineering Lab' },
      '15:20-16:10': { course: 'ESC 591 (LAB 3&4)', instructor: 'BR(CS)+PR(CS)+LKM(CS)', subject: 'Software Engineering Lab' },
      '16:10-17:00': { course: 'ESC 591 (LAB 3&4)', instructor: 'BR(CS)+PR(CS)+LKM(CS)', subject: 'Software Engineering Lab' }
    },
    'Saturday': {
      '09:30-10:20': { course: 'PCC CS-502', instructor: 'RKM(CS)', subject: 'Operating Systems' },
      '10:20-11:10': { course: 'PCC CS-503', instructor: 'SKHC(CS)', subject: 'Object Oriented Programming' },
      '11:10-12:00': { course: 'PEC IT-501B', instructor: 'PC(CS)', subject: 'Artificial Intelligence' },
      '12:00-12:50': { course: 'PCC CS-501', instructor: 'J(CS)', subject: 'Compiler Design' },
      'LUNCH': { subject: 'Lunch Break', room: '', instructor: '' },
      '13:40-14:30': { course: 'LIB', instructor: '', subject: 'Library' },
      '14:30-15:20': { course: 'HSMC 501', instructor: 'NF', subject: 'Introduction to Industrial Management' },
      '15:20-16:10': { course: 'HSMC 501', instructor: 'NF', subject: 'Introduction to Industrial Management' },
      '16:10-17:00': { course: 'APTI', instructor: 'BR(CS)', subject: 'Aptitude Training' }
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

  // Sample timetable data for 5th Semester CSE B
  // Contains detailed schedule for each day and time slot
  const timetableDataB = {
    // Monday - No classes (weekend)
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
    // Tuesday - Regular class schedule
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
    // Wednesday - Regular class schedule with lab sessions
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
    // Thursday - Regular class schedule with library and lab sessions
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
    // Friday - Regular class schedule with aptitude training
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
    // Saturday - Regular class schedule with lab sessions
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
    // Sunday - No classes (weekend)
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

  // Timetable data for 5th Semester CSE C
  const timetableDataC = {
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
      '09:30-10:20': { course: 'PCC CS-503', instructor: 'PR(CS)', subject: 'Object Oriented Programming' },
      '10:20-11:10': { course: 'ESC-501', instructor: 'SK(CS)', subject: 'Software Engineering' },
      '11:10-12:00': { course: 'PEC IT-501B', instructor: 'SKM(CS)', subject: 'Artificial Intelligence' },
      '12:00-12:50': { course: 'PCC CS-501', instructor: 'AS(CS)', subject: 'Compiler Design' },
      'LUNCH': { subject: 'Lunch Break', room: '', instructor: '' },
      '13:40-14:30': { course: 'LIB', instructor: '', subject: 'Library' },
      '14:30-15:20': { course: 'HSMC 501', instructor: 'NF', subject: 'Introduction to Industrial Management' },
      '15:20-16:10': { course: 'GROOM', instructor: 'BTM(CS)', subject: 'Grooming Session' },
      '16:10-17:00': { course: 'APTI', instructor: 'SG(CS)', subject: 'Aptitude Training' }
    },
    'Wednesday': {
      '09:30-10:20': { course: 'PEC IT-501B', instructor: 'SKM(CS)', subject: 'Artificial Intelligence' },
      '10:20-11:10': { course: 'ESC-501', instructor: 'SK(CS)', subject: 'Software Engineering' },
      '11:10-12:00': { course: 'PCC CS-501', instructor: 'AS(CS)', subject: 'Compiler Design' },
      '12:00-12:50': { course: 'PCC CS-503', instructor: 'PR(CS)', subject: 'Object Oriented Programming' },
      'LUNCH': { subject: 'Lunch Break', room: '', instructor: '' },
      '13:40-14:30': { course: 'LIB', instructor: '', subject: 'Library' },
      '14:30-15:20': { course: 'PCC CS-593 (LAB 7&8)', instructor: 'PR(CS)+RKM(CS)+PKC(CS)+SP(CS)', subject: 'Operating Systems Lab' },
      '15:20-16:10': { course: 'PCC CS-593 (LAB 7&8)', instructor: 'PR(CS)+RKM(CS)+PKC(CS)+SP(CS)', subject: 'Operating Systems Lab' },
      '16:10-17:00': { course: 'PCC CS-593 (LAB 7&8)', instructor: 'PR(CS)+RKM(CS)+PKC(CS)+SP(CS)', subject: 'Operating Systems Lab' }
    },
    'Thursday': {
      '09:30-10:20': { course: 'PCC CS-501', instructor: 'AS(CS)', subject: 'Compiler Design' },
      '10:20-11:10': { course: 'PCC CS-503', instructor: 'PR(CS)', subject: 'Object Oriented Programming' },
      '11:10-12:00': { course: 'PEC IT-501B', instructor: 'SKM(CS)', subject: 'Artificial Intelligence' },
      '12:00-12:50': { course: 'ESC-501', instructor: 'SK(CS)', subject: 'Software Engineering' },
      'LUNCH': { subject: 'Lunch Break', room: '', instructor: '' },
      '13:40-14:30': { course: 'MC CS-501A', instructor: 'TB(E)', subject: 'Constitution of India' },
      '14:30-15:20': { course: 'ESC 591 (LAB 3&4)', instructor: 'BR(CS)+SAR(CS)+LKM(CS)+SP(CS)', subject: 'Software Engineering Lab' },
      '15:20-16:10': { course: 'ESC 591 (LAB 3&4)', instructor: 'BR(CS)+SAR(CS)+LKM(CS)+SP(CS)', subject: 'Software Engineering Lab' },
      '16:10-17:00': { course: 'ESC 591 (LAB 3&4)', instructor: 'BR(CS)+SAR(CS)+LKM(CS)+SP(CS)', subject: 'Software Engineering Lab' }
    },
    'Friday': {
      '09:30-10:20': { course: 'PCC CS-503', instructor: 'PR(CS)', subject: 'Object Oriented Programming' },
      '10:20-11:10': { course: 'PCC CS-501', instructor: 'AS(CS)', subject: 'Compiler Design' },
      '11:10-12:00': { course: 'PCC CS-502', instructor: 'AC(CS)', subject: 'Operating Systems' },
      '12:00-12:50': { course: 'PCC CS-502', instructor: 'AC(CS)', subject: 'Operating Systems' },
      'LUNCH': { subject: 'Lunch Break', room: '', instructor: '' },
      '13:40-14:30': { course: 'LIB', instructor: '', subject: 'Library' },
      '14:30-15:20': { course: 'HSMC 501', instructor: 'NF', subject: 'Introduction to Industrial Management' },
      '15:20-16:10': { course: 'HSMC 501', instructor: 'NF', subject: 'Introduction to Industrial Management' },
      '16:10-17:00': { course: 'MC CS-501A', instructor: 'TB(E)', subject: 'Constitution of India' }
    },
    'Saturday': {
      '09:30-10:20': { course: 'PCC CS-502', instructor: 'AC(CS)', subject: 'Operating Systems' },
      '10:20-11:10': { course: 'PCC CS-502', instructor: 'AC(CS)', subject: 'Operating Systems' },
      '11:10-12:00': { course: 'ESC-501', instructor: 'SK(CS)', subject: 'Software Engineering' },
      '12:00-12:50': { course: 'PEC IT-501B', instructor: 'SKM(CS)', subject: 'Artificial Intelligence' },
      'LUNCH': { subject: 'Lunch Break', room: '', instructor: '' },
      '13:40-14:30': { course: 'LIB', instructor: '', subject: 'Library' },
      '14:30-15:20': { course: 'PCC CS-592 (LAB 3&4)', instructor: 'AC(CS)+BM(CS)+AM(CS)', subject: 'Operating Systems Lab' },
      '15:20-16:10': { course: 'PCC CS-592 (LAB 3&4)', instructor: 'AC(CS)+BM(CS)+AM(CS)', subject: 'Operating Systems Lab' },
      '16:10-17:00': { course: 'PCC CS-592 (LAB 3&4)', instructor: 'AC(CS)+BM(CS)+AM(CS)', subject: 'Operating Systems Lab' }
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

  // Initialize editable timetables state per section
  const initialTimetables = {
    'CSE A': timetableDataA,
    'CSE B': timetableDataB,
    'CSE C': timetableDataC
  }
  const [timetables, setTimetables] = useState(initialTimetables)
  const hasLoadedFromRemoteRef = useRef(false)
  const saveTimeoutRef = useRef(null)

  // Load per-user timetable on mount / user change
  useEffect(() => {
    async function fetchRemote() {
      if (!isSignedIn || !user?.id) return
      try {
        const record = await loadUserTimetable(user.id)
        if (record?.data && typeof record.data === 'object') {
          setTimetables(record.data)
          if (record.section) setSection(record.section)
        }
        hasLoadedFromRemoteRef.current = true
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to load timetable', err)
      }
    }
    fetchRemote()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, user?.id])

  // Debounced autosave when timetables or section change
  useEffect(() => {
    if (!isSignedIn || !user?.id) return
    if (!hasLoadedFromRemoteRef.current) return
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    saveTimeoutRef.current = setTimeout(() => {
      upsertUserTimetable(user.id, { section, data: timetables }).catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Failed to save timetable', err)
      })
    }, 600)
    return () => saveTimeoutRef.current && clearTimeout(saveTimeoutRef.current)
  }, [timetables, section, isSignedIn, user?.id])

  // Active timetable based on selected section
  const timetableData = timetables[section]

  // Time slots for the daily schedule
  const timeSlots = ['09:30-10:20', '10:20-11:10', '11:10-12:00', '12:00-12:50', 'LUNCH', '13:40-14:30', '14:30-15:20', '15:20-16:10', '16:10-17:00']
  
  // Days array - shows weekends based on toggle state
  // Fixed weekend logic: Tuesday-Saturday are class days, Sunday-Monday are weekends
  const days = showWeekends ? ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] : ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  /**
   * Get class data for a specific day and time slot
   * 
   * @param {string} day - The day of the week
   * @param {string} time - The time slot
   * @returns {Object|null} - Class data or null if no class
   */
  const getClassData = (day, time) => {
    return timetableData[day]?.[time] || null
  }

  // Editing state
  const [isEditingPeriod, setIsEditingPeriod] = useState(false)
  const [editingContext, setEditingContext] = useState({ day: '', time: '', course: '', subject: '', instructor: '' })

  const openEditPeriod = (day, time) => {
    if (time === 'LUNCH') return
    const existing = getClassData(day, time)
    setEditingContext({
      day,
      time,
      course: existing?.course || '',
      subject: existing?.subject || '',
      instructor: existing?.instructor || ''
    })
    setIsEditingPeriod(true)
  }

  const cancelEditPeriod = () => {
    setIsEditingPeriod(false)
    setEditingContext({ day: '', time: '', course: '', subject: '', instructor: '' })
  }

  const saveEditPeriod = () => {
    const { day, time, course, subject, instructor } = editingContext
    setTimetables(prev => {
      const sectionData = prev[section] || {}
      const dayData = { ...(sectionData[day] || {}) }
      dayData[time] = { course, subject, instructor }
      return {
        ...prev,
        [section]: {
          ...sectionData,
          [day]: dayData
        }
      }
    })
    setIsEditingPeriod(false)
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
                      <div className="h-52 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 p-4">
                        <span className="text-base text-gray-600 font-semibold text-center leading-tight mb-3">No Class</span>
                        <button onClick={() => openEditPeriod(day, time)} className="text-xs px-3 py-1 rounded-md bg-primary-600 text-white hover:bg-primary-700">Edit</button>
                      </div>
                    </td>
                  )
                }

                return (
                  <td key={day} className={`p-3 border border-gray-200 ${
                    (day === 'Sunday' || day === 'Monday') ? 'bg-gray-100' : ''
                  }`}>
                    <div className="h-52 p-4 rounded-lg bg-blue-50 border border-blue-200 flex flex-col justify-between relative">
                      <button
                        onClick={() => openEditPeriod(day, time)}
                        className="absolute top-2 right-2 p-1.5 rounded-md bg-white/80 hover:bg-white border border-blue-200"
                        aria-label={`Edit ${day} ${time}`}
                      >
                        <Edit className="w-4 h-4 text-blue-700" />
                      </button>
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
                    <button onClick={() => openEditPeriod(day, time)} className="ml-4 text-xs px-3 py-1 rounded-md bg-primary-600 text-white hover:bg-primary-700">Edit</button>
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
                      <button onClick={() => openEditPeriod(day, time)} className="mt-2 text-xs px-3 py-1 rounded-md bg-white border border-blue-200 text-blue-700 hover:bg-blue-50">Edit</button>
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

  // Room mapping per section
  const sectionRoom = {
    'CSE A': 'LH-124',
    'CSE B': 'LH-136',
    'CSE C': 'LH-132'
  }

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Timetable</h1>
            <p className="text-gray-600 text-lg">
              {`5th Semester ${section} • ${sectionRoom[section]} • Fall 2025`}
            </p>
          </div>
          <div className="flex flex-col items-end space-y-3">
            <div>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 font-bold text-gray-700 bg-white"
                aria-label="Select Section"
              >
                <option value="CSE A">CSE A</option>
                <option value="CSE B">CSE B</option>
                <option value="CSE C">CSE C</option>
              </select>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3 p-4 rounded-xl bg-white border-2 border-gray-200">
                <Calendar className="w-6 h-6 text-primary-600" />
                <span className="text-lg font-bold text-gray-700">{sectionRoom[section]}</span>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-xl bg-white border-2 border-gray-200">
                <Users className="w-6 h-6 text-primary-600" />
                <span className="text-lg font-bold text-gray-700">65 Students</span>
              </div>
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

      {/* Edit Period Modal */}
      {isEditingPeriod && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Period</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                  <input type="text" value={editingContext.day} readOnly className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input type="text" value={editingContext.time} readOnly className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                <input
                  type="text"
                  value={editingContext.course}
                  onChange={(e) => setEditingContext({ ...editingContext, course: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={editingContext.subject}
                  onChange={(e) => setEditingContext({ ...editingContext, subject: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                <input
                  type="text"
                  value={editingContext.instructor}
                  onChange={(e) => setEditingContext({ ...editingContext, instructor: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={cancelEditPeriod} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={saveEditPeriod} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      {renderLegend()}
    </div>
  )
}

export default Timetable