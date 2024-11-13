import React from 'react'
import { AiOutlineDownload, AiOutlinePlus } from 'react-icons/ai'

interface GradesHeaderProps {
  onAddGrade: () => void;
}

export const GradesHeader: React.FC<GradesHeaderProps> = ({ onAddGrade }) => {
  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting grades data...')
  }

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Grades</h1>
      <div className="flex gap-3">
        <button 
          onClick={handleExport}
          className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700"
        >
          <AiOutlineDownload />
          Export Report
        </button>
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