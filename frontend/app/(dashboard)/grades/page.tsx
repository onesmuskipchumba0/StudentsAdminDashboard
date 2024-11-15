'use client'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { GradesHeader } from '@/components/grades/GradesHeader'
import { GradesFilters } from '@/components/grades/GradesFilters'
import { GradesTable } from '@/components/grades/GradesTable'
import { AddGradeModal } from '@/components/grades/AddGradeModal'
import { Pagination } from '@/components/students/Pagination'
import { GradeDistribution } from '@/components/reports/grade-distribution'
import { gradesApi } from '@/lib/api-grades'
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
  const [grades, setGrades] = useState<Grade[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  const fetchGrades = async () => {
    try {
      setLoading(true);
      const filters: any = {};
      if (courseFilter) filters.course = courseFilter;
      if (gradeFilter) filters.grade = gradeFilter;

      const [gradesData, statsData] = await Promise.all([
        gradesApi.getGrades(filters),
        gradesApi.getGradeStats()
      ]);

      setGrades(gradesData);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching grades:', error);
      toast.error('Failed to fetch grades');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, [courseFilter, gradeFilter]);

  const handleAddGrade = async (gradeData: Omit<Grade, 'id'>) => {
    try {
      await gradesApi.createGrade(gradeData);
      toast.success('Grade added successfully');
      fetchGrades();
    } catch (error) {
      console.error('Error adding grade:', error);
      toast.error('Failed to add grade');
    }
  };

  const handleEditGrade = async (grade: Grade) => {
    try {
      await gradesApi.updateGrade(grade.id.toString(), grade);
      toast.success('Grade updated successfully');
      fetchGrades();
    } catch (error) {
      console.error('Error updating grade:', error);
      toast.error('Failed to update grade');
    }
  };

  const handleDeleteGrade = async (gradeId: number) => {
    if (!window.confirm('Are you sure you want to delete this grade?')) return;

    try {
      await gradesApi.deleteGrade(gradeId.toString());
      toast.success('Grade deleted successfully');
      fetchGrades();
    } catch (error) {
      console.error('Error deleting grade:', error);
      toast.error('Failed to delete grade');
    }
  };

  const handleExport = async (format: 'csv' | 'pdf') => {
    try {
      const blob = await gradesApi.exportGrades(format);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `grades.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting grades:', error);
      toast.error('Failed to export grades');
    }
  };

  // Filter grades based on search term
  const filteredGrades = grades.filter(grade =>
    grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    grade.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredGrades.length / itemsPerPage);
  const paginatedGrades = filteredGrades.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-8">
      <GradesHeader 
        onAddGrade={() => setIsModalOpen(true)} 
        onExport={handleExport}
      />
      
      <div className="mb-8">
        <GradeDistribution 
          data={stats?.gradeDistribution || []}
          selectedYear="2024"
          selectedSemester="Spring 2024"
        />
      </div>

      <GradesFilters
        searchTerm={searchTerm}
        courseFilter={courseFilter}
        gradeFilter={gradeFilter}
        onSearchChange={setSearchTerm}
        onCourseChange={setCourseFilter}
        onGradeChange={setGradeFilter}
      />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : (
        <>
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
        </>
      )}

      <AddGradeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddGrade}
      />
    </div>
  );
}