import React from 'react'
import { AiOutlineDownload, AiOutlinePlus } from 'react-icons/ai'

interface GradesHeaderProps {
  onAddGrade: () => void;
  onExport: (format: 'csv' | 'pdf') => void;
}

export const GradesHeader: React.FC<GradesHeaderProps> = ({ 
  onAddGrade,
  onExport 
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Grades</h1>
      <div className="flex gap-3">
        <div className="dropdown dropdown-end">
          <button 
            tabIndex={0}
            className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700"
          >
            <AiOutlineDownload />
            Export Report
          </button>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><button onClick={() => onExport('csv')}>Export as CSV</button></li>
            <li><button onClick={() => onExport('pdf')}>Export as PDF</button></li>
          </ul>
        </div>
        <button 
          onClick={onAddGrade}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
        >
          <AiOutlinePlus />
          Add Grade
        </button>
      </div>
    </div>
  )
} 