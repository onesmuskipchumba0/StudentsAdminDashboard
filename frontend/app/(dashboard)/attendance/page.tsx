'use client'
import React, { useState, useEffect } from 'react'
import { AttendanceHeader } from '@/components/attendance/AttendanceHeader'
import { AttendanceFilters } from '@/components/attendance/AttendanceFilters'
import { AttendanceTable } from '@/components/attendance/AttendanceTable'
import { Pagination } from '@/components/students/Pagination'
import { Attendance } from '@/types/attendance'

// Sample attendance data

export default function AttendancePage() {
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [courseFilter, setCourseFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const fetchAttendanceData = async () => {
    const response = await fetch('http://localhost:5000/api/students')
    const data = await response.json()
    setAttendanceData(data)
  }
  useEffect(() => {
    fetchAttendanceData()
  }, [])
  // Filter attendance records
  const filteredRecords = attendanceData.filter(record => {
    const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = !courseFilter || record.course === courseFilter
    const matchesDate = !dateFilter || new Date(record.enrollmentDate).toISOString().split('T')[0] === dateFilter
    return matchesSearch && matchesCourse && matchesDate
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage)
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleStatusChange = (studentId: number, status: 'present' | 'absent' | 'late') => {
    // Implement status change functionality
    console.log(`Changing status for student ${studentId} to ${status}`)
  }

  return (
    <div className="p-8">
      <AttendanceHeader />
      
      <AttendanceFilters
        searchTerm={searchTerm}
        courseFilter={courseFilter}
        dateFilter={dateFilter}
        onSearchChange={setSearchTerm}
        onCourseChange={setCourseFilter}
        onDateChange={setDateFilter}
      />

      <AttendanceTable
        attendanceData={paginatedRecords}
        onStatusChange={handleStatusChange}
      />

      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredRecords.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
} 