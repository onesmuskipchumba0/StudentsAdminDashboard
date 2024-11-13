import React from 'react'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { Student } from '@/types/student'

interface StudentTableRowProps {
  student: Student;
  onEdit: () => void;
  onDelete: () => void;
}

export const StudentTableRow: React.FC<StudentTableRowProps> = ({
  student,
  onEdit,
  onDelete,
}) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=random`}
              alt=""
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{student.name}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.course}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.enrollmentDate}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
          ${student.status === 'Active' ? 'bg-green-100 text-green-800' : 
            student.status === 'Inactive' ? 'bg-yellow-100 text-yellow-800' : 
            'bg-red-100 text-red-800'}`}>
          {student.status}
        </span>
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