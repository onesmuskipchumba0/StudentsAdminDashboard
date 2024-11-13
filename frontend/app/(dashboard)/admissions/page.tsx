'use client';

import { useState } from 'react';
import { AdmissionsList, AdmissionStats, AdmissionModal } from '../../../components/admissions';
import { FaPlus, FaGraduationCap } from 'react-icons/fa';

// Dummy data for statistics
const statsData = {
  totalApplications: 150,
  pendingReview: 45,
  approved: 85,
  rejected: 20,
  thisWeek: 12,
};

// Dummy data for applications
const dummyApplications = [
  {
    id: '1',
    studentName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    department: 'Computer Science',
    semester: 'Fall 2024',
    status: 'pending',
    submittedAt: '2024-03-15',
    previousSchool: 'Lincoln High School',
    gpa: '3.8',
  },
  {
    id: '2',
    studentName: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1234567891',
    department: 'Mathematics',
    semester: 'Fall 2024',
    status: 'approved',
    submittedAt: '2024-03-14',
    previousSchool: 'Washington High School',
    gpa: '3.9',
  },
  // Add more dummy data as needed
];

export default function AdmissionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter applications based on status and search query
  const filteredApplications = dummyApplications.filter(app => {
    const matchStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchSearch = app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      <AdmissionStats stats={statsData} />

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
      <AdmissionsList applications={filteredApplications} />
      
      {/* New Application Modal */}
      <AdmissionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
} 