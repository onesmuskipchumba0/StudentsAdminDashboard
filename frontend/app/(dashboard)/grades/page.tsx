'use client'
import React, { useState } from 'react'
import { GradesHeader } from '@/components/grades/GradesHeader'
import { GradesFilters } from '@/components/grades/GradesFilters'
import { GradesTable } from '@/components/grades/GradesTable'
import { AddGradeModal } from '@/components/grades/AddGradeModal'
import { Pagination } from '@/components/students/Pagination'
import { Grade } from '@/types/grade'

// Sample grades data
const gradesData: Grade[] = [
  {
    id: 1,
    studentId: "101",
    studentName: "John Doe",
    course: "Web Development",
    assignment: "Final Project",
    grade: "A",
    submissionDate: "2024-03-15"
  },
  {
    id: 2,
    studentId: "102",
    studentName: "Jane Smith",
    course: "Data Science",
    assignment: "Midterm Exam",
    grade: "B",
    submissionDate: "2024-03-10"
  },
  // Add more sample data as needed
];

export default function GradesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [courseFilter, setCourseFilter] = useState('')
  const [gradeFilter, setGradeFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const itemsPerPage = 10

  // Filter grades
  const filteredGrades = gradesData.filter(grade => {
    const matchesSearch = grade.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = !courseFilter || grade.course === courseFilter
    const matchesGrade = !gradeFilter || grade.grade === gradeFilter
    return matchesSearch && matchesCourse && matchesGrade
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredGrades.length / itemsPerPage)
  const paginatedGrades = filteredGrades.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleAddGrade = (gradeData: Omit<Grade, 'id'>) => {
    // Implement add grade functionality
    console.log('Adding new grade:', gradeData)
  }

  const handleEditGrade = (grade: Grade) => {
    // Implement edit grade functionality
    console.log('Editing grade:', grade)
  }

  const handleDeleteGrade = (gradeId: number) => {
    // Implement delete grade functionality
    console.log('Deleting grade:', gradeId)
  }

  return (
    <div className="p-8">
      <GradesHeader onAddGrade={() => setIsModalOpen(true)} />
      
      <GradesFilters
        searchTerm={searchTerm}
        courseFilter={courseFilter}
        gradeFilter={gradeFilter}
        onSearchChange={setSearchTerm}
        onCourseChange={setCourseFilter}
        onGradeChange={setGradeFilter}
      />

      <GradesTable
        gradesData={paginatedGrades}
        onEdit={handleEditGrade}
        onDelete={handleDeleteGrade}
      />

      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredGrades.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      <AddGradeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddGrade}
      />
    </div>
  )
} 