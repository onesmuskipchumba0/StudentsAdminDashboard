import React, { useState } from 'react'
import { Grade } from '../../types/grade'

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
  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    course: '',
    assignment: '',
    grade: '',
    submissionDate: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      studentId: '',
      studentName: '',
      course: '',
      assignment: '',
      grade: '',
      submissionDate: '',
    })
    onClose()
  }

  return (
    <dialog id="add_grade_modal" className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Add New Grade</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Student Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter student name"
              className="input input-bordered w-full"
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              required
            />
          </div>

          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">Student ID</span>
            </label>
            <input
              type="text"
              placeholder="Enter student ID"
              className="input input-bordered w-full"
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              required
            />
          </div>

          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">Course</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              required
            >
              <option value="">Select a course</option>
              <option value="Web Development">Web Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="UI/UX Design">UI/UX Design</option>
            </select>
          </div>

          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">Assignment</span>
            </label>
            <input
              type="text"
              placeholder="Enter assignment name"
              className="input input-bordered w-full"
              value={formData.assignment}
              onChange={(e) => setFormData({ ...formData, assignment: e.target.value })}
              required
            />
          </div>

          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">Grade</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              required
            >
              <option value="">Select a grade</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </select>
          </div>

          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">Submission Date</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={formData.submissionDate}
              onChange={(e) => setFormData({ ...formData, submissionDate: e.target.value })}
              required
            />
          </div>

          <div className="modal-action">
            <button 
              type="button" 
              className="btn" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              Add Grade
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  )
} 