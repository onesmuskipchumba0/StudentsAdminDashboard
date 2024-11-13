import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

interface CoursesHeaderProps {
  onAddCourse: () => void;
}

export const CoursesHeader: React.FC<CoursesHeaderProps> = ({ onAddCourse }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Courses</h1>
      <button 
        onClick={onAddCourse}
        className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
      >
        <AiOutlinePlus />
        Add Course
      </button>
    </div>
  )
} 