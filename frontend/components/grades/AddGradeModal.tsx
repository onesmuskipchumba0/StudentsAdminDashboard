'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Grade } from '@/types/grade';
import { Student } from '@/types/student';
import { FaSpinner, FaSearch } from 'react-icons/fa';

interface AddGradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (gradeData: Omit<Grade, 'id'>) => void;
}

export const AddGradeModal: React.FC<AddGradeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    course: '',
    assignment: '',
    grade: '',
    submissionDate: new Date().toISOString().split('T')[0],
    semester: '',
    department: '',
    year: new Date().getFullYear().toString(),
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.studentId) newErrors.studentId = 'Student ID is required';
    if (!formData.studentName) newErrors.studentName = 'Student name is required';
    if (!formData.course) newErrors.course = 'Course is required';
    if (!formData.assignment) newErrors.assignment = 'Assignment is required';
    if (!formData.grade) newErrors.grade = 'Grade is required';
    if (!formData.submissionDate) newErrors.submissionDate = 'Submission date is required';
    if (!formData.semester) newErrors.semester = 'Semester is required';
    if (!formData.department) newErrors.department = 'Department is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      await onSubmit(formData);
      resetForm();
      onClose();
      toast.success('Grade added successfully');
    } catch (error) {
      console.error('Error adding grade:', error);
      toast.error('Failed to add grade');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      studentId: '',
      studentName: '',
      course: '',
      assignment: '',
      grade: '',
      submissionDate: new Date().toISOString().split('T')[0],
      semester: '',
      department: '',
      year: new Date().getFullYear().toString(),
      notes: ''
    });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <dialog id="add_grade_modal" className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg mb-4">Add New Grade</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Student ID */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Student ID</span>
              </label>
              <input
                type="text"
                className={`input input-bordered ${errors.studentId ? 'input-error' : ''}`}
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                placeholder="Enter student ID"
              />
              {errors.studentId && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.studentId}</span>
                </label>
              )}
            </div>

            {/* Student Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Student Name</span>
              </label>
              <input
                type="text"
                className={`input input-bordered ${errors.studentName ? 'input-error' : ''}`}
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                placeholder="Enter student name"
              />
              {errors.studentName && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.studentName}</span>
                </label>
              )}
            </div>

            {/* Course */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Course</span>
              </label>
              <select
                className={`select select-bordered ${errors.course ? 'select-error' : ''}`}
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              >
                <option value="">Select a course</option>
                <option value="Web Development">Web Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="UI/UX Design">UI/UX Design</option>
              </select>
              {errors.course && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.course}</span>
                </label>
              )}
            </div>

            {/* Assignment */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Assignment</span>
              </label>
              <input
                type="text"
                className={`input input-bordered ${errors.assignment ? 'input-error' : ''}`}
                value={formData.assignment}
                onChange={(e) => setFormData({ ...formData, assignment: e.target.value })}
                placeholder="Enter assignment name"
              />
              {errors.assignment && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.assignment}</span>
                </label>
              )}
            </div>

            {/* Grade */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Grade</span>
              </label>
              <select
                className={`select select-bordered ${errors.grade ? 'select-error' : ''}`}
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              >
                <option value="">Select a grade</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="F">F</option>
              </select>
              {errors.grade && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.grade}</span>
                </label>
              )}
            </div>

            {/* Submission Date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Submission Date</span>
              </label>
              <input
                type="date"
                className={`input input-bordered ${errors.submissionDate ? 'input-error' : ''}`}
                value={formData.submissionDate}
                onChange={(e) => setFormData({ ...formData, submissionDate: e.target.value })}
              />
              {errors.submissionDate && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.submissionDate}</span>
                </label>
              )}
            </div>

            {/* Semester */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Semester</span>
              </label>
              <select
                className={`select select-bordered ${errors.semester ? 'select-error' : ''}`}
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
              >
                <option value="">Select semester</option>
                <option value="Fall 2024">Fall 2024</option>
                <option value="Spring 2024">Spring 2024</option>
                <option value="Summer 2024">Summer 2024</option>
              </select>
              {errors.semester && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.semester}</span>
                </label>
              )}
            </div>

            {/* Department */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Department</span>
              </label>
              <input
                type="text"
                className={`input input-bordered ${errors.department ? 'input-error' : ''}`}
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="Enter department"
              />
              {errors.department && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.department}</span>
                </label>
              )}
            </div>

            {/* Notes */}
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text">Notes</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add any additional notes..."
              />
            </div>
          </div>

          <div className="modal-action">
            <button 
              type="button" 
              className="btn" 
              onClick={() => {
                resetForm();
                onClose();
              }}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  Adding Grade...
                </>
              ) : (
                'Add Grade'
              )}
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