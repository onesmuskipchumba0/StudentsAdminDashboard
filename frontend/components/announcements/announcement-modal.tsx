'use client';

import { useState } from 'react';
import { FaUpload } from 'react-icons/fa';

interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AnnouncementModal({ isOpen, onClose }: AnnouncementModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    priority: '',
    department: '',
    pinned: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-3xl">
        <h3 className="font-bold text-lg mb-4">New Announcement</h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Enter announcement title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select 
                  className="select select-bordered"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  <option value="">Select category</option>
                  <option value="academic">Academic</option>
                  <option value="facility">Facility</option>
                  <option value="event">Event</option>
                  <option value="general">General</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Priority</span>
                </label>
                <select 
                  className="select select-bordered"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  required
                >
                  <option value="">Select priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Department</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Enter department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Enter announcement content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Attachments</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered file-input-primary"
                multiple
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Pinned</span>
              </label>
              <select 
                className="select select-bordered"
                value={formData.pinned ? "true" : "false"}
                onChange={(e) => setFormData({ ...formData, pinned: e.target.value === 'true' })}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>

            <div className="mt-6">
              <button type="submit" className="btn btn-primary">
                <FaUpload className="mr-2" /> Create Announcement
              </button>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
} 