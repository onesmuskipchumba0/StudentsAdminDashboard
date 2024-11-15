'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { feesApi } from '@/lib/api-fees';
import { Payment } from '@/types/payment';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (payment: Payment) => void;
}

export function PaymentModal({ isOpen, onClose, onSuccess }: PaymentModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    amount: '',
    type: 'tuition',
    paymentMethod: '',
    date: new Date().toISOString().split('T')[0],
    semester: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.studentName || !formData.studentId || !formData.amount || 
        !formData.type || !formData.paymentMethod || !formData.date || !formData.semester) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      const paymentData = {
        ...formData,
        amount: parseFloat(formData.amount),
        status: 'paid',
        date: new Date(formData.date).toISOString(),
      };

      const payment = await feesApi.createPayment(paymentData);
      onSuccess(payment);
      resetForm();
      onClose();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Failed to record payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      studentName: '',
      studentId: '',
      amount: '',
      type: 'tuition',
      paymentMethod: '',
      date: new Date().toISOString().split('T')[0],
      semester: '',
      notes: ''
    });
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg mb-4">Record New Payment</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Student Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                required
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Student ID</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                required
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Payment Type</span>
              </label>
              <select 
                className="select select-bordered" 
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="tuition">Tuition Fee</option>
                <option value="library">Library Fee</option>
                <option value="lab">Lab Fee</option>
                <option value="activity">Activity Fee</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Amount</span>
              </label>
              <input
                type="number"
                className="input input-bordered"
                required
                min="0"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Payment Method</span>
              </label>
              <select 
                className="select select-bordered" 
                required
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              >
                <option value="">Select payment method</option>
                <option value="cash">Cash</option>
                <option value="card">Credit Card</option>
                <option value="bank">Bank Transfer</option>
                <option value="online">Online Payment</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Semester</span>
              </label>
              <select 
                className="select select-bordered" 
                required
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
              >
                <option value="">Select semester</option>
                <option value="Fall 2024">Fall 2024</option>
                <option value="Spring 2024">Spring 2024</option>
                <option value="Summer 2024">Summer 2024</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Payment Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text">Notes</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-action">
            <button 
              type="button" 
              className="btn" 
              onClick={() => {
                resetForm();
                onClose();
              }}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  Recording...
                </>
              ) : (
                'Record Payment'
              )}
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}