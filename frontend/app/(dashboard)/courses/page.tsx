'use client'
import React, { useState } from 'react'
import { CoursesHeader } from '@/components/courses/CoursesHeader'
import { CoursesFilters } from '@/components/courses/CoursesFilters'
import { CourseCard } from '@/components/courses/CourseCard'
import { AddCourseModal } from '@/components/courses/AddCourseModal'
import { Course } from '@/types/course'

// Sample courses data
const coursesData: Course[] = [
  {
    id: 1,
    name: "Web Development Fundamentals",
    description: "Learn the basics of web development including HTML, CSS, and JavaScript.",
    duration: "12 weeks",
    status: "Active",
    instructor: "John Doe",
    startDate: "2024-03-15",
    maxStudents: "30",
    enrolledStudents: 25,
    progress: 65
  },
  {
    id: 2,
    name: "Data Science Essentials",
    description: "Introduction to data analysis, visualization, and machine learning concepts.",
    duration: "16 weeks",
    status: "Upcoming",
    instructor: "Jane Smith",
    startDate: "2024-04-01",
    maxStudents: "25",
    enrolledStudents: 20,
    progress: 0
  },
  // Add more sample data as needed
];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter courses
  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !statusFilter || course.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAddCourse = (courseData: Omit<Course, 'id' | 'progress' | 'enrolledStudents'>) => {
    // Implement add course functionality
    console.log('Adding new course:', courseData)
  }

  const handleEditCourse = (course: Course) => {
    // Implement edit course functionality
    console.log('Editing course:', course)
  }

  const handleDeleteCourse = (courseId: number) => {
    // Implement delete course functionality
    console.log('Deleting course:', courseId)
  }

  return (
    <div className="p-8">
      <CoursesHeader onAddCourse={() => setIsModalOpen(true)} />
      
      <CoursesFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={setSearchTerm}
        onStatusChange={setStatusFilter}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onEdit={() => handleEditCourse(course)}
            onDelete={() => handleDeleteCourse(course.id)}
          />
        ))}
      </div>

      <AddCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCourse}
      />
    </div>
  )
} 