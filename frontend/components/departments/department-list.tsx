'use client';

import { FaEdit, FaTrash } from 'react-icons/fa';

interface Department {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  totalStudents: number;
  totalTeachers: number;
}

// Dummy data
const dummyDepartments: Department[] = [
  {
    id: '1',
    name: 'Computer Science',
    description: 'Studies in software development, algorithms, and computer systems',
    createdAt: '2024-01-15',
    totalStudents: 150,
    totalTeachers: 12
  },
  // ... other departments
];

export function DepartmentList({ departments, onEdit, onDelete }: DepartmentListProps) {
  return (
    <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
      <table className="table">
        <thead>
          <tr className="bg-base-200">
            <th>Department Name</th>
            <th>Description</th>
            <th>Students</th>
            <th>Teachers</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department._id} className="hover">
              <td className="font-medium">{department.name}</td>
              <td className="max-w-md truncate">{department.description}</td>
              <td>
                <div className="badge badge-info gap-2">
                  {department.totalStudents}
                </div>
              </td>
              <td>
                <div className="badge badge-success gap-2">
                  {department.totalTeachers}
                </div>
              </td>
              <td>{new Date(department.createdAt).toLocaleDateString()}</td>
              <td>
                <div className="flex gap-2">
                  <button 
                    onClick={() => onEdit(department)}
                    className="btn btn-square btn-sm btn-ghost"
                  >
                    <FaEdit className="text-blue-500" />
                  </button>
                  <button 
                    onClick={() => onDelete(department._id)}
                    className="btn btn-square btn-sm btn-ghost"
                  >
                    <FaTrash className="text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 