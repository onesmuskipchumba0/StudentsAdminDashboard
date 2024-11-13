'use client';

import { useState } from 'react';
import type { Department, Semester } from '@/types/schedule';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  departments: Department[];
  semesters: Semester[];
}

export function ScheduleModal({ isOpen, onClose, departments, semesters }: ScheduleModalProps) {
  const [formData, setFormData] = useState({
    subject: '',
    teacher: '',
    room: '',
    day: '',
    startTime: '',
    endTime: '',
    department: '',
    semester: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    onClose();
    setFormData({
      subject: '',
      teacher: '',
      room: '',
      day: '',
      startTime: '',
      endTime: '',
      department: '',
      semester: ''
    });
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Add New Class</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Subject</span>
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="input input-bordered"
                placeholder="Enter subject name"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Department</span>
              </label>
              <select 
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="select select-bordered" 
                required
              >
                <option value="">Select department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Semester</span>
              </label>
              <select 
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="select select-bordered" 
                required
              >
                <option value="">Select semester</option>
                {semesters.map((sem) => (
                  <option key={sem.id} value={sem.name}>
                    {sem.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Add other form fields similarly */}
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
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