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
  onUpdateProgress,
  onEnrollStudent,
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isEnrollmentFull = course.enrolledStudents >= course.maxStudents;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{course.description}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(course.status)}`}>
          {course.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <AiOutlineUser className="text-gray-400" />
          <span>{course.enrolledStudents}/{course.maxStudents} Students</span>
        </div>
        <div className="flex items-center gap-1">
          <AiOutlineCalendar className="text-gray-400" />
          <span>{course.duration}</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-500">Progress</span>
          <span className="text-xs font-medium">{course.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${course.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <p className="font-medium">Instructor:</p>
            <p className="text-gray-500">{course.instructor}</p>
          </div>
          <div className="text-sm text-right">
            <p className="font-medium">Start Date:</p>
            <p className="text-gray-500">
              {new Date(course.startDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(course)}
            className="btn btn-sm btn-ghost text-blue-600"
          >
            <AiOutlineEdit className="h-4 w-4" />
          </button>
          <button 
            onClick={() => onDelete(course._id)}
            className="btn btn-sm btn-ghost text-red-600"
          >
            <AiOutlineDelete className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex gap-2">
          {course.status === 'Active' && (
            <button
              onClick={() => onUpdateProgress(course._id, Math.min(course.progress + 10, 100))}
              className="btn btn-sm btn-outline btn-primary"
              disabled={course.progress >= 100}
            >
              <AiOutlineCheck className="h-4 w-4 mr-1" />
              Update Progress
            </button>
          )}
          
          <button
            onClick={() => onEnrollStudent(course._id)}
            className="btn btn-sm btn-primary"
            disabled={isEnrollmentFull || course.status !== 'Active'}
          >
            {isEnrollmentFull ? 'Full' : 'Enroll'}
          </button>
        </div>
      </div>
    </div>
  );
} 