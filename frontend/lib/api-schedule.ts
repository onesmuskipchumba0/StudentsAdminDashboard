import { ScheduleClass } from '@/types/schedule';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const scheduleApi = {
  // Get all classes
  getClasses: async (filters?: {
    department?: string;
    semester?: string;
  }) => {
    const params = new URLSearchParams(filters as Record<string, string>);
    const response = await fetch(`${API_URL}/schedule?${params}`);
    if (!response.ok) throw new Error('Failed to fetch classes');
    return response.json();
  },

  // Create new class
  createClass: async (classData: Omit<ScheduleClass, 'id'>) => {
    const response = await fetch(`${API_URL}/schedule`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(classData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create class');
    }
    return response.json();
  },

  // Update class
  updateClass: async (id: string, classData: Partial<ScheduleClass>) => {
    const response = await fetch(`${API_URL}/schedule/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(classData),
    });
    if (!response.ok) throw new Error('Failed to update class');
    return response.json();
  },

  // Delete class
  deleteClass: async (id: string) => {
    const response = await fetch(`${API_URL}/schedule/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete class');
    return response.json();
  },
}; 