'use client';

import { useState, useEffect } from 'react';
import { Course } from '@/types/course';

interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (courseData: Course) => void;
  course: Course;
}

export const EditCourseModal: React.FC<EditCourseModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  course,
}) => {
  const [formData, setFormData] = useState<Course>(course);

  useEffect(() => {
    setFormData(course);
  }, [course]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Edit Course</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Course Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Duration</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Instructor</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                className="select select-bordered"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Course['status'] })}
                required
              >
                <option value="Active">Active</option>
                <option value="Upcoming">Upcoming</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Maximum Students</span>
              </label>
              <input
                type="number"
                className="input input-bordered"
                value={formData.maxStudents}
                onChange={(e) => setFormData({ ...formData, maxStudents: parseInt(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}; 