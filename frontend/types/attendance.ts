export interface Attendance {
  id: number;
  studentId: number;
  studentName: string;
  course: string;
  date: string;
  status: 'present' | 'absent' | 'late';
} 