'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { DepartmentList, DepartmentModal } from '@/components/departments';
import { FaPlus, FaUsers, FaChalkboardTeacher, FaBuilding } from 'react-icons/fa';
import { Department, DepartmentStats } from '@/types/department';

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [stats, setStats] = useState<DepartmentStats['summary'] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch departments and stats
  const fetchData = async () => {
    try {
      setLoading(true);
      const [departmentsRes, statsRes] = await Promise.all([
        fetch('http://localhost:5000/api/departments'),
        fetch('http://localhost:5000/api/departments/stats/summary')
      ]);

      if (!departmentsRes.ok || !statsRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const departmentsData = await departmentsRes.json();
      const statsData = await statsRes.json();

      setDepartments(departmentsData);
      setStats(statsData.summary);
    } catch (error) {
      toast.error('Failed to fetch departments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle department creation/update
  const handleSubmit = async (data: Partial<Department>) => {
    try {
      const url = selectedDepartment
        ? `http://localhost:5000/api/departments/${selectedDepartment._id}`
        : 'http://localhost:5000/api/departments';

      const response = await fetch(url, {
        method: selectedDepartment ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save department');
      }

      toast.success(selectedDepartment ? 'Department updated' : 'Department created');
      setIsModalOpen(false);
      setSelectedDepartment(null);
      fetchData();
    } catch (error) {
      toast.error('Failed to save department');
      throw error;
    }
  };

  // Handle department deletion
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this department?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/departments/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete department');
      }

      toast.success('Department deleted');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete department');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Departments</h1>
        <button
          onClick={() => {
            setSelectedDepartment(null);
            setIsModalOpen(true);
          }}
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
            <div className="stat-value text-primary">
              {stats?.totalDepartments || 0}
            </div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-info">
              <FaUsers className="w-6 h-6" />
            </div>
            <div className="stat-title">Total Students</div>
            <div className="stat-value text-info">
              {stats?.totalStudentsAll || 0}
            </div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-success">
              <FaChalkboardTeacher className="w-6 h-6" />
            </div>
            <div className="stat-title">Total Teachers</div>
            <div className="stat-value text-success">
              {stats?.totalTeachersAll || 0}
            </div>
          </div>
        </div>
      </div>

      <DepartmentList
        departments={departments}
        onEdit={(dept) => {
          setSelectedDepartment(dept);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      <DepartmentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDepartment(null);
        }}
        onSubmit={handleSubmit}
        department={selectedDepartment}
      />
    </div>
  );
} 