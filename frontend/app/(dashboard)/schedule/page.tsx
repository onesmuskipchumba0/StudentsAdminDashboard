'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { ScheduleModal, ScheduleTable } from '@/components/schedule';
import { scheduleApi } from '@/lib/api-schedule';
import { FaPlus, FaCalendarAlt } from 'react-icons/fa';
import type { ScheduleClass } from '@/types/schedule';

export default function SchedulePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classes, setClasses] = useState<ScheduleClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const filters: any = {};
      if (selectedDepartment) filters.department = selectedDepartment;
      if (selectedSemester) filters.semester = selectedSemester;
      
      const data = await scheduleApi.getClasses(filters);
      setClasses(data);
    } catch (error) {
      console.error('Error fetching classes:', error);
      toast.error('Failed to fetch classes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [selectedDepartment, selectedSemester]);

  const handleAddClass = async (classData: Omit<ScheduleClass, 'id'>) => {
    try {
      const newClass = await scheduleApi.createClass(classData);
      setClasses(prev => [...prev, newClass]);
      toast.success('Class added successfully');
    } catch (error: any) {
      console.error('Error adding class:', error);
      toast.error(error.message || 'Failed to add class');
    }
  };

  const departmentsData = [
    { id: 'cs', name: 'Computer Science' },
    { id: 'math', name: 'Mathematics' },
    { id: 'phys', name: 'Physics' }
  ];

  const semestersData = [
    { id: 'sem1', name: 'Semester 1' },
    { id: 'sem2', name: 'Semester 2' },
    { id: 'sem3', name: 'Semester 3' }
  ];

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

      <div className="flex gap-4 mb-6">
        <select 
          className="select select-bordered w-full max-w-xs"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="">All Departments</option>
          {departmentsData.map((dept) => (
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
          {semestersData.map((sem) => (
            <option key={sem.id} value={sem.name}>
              {sem.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : (
        <ScheduleTable classes={classes} />
      )}

      <ScheduleModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddClass}
        departments={departmentsData}
        semesters={semestersData}
      />
    </div>
  );
} 