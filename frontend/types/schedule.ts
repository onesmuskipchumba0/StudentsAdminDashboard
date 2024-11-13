export interface ScheduleClass {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  startTime: string;
  endTime: string;
  department: string;
  semester: string;
  day: string;
}

export interface Department {
  id: string;
  name: string;
}

export interface Semester {
  id: string;
  name: string;
} 