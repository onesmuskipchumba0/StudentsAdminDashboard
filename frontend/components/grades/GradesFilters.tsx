import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

interface GradesFiltersProps {
  searchTerm: string;
  courseFilter: string;
  gradeFilter: string;
  onSearchChange: (value: string) => void;
  onCourseChange: (value: string) => void;
  onGradeChange: (value: string) => void;
}

export const GradesFilters: React.FC<GradesFiltersProps> = ({
  searchTerm,
  courseFilter,
  gradeFilter,
  onSearchChange,
  onCourseChange,
  onGradeChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <AiOutlineSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search students..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Course Filter */}
        <select
          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          value={courseFilter}
          onChange={(e) => onCourseChange(e.target.value)}
        >
          <option value="">All Courses</option>
          <option value="Web Development">Web Development</option>
          <option value="Data Science">Data Science</option>
          <option value="Mobile Development">Mobile Development</option>
          <option value="UI/UX Design">UI/UX Design</option>
        </select>

        {/* Grade Filter */}
        <select
          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          value={gradeFilter}
          onChange={(e) => onGradeChange(e.target.value)}
        >
          <option value="">All Grades</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="F">F</option>
        </select>
      </div>
    </div>
  )
} 