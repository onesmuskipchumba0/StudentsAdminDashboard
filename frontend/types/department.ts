export interface Department {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  totalStudents: number;
  totalTeachers: number;
  updatedAt?: string;
}

export interface DepartmentStats {
  summary: {
    totalDepartments: number;
    totalStudentsAll: number;
    totalTeachersAll: number;
    avgStudentsPerDepartment: number;
    avgTeachersPerDepartment: number;
  };
  departmentSizes: {
    _id: string;
    name: string;
    totalMembers: number;
  }[];
} 