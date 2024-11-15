'use client';

import { useState, useEffect } from 'react';
import { Department } from '@/types/department';

interface DepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Department>) => Promise<void>;
  department?: Department | null;
}

export function DepartmentModal({ isOpen, onClose, onSubmit, department }: DepartmentModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    totalStudents: 0,
    totalTeachers: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name,
        description: department.description,
        totalStudents: department.totalStudents,
        totalTeachers: department.totalTeachers
      });
    } else {
      setFormData({
        name: '',
        description: '',
        totalStudents: 0,
        totalTeachers: 0
      });
    }
  }, [department]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(department ? { ...formData, _id: department._id } : formData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">
          {department ? 'Edit Department' : 'Add New Department'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Department Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter department name"
              required
            />
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter description"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Total Students</span>
              </label>
              <input
                type="number"
                className="input input-bordered"
                value={formData.totalStudents}
                onChange={(e) => setFormData({ ...formData, totalStudents: parseInt(e.target.value) })}
                min="0"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Total Teachers</span>
              </label>
              <input
                type="number"
                className="input input-bordered"
                value={formData.totalTeachers}
                onChange={(e) => setFormData({ ...formData, totalTeachers: parseInt(e.target.value) })}
                min="0"
                required
              />
            </div>
          </div>

          <div className="modal-action">
            <button 
              type="button" 
              className="btn" 
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : department ? 'Save Changes' : 'Add Department'}
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
} 