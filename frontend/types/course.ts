export interface Course {
  _id: string;
  name: string;
  description: string;
  duration: string;
  status: 'Active' | 'Upcoming';
  instructor: string;
  startDate: string;
  maxStudents: number;
  enrolledStudents: number;
  progress: number;
  createdAt?: string;
  updatedAt?: string;
} 