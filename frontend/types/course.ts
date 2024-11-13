export interface Course {
  id: number;
  name: string;
  description: string;
  duration: string;
  status: 'Active' | 'Upcoming' | 'Completed';
  instructor: string;
  startDate: string;
  maxStudents: string;
  enrolledStudents: number;
  progress: number;
} 