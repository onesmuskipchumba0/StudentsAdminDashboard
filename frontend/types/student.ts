export interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
  enrollmentDate: string;
  status: 'Active' | 'Inactive' | 'Suspended';
} 