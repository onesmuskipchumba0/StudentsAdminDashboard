'use client';

import { useState } from 'react';
import { 
  PaymentStats, 
  PaymentHistory, 
  PaymentModal,
  FeeStructure 
} from '@/components/fees';
import { FaPlus, FaMoneyBill } from 'react-icons/fa';

// Dummy data for statistics
const statsData = {
  totalCollected: 250000,
  pendingPayments: 75000,
  thisMonth: 45000,
  overduePayments: 15000,
  totalStudents: 150
};

// Dummy data for payment history
const paymentHistory = [
  {
    id: '1',
    studentName: 'John Doe',
    studentId: 'STU001',
    amount: 5000,
    type: 'Tuition Fee',
    status: 'paid',
    date: '2024-03-15',
    paymentMethod: 'Credit Card',
    semester: 'Fall 2024'
  },
  {
    id: '2',
    studentName: 'Jane Smith',
    studentId: 'STU002',
    amount: 4500,
    type: 'Laboratory Fee',
    status: 'pending',
    date: '2024-03-16',
    paymentMethod: 'Bank Transfer',
    semester: 'Fall 2024'
  },
  // Add more dummy data
];

export default function FeesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'history' | 'structure'>('history');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter payments based on status and search query
  const filteredPayments = paymentHistory.filter(payment => {
    const matchStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchSearch = 
      payment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FaMoneyBill className="text-2xl" />
          <h1 className="text-2xl font-bold">Fees & Payments</h1>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
        >
          <FaPlus className="mr-2" /> Record Payment
        </button>
      </div>

      {/* Statistics Cards */}
      <PaymentStats stats={statsData} />

      {/* Tab Controls */}
      <div className="tabs tabs-boxed my-6">
        <button 
          className={`tab ${activeTab === 'history' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Payment History
        </button>
        <button 
          className={`tab ${activeTab === 'structure' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('structure')}
        >
          Fee Structure
        </button>
      </div>

      {activeTab === 'history' && (
        <>
          {/* Filters and Search */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by student name or ID..."
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
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          {/* Payment History Table */}
          <PaymentHistory payments={filteredPayments} />
        </>
      )}

      {activeTab === 'structure' && (
        <FeeStructure />
      )}

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
} 