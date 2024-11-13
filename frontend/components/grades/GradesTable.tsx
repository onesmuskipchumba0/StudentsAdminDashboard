import React from 'react'
import { GradesRow } from './GradesRow';
import { Grade } from '../../types/grade'

interface GradesTableProps {
  gradesData: Grade[];
  onEdit: (grade: Grade) => void;
  onDelete: (gradeId: number) => void;
}

export const GradesTable: React.FC<GradesTableProps> = ({
  gradesData,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {gradesData.map((grade) => (
              <GradesRow
                key={grade.id}
                grade={grade}
                onEdit={() => onEdit(grade)}
                onDelete={() => onDelete(grade.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 