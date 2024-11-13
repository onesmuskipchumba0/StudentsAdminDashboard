import React from 'react'
import { AttendanceRow } from './AttendanceRow';
import { Attendance } from '../../types/attendance'

interface AttendanceTableProps {
  attendanceData: Attendance[];
  onStatusChange: (studentId: number, status: 'present' | 'absent' | 'late') => void;
}

export const AttendanceTable: React.FC<AttendanceTableProps> = ({
  attendanceData,
  onStatusChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendanceData.map((record) => (
              <AttendanceRow
                key={record.id}
                record={record}
                onStatusChange={onStatusChange}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 