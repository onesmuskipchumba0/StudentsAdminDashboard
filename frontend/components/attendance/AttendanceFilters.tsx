import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

interface AttendanceFiltersProps {
  searchTerm: string;
  courseFilter: string;
  dateFilter: string;
  onSearchChange: (value: string) => void;
  onCourseChange: (value: string) => void;
  onDateChange: (value: string) => void;
}

export const AttendanceFilters: React.FC<AttendanceFiltersProps> = ({
  searchTerm,
  courseFilter,
  dateFilter,
  onSearchChange,
  onCourseChange,
  onDateChange,
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

        {/* Date Filter */}
        <input
          type="date"
          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          value={dateFilter}
          onChange={(e) => onDateChange(e.target.value)}
        />
      </div>
    </div>
  )
} 