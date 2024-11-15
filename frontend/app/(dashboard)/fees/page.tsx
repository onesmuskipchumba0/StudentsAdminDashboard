'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { feesApi } from '@/lib/api-fees';
import { Payment, PaymentStats } from '@/types/payment';
import { 
  PaymentStats as PaymentStatsComponent, 
  PaymentHistory, 
  PaymentModal,
  FeeStructure 
} from '@/components/fees';
import { FaPlus, FaMoneyBill } from 'react-icons/fa';

export default function FeesPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState<PaymentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'history' | 'structure'>('history');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [paymentsData, statsData] = await Promise.all([
        feesApi.getPayments(filterStatus !== 'all' ? { status: filterStatus } : undefined),
        feesApi.getPaymentStats()
      ]);

      setPayments(paymentsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterStatus]);

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
      <PaymentStatsComponent stats={stats} loading={loading} />

      {/* Rest of the component */}
      {loading ? (
        <div className="mt-8 flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
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
              <PaymentHistory payments={payments} />
            </>
          )}

          {activeTab === 'structure' && (
            <FeeStructure />
          )}
        </>
      )}

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={(payment) => {
          setPayments([payment, ...payments]);
          fetchData(); // Refresh stats
          toast.success('Payment recorded successfully');
        }} 
      />
    </div>
  );
} 