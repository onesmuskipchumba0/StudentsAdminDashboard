import React from 'react'
import { AiOutlineDownload } from 'react-icons/ai'

export const AttendanceHeader = () => {
  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting attendance data...')
  }

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Attendance</h1>
      <button 
        onClick={handleExport}
        className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700"
      >
        <AiOutlineDownload />
        Export Report
      </button>
    </div>
  )
} 