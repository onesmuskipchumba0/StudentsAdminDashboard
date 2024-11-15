import { Grade } from '@/types/grade';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const gradesApi = {
  // Get all grades with filters
  getGrades: async (filters?: {
    studentId?: string;
    course?: string;
    grade?: string;
    semester?: string;
    department?: string;
    year?: string;
  }) => {
    const params = new URLSearchParams(filters as Record<string, string>);
    const response = await fetch(`${API_URL}/grades?${params}`);
    if (!response.ok) throw new Error('Failed to fetch grades');
    return response.json();
  },

  // Create new grade
  createGrade: async (gradeData: Omit<Grade, 'id'>) => {
    const response = await fetch(`${API_URL}/grades`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gradeData),
    });
    if (!response.ok) throw new Error('Failed to create grade');
    return response.json();
  },

  // Update grade
  updateGrade: async (id: string, gradeData: Partial<Grade>) => {
    const response = await fetch(`${API_URL}/grades/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gradeData),
    });
    if (!response.ok) throw new Error('Failed to update grade');
    return response.json();
  },

  // Delete grade
  deleteGrade: async (id: string) => {
    const response = await fetch(`${API_URL}/grades/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete grade');
    return response.json();
  },

  // Get grade statistics
  getGradeStats: async (filters?: {
    department?: string;
    year?: string;
    semester?: string;
  }) => {
    const params = new URLSearchParams(filters as Record<string, string>);
    const response = await fetch(`${API_URL}/grades/stats?${params}`);
    if (!response.ok) throw new Error('Failed to fetch grade statistics');
    return response.json();
  },

  // Export grades
  exportGrades: async (format: 'csv' | 'pdf') => {
    const response = await fetch(`${API_URL}/grades/export?format=${format}`);
    if (!response.ok) throw new Error('Failed to export grades');
    return response.blob();
  },
}; 