'use client';

import { useState, useMemo } from 'react';
import { ScheduleTable, ScheduleModal } from '@/components/schedule';
import { FaPlus, FaCalendarAlt } from 'react-icons/fa';
import type { ScheduleClass } from '@/types/schedule';

// Dummy data
const departments = [
  { id: '1', name: 'Computer Science' },
  { id: '2', name: 'Mathematics' },
  { id: '3', name: 'Physics' },
  { id: '4', name: 'Engineering' },
];

const semesters = [
  { id: '1', name: 'Semester 1' },
  { id: '2', name: 'Semester 2' },
  { id: '3', name: 'Semester 3' },
  { id: '4', name: 'Semester 4' },
];

const dummyClasses: ScheduleClass[] = [
  {
    id: '1',
    subject: 'Introduction to Programming',
    teacher: 'Dr. Smith',
    room: 'Lab 101',
    startTime: '8:00 AM',
    endTime: '10:00 AM',
    department: 'Computer Science',
    semester: 'Semester 1',
    day: 'Monday'
  },
  {
    id: '2',
    subject: 'Calculus I',
    teacher: 'Prof. Johnson',
    room: 'Room 203',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    department: 'Mathematics',
    semester: 'Semester 1',
    day: 'Tuesday'
  },
  {
    id: '3',
    subject: 'Physics Lab',
    teacher: 'Dr. Brown',
    room: 'Lab 202',
    startTime: '1:00 PM',
    endTime: '3:00 PM',
    department: 'Physics',
    semester: 'Semester 2',
    day: 'Wednesday'
  },
];

export default function SchedulePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');

  // Filter classes based on selected department and semester
  const filteredClasses = useMemo(() => {
    return dummyClasses.filter(cls => {
      const matchDepartment = !selectedDepartment || cls.department === selectedDepartment;
      const matchSemester = !selectedSemester || cls.semester === selectedSemester;
      return matchDepartment && matchSemester;
    });
  }, [selectedDepartment, selectedSemester]);

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
        <select 
          className="select select-bordered w-full max-w-xs"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.name}>
              {dept.name}
            </option>
          ))}
        </select>

        <select 
          className="select select-bordered w-full max-w-xs"
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
        >
          <option value="">All Semesters</option>
          {semesters.map((sem) => (
            <option key={sem.id} value={sem.name}>
              {sem.name}
            </option>
          ))}
        </select>
      </div>

      <ScheduleTable classes={filteredClasses} />
      <ScheduleModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        departments={departments}
        semesters={semesters}
      />
    </div>
  );
} 