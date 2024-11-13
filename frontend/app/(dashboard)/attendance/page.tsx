'use client'
import React, { useState } from 'react'
import { AttendanceHeader } from '@/components/attendance/AttendanceHeader'
import { AttendanceFilters } from '@/components/attendance/AttendanceFilters'
import { AttendanceTable } from '@/components/attendance/AttendanceTable'
import { Pagination } from '@/components/students/Pagination'
import { Attendance } from '@/types/attendance'

// Sample attendance data
const attendanceData: Attendance[] = [
  {
    id: 1,
    studentId: 101,
    studentName: "John Doe",
    course: "Web Development",
    date: "2024-03-15",
    status: "present"
  },
  {
    id: 2,
    studentId: 102,
    studentName: "Jane Smith",
    course: "Data Science", 
    date: "2024-03-15",
    status: "absent"
  },
  {
    id: 3,
    studentId: 103,
    studentName: "Mike Johnson",
    course: "Mobile Development",
    date: "2024-03-15", 
    status: "present"
  },
  {
    id: 4,
    studentId: 104,
    studentName: "Sarah Williams",
    course: "UI/UX Design",
    date: "2024-03-15",
    status: "late"
  },
  {
    id: 5,
    studentId: 105,
    studentName: "James Brown",
    course: "Web Development",
    date: "2024-03-15",
    status: "present"
  },
  {
    id: 6,
    studentId: 106,
    studentName: "Emily Davis",
    course: "Data Science",
    date: "2024-03-15",
    status: "absent"
  },
  {
    id: 7,
    studentId: 107,
    studentName: "David Miller",
    course: "Mobile Development",
    date: "2024-03-15",
    status: "present"
  },
  {
    id: 8,
    studentId: 108,
    studentName: "Lisa Anderson",
    course: "UI/UX Design",
    date: "2024-03-15",
    status: "late"
  },
  {
    id: 9,
    studentId: 109,
    studentName: "Robert Wilson",
    course: "Web Development",
    date: "2024-03-15",
    status: "present"
  },
  {
    id: 10,
    studentId: 110,
    studentName: "Jennifer Taylor",
    course: "Data Science",
    date: "2024-03-15",
    status: "absent"
  },
  {
    id: 11,
    studentId: 111,
    studentName: "Michael Thomas",
    course: "Mobile Development",
    date: "2024-03-15",
    status: "present"
  },
  // Add more sample data as needed
];

export default function AttendancePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [courseFilter, setCourseFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter attendance records
  const filteredRecords = attendanceData.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = !courseFilter || record.course === courseFilter
    const matchesDate = !dateFilter || record.date === dateFilter
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