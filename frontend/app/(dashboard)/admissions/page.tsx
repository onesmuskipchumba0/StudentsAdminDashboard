'use client';

import { useState, useEffect } from 'react';
import { AdmissionsList, AdmissionStats, AdmissionModal } from '@/components/admissions';
import { FaPlus, FaGraduationCap } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

interface AdmissionData {
  _id: string;
  studentId: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  semester: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  previousSchool: string;
  gpa: string;
}

export default function AdmissionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [admissionData, setAdmissionData] = useState<AdmissionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingReview: 0,
    approved: 0,
    rejected: 0,
    thisWeek: 0,
  });

  const fetchAdmissionData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/admissions');
      const data = await response.json();
      setAdmissionData(data);

      // Calculate stats
      const totalApplications = data.length;
      const pendingReview = data.filter(app => app.status === 'pending').length;
      const approved = data.filter(app => app.status === 'approved').length;
      const rejected = data.filter(app => app.status === 'rejected').length;
      
      // Calculate applications from this week
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const thisWeek = data.filter(app => new Date(app.submittedAt) > oneWeekAgo).length;

      setStats({
        totalApplications,
        pendingReview,
        approved,
        rejected,
        thisWeek,
      });
    } catch (error) {
      console.error('Error fetching admissions:', error);
      toast.error('Failed to fetch admissions data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissionData();
  }, []);

  // Filter applications based on status and search query
  const filteredApplications = admissionData.filter(app => {
    const matchStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchSearch = 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FaGraduationCap className="text-2xl" />
          <h1 className="text-2xl font-bold">Admissions</h1>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
        >
          <FaPlus className="mr-2" /> New Application
        </button>
      </div>

      {/* Statistics Cards */}
      <AdmissionStats stats={stats} />

      {/* Filters and Search */}
      <div className="flex gap-4 my-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search applications..."
            className="input input-bordered w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="select select-bordered w-48"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending Review</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Applications List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : (
        <AdmissionsList applications={filteredApplications} />
      )}
      
      {/* New Application Modal */}
      <AdmissionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
} 