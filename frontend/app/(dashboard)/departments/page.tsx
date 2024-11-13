'use client';

import { useState } from 'react';
import { DepartmentList, DepartmentModal } from '@/components/departments';
import { FaPlus, FaUsers, FaChalkboardTeacher, FaBuilding } from 'react-icons/fa';

export default function DepartmentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dummy stats
  const stats = {
    totalDepartments: 5,
    totalStudents: 740,
    totalTeachers: 51,
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Departments</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
        >
          <FaPlus className="mr-2" /> Add Department
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-primary">
              <FaBuilding className="w-6 h-6" />
            </div>
            <div className="stat-title">Total Departments</div>
            <div className="stat-value text-primary">{stats.totalDepartments}</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-info">
              <FaUsers className="w-6 h-6" />
            </div>
            <div className="stat-title">Total Students</div>
            <div className="stat-value text-info">{stats.totalStudents}</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-success">
              <FaChalkboardTeacher className="w-6 h-6" />
            </div>
            <div className="stat-title">Total Teachers</div>
            <div className="stat-value text-success">{stats.totalTeachers}</div>
          </div>
        </div>
      </div>

      <DepartmentList />
      <DepartmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
} 