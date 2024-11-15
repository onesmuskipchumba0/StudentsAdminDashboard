export interface Payment {
  _id: string;
  studentName: string;
  studentId: string;
  amount: number;
  type: string;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
  paymentMethod: string;
  semester: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaymentStats {
  totalCollected: number;
  pendingPayments: number;
  thisMonth: number;
  overduePayments: number;
  totalStudents: number;
}

export interface FeeStructure {
  department: string;
  semester: string;
  tuitionFee: number;
  labFee: number;
  libraryFee: number;
  activityFee: number;
  total: number;
} 