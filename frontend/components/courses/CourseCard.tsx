import React from 'react'
import { AiOutlineEdit, AiOutlineDelete, AiOutlineUser, AiOutlineCalendar } from 'react-icons/ai'
import { Course } from '../../types/course'

interface CourseCardProps {
  course: Course;
  onEdit: () => void;
  onDelete: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onEdit,
  onDelete,
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{course.description}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(course.status)}`}>
          {course.status}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <AiOutlineUser className="text-gray-400" />
          {course.enrolledStudents} Students
        </div>
        <div className="flex items-center gap-1">
          <AiOutlineCalendar className="text-gray-400" />
          {course.duration}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="flex-1">
          <div className="text-xs text-gray-500 mb-1">Progress</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>
        <span className="text-sm text-gray-600">{course.progress}%</span>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
        <div className="flex -space-x-2">
          {/* Sample avatars - replace with actual student avatars */}
          {[1, 2, 3].map((i) => (
            <img
              key={i}
              className="h-8 w-8 rounded-full border-2 border-white"
              src={`https://ui-avatars.com/api/?name=Student${i}&background=random`}
              alt=""
            />
          ))}
          {course.enrolledStudents > 3 && (
            <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-500">
              +{course.enrolledStudents - 3}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button 
            onClick={onEdit}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
          >
            <AiOutlineEdit className="h-5 w-5" />
          </button>
          <button 
            onClick={onDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full"
          >
            <AiOutlineDelete className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
} 