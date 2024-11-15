'use client'
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast'; // Add this import
import { CourseCard } from '@/components/courses/CourseCard';
import { CoursesHeader } from '@/components/courses/CoursesHeader';
import { CoursesFilters } from '@/components/courses/CoursesFilters';
import { AddCourseModal } from '@/components/courses/AddCourseModal';
import { EditCourseModal } from '@/components/courses/EditCourseModal';
import { Course } from '@/types/course';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch courses
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/courses${statusFilter ? `?status=${statusFilter}` : ''}`);
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      toast.error('Failed to fetch courses');
      setError(err instanceof Error ? err.message : 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [statusFilter]);

  // Add new course
  const handleAddCourse = async (courseData: Omit<Course, '_id' | 'progress' | 'enrolledStudents'>) => {
    try {
      const response = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) throw new Error('Failed to create course');
      
      toast.success('Course created successfully');
      fetchCourses();
    } catch (err) {
      toast.error('Failed to create course');
      setError(err instanceof Error ? err.message : 'Failed to create course');
    }
  };

  // Update course progress
  const handleUpdateProgress = async (courseId: string, progress: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}/progress`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ progress }),
      });

      if (!response.ok) throw new Error('Failed to update progress');
      
      toast.success('Progress updated successfully');
      fetchCourses();
    } catch (err) {
      toast.error('Failed to update progress');
    }
  };

  // Enroll student
  const handleEnrollStudent = async (courseId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}/enroll`, {
        method: 'PATCH',
      });

      if (!response.ok) throw new Error('Failed to enroll student');
      
      toast.success('Student enrolled successfully');
      fetchCourses();
    } catch (err) {
      toast.error('Failed to enroll student');
    }
  };

  // Delete course
  const handleDeleteCourse = async (courseId: string) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete course');
      
      toast.success('Course deleted successfully');
      fetchCourses();
    } catch (err) {
      toast.error('Failed to delete course');
    }
  };

  // Edit course
  const handleEditCourse = async (courseData: Course) => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${courseData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) throw new Error('Failed to update course');
      
      toast.success('Course updated successfully');
      setIsEditModalOpen(false);
      fetchCourses();
    } catch (err) {
      toast.error('Failed to update course');
    }
  };

  // Filter courses based on search term
  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="flex justify-center items-center h-96">Loading...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="p-6">
      <CoursesHeader onAddCourse={() => setIsAddModalOpen(true)} />
      
      <CoursesFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={setSearchTerm}
        onStatusChange={setStatusFilter}
      />

      {filteredCourses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No courses found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onEdit={(course) => {
                setSelectedCourse(course);
                setIsEditModalOpen(true);
              }}
              onDelete={handleDeleteCourse}
              onUpdateProgress={handleUpdateProgress}
              onEnrollStudent={handleEnrollStudent}
            />
          ))}
        </div>
      )}

      <AddCourseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddCourse}
      />

      {selectedCourse && (
        <EditCourseModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedCourse(null);
          }}
          onSubmit={handleEditCourse}
          course={selectedCourse}
        />
      )}
    </div>
  );
}