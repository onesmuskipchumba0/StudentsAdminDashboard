export interface Event {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  type: 'semester' | 'exam' | 'holiday' | 'registration';
  description: string;
  createdAt?: string;
  updatedAt?: string;
} 