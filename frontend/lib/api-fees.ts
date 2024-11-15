import { Payment, PaymentStats } from '@/types/payment';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const feesApi = {
  // Get all payments with optional filters
  getPayments: async (filters?: { status?: string; type?: string; semester?: string; studentId?: string }) => {
    const params = new URLSearchParams(filters as Record<string, string>);
    const response = await fetch(`${API_URL}/fees?${params}`);
    if (!response.ok) throw new Error('Failed to fetch payments');
    return response.json();
  },

  // Get payment statistics
  getPaymentStats: async (): Promise<PaymentStats> => {
    const response = await fetch(`${API_URL}/fees/stats`);
    if (!response.ok) throw new Error('Failed to fetch payment stats');
    return response.json();
  },

  // Create new payment
  createPayment: async (payment: Omit<Payment, '_id'>): Promise<Payment> => {
    const response = await fetch(`${API_URL}/fees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payment),
    });
    if (!response.ok) throw new Error('Failed to create payment');
    return response.json();
  },

  // Update payment status
  updatePaymentStatus: async (id: string, status: Payment['status']): Promise<Payment> => {
    const response = await fetch(`${API_URL}/fees/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update payment status');
    return response.json();
  },

  // Get student payment history
  getStudentPayments: async (studentId: string): Promise<Payment[]> => {
    const response = await fetch(`${API_URL}/fees/student/${studentId}`);
    if (!response.ok) throw new Error('Failed to fetch student payments');
    return response.json();
  },
}; 