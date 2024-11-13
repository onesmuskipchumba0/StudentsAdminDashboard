'use client'
import React, { useState } from 'react'
import { StudentHeader } from '@/components/students/StudentHeader'
import { StudentFilters } from '@/components/students/StudentFilters'
import { StudentTable } from '@/components/students/StudentTable'
import { Student } from '@/types/student'
import { Pagination } from '@/components/students/Pagination'

// Sample student data
const studentsData: Student[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    course: "Web Development",
    enrollmentDate: "2024-01-15",
    status: "Active"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com", 
    course: "Data Science",
    enrollmentDate: "2024-02-01",
    status: "Active"
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael.j@example.com",
    course: "Mobile Development",
    enrollmentDate: "2024-01-20",
    status: "Inactive"
  },
  {
    id: 4, 
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    course: "UI/UX Design",
    enrollmentDate: "2024-02-15",
    status: "Active"
  },
  {
    id: 5,
    name: "James Brown",
    email: "james.b@example.com",
    course: "Cloud Computing",
    enrollmentDate: "2024-01-10",
    status: "Suspended"
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily.d@example.com",
    course: "Cybersecurity",
    enrollmentDate: "2024-02-05",
    status: "Active"
  },
  {
    id: 7,
    name: "Robert Wilson",
    email: "robert.w@example.com",
    course: "Data Science",
    enrollmentDate: "2024-01-25",
    status: "Inactive"
  },
  {
    id: 8,
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    course: "Web Development",
    enrollmentDate: "2024-02-10",
    status: "Active"
  },
  {
    id: 9,
    name: "David Taylor",
    email: "david.t@example.com",
    course: "Mobile Development",
    enrollmentDate: "2024-01-15",
    status: "Active"
  },
  {
    id: 10,
    name: "Jennifer Martin",
    email: "jennifer.m@example.com",
    course: "UI/UX Design",
    enrollmentDate: "2024-02-20",
    status: "Suspended"
  },
  // Add more sample data
];

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter students based on search term and status
  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || student.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage)

  const handleAddStudent = () => {
    // Implement add student functionality
    console.log('Add student clicked')
  }

  const handleEditStudent = (student: Student) => {
    // Implement edit student functionality
    console.log('Edit student:', student)
  }

  const handleDeleteStudent = (student: Student) => {
    // Implement delete student functionality
    console.log('Delete student:', student)
  }

  return (
    <div className="p-8">
      <StudentHeader onAddClick={handleAddStudent} />
      
      <StudentFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={setSearchTerm}
        onStatusChange={setStatusFilter}
      />

      <StudentTable
        students={paginatedStudents}
        onEdit={handleEditStudent}
        onDelete={handleDeleteStudent}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredStudents.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  )
} 