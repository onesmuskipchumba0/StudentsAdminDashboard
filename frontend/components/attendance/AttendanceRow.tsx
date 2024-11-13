import React from 'react'
import { Attendance } from '../../types/attendance'

interface AttendanceRowProps {
  record: Attendance;
  onStatusChange: (studentId: number, status: 'present' | 'absent' | 'late') => void;
}

export const AttendanceRow: React.FC<AttendanceRowProps> = ({
  record,
  onStatusChange,
}) => {
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
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
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(record.studentName)}&background=random`}
              alt=""
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{record.studentName}</div>
            <div className="text-sm text-gray-500">{record.studentId}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {record.course}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {record.date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(record.status)}`}>
          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <select
          className="select select-bordered select-sm w-full max-w-xs"
          value={record.status}
          onChange={(e) => onStatusChange(record.studentId, e.target.value as 'present' | 'absent' | 'late')}
        >
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="late">Late</option>
        </select>
      </td>
    </tr>
  )
} 