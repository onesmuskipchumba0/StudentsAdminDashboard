import React from 'react'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { Grade } from '../../types/grade'

interface GradesRowProps {
  grade: Grade;
  onEdit: () => void;
  onDelete: () => void;
}

export const GradesRow: React.FC<GradesRowProps> = ({
  grade,
  onEdit,
  onDelete,
}) => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'bg-green-100 text-green-800';
      case 'B':
        return 'bg-blue-100 text-blue-800';
      case 'C':
        return 'bg-yellow-100 text-yellow-800';
      case 'D':
        return 'bg-orange-100 text-orange-800';
      case 'F':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(grade.studentName)}&background=random`}
              alt=""
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{grade.studentName}</div>
            <div className="text-sm text-gray-500">{grade.studentId}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {grade.course}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {grade.assignment}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getGradeColor(grade.grade)}`}>
          {grade.grade}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {grade.submissionDate}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex gap-2">
          <button onClick={onEdit} className="text-blue-600 hover:text-blue-900">
            <AiOutlineEdit className="h-5 w-5" />
          </button>
          <button onClick={onDelete} className="text-red-600 hover:text-red-900">
            <AiOutlineDelete className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  )
} 