'use client';

import { useState } from 'react';
import type { Department, Semester } from '@/types/schedule';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<ScheduleClass, 'id'>) => void;
  departments: Department[];
  semesters: Semester[];
}

export function ScheduleModal({ isOpen, onClose, onSubmit, departments, semesters }: ScheduleModalProps) {
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
    onSubmit({
      subject: formData.subject,
      teacher: formData.teacher,
      room: formData.room,
      day: formData.day,
      startTime: formData.startTime,
      endTime: formData.endTime,
      department: formData.department,
      semester: formData.semester
    });
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
                <span className="label-text">Teacher</span>
              </label>
              <input
                type="text"
                name="teacher"
                value={formData.teacher}
                onChange={handleChange}
                className="input input-bordered"
                placeholder="Enter teacher name"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Room</span>
              </label>
              <input
                type="text"
                name="room"
                value={formData.room}
                onChange={handleChange}
                className="input input-bordered"
                placeholder="Enter room number"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Day</span>
              </label>
              <select 
                name="day"
                value={formData.day}
                onChange={handleChange}
                className="select select-bordered" 
                required
              >
                <option value="">Select day</option>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Start Time</span>
              </label>
              <select 
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="select select-bordered" 
                required
              >
                <option value="">Select start time</option>
                {['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
                  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'].map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">End Time</span>
              </label>
              <select 
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="select select-bordered" 
                required
              >
                <option value="">Select end time</option>
                {['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
                  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'].map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
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