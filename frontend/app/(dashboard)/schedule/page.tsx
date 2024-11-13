'use client';

import { useState } from 'react';
import { ScheduleTable, ScheduleModal } from '@/components/schedule';
import { FaPlus, FaCalendarAlt } from 'react-icons/fa';

export default function SchedulePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-2xl" />
          <h1 className="text-2xl font-bold">Class Schedule</h1>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
        >
          <FaPlus className="mr-2" /> Add Class
        </button>
      </div>

      {/* Filter Controls */}
      <div className="flex gap-4 mb-6">
        <select className="select select-bordered w-full max-w-xs">
          <option>All Departments</option>
          <option>Computer Science</option>
          <option>Mathematics</option>
          <option>Physics</option>
        </select>

        <select className="select select-bordered w-full max-w-xs">
          <option>All Semesters</option>
          <option>Semester 1</option>
          <option>Semester 2</option>
          <option>Semester 3</option>
        </select>
      </div>

      <ScheduleTable />
      <ScheduleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
} 