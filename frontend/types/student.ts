export interface Student {
  studentId: string;
  name: string;
  department?: string;
  email: string;
  course: string;
  enrollmentDate: string;
  status: 'Active' | 'Inactive' | 'Suspended';
} 