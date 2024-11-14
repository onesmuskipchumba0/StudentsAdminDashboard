'use client';

import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function EventModal({ isOpen, onClose, onSuccess }: EventModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    type: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create event');
      }

      // Reset form and close modal
      setFormData({
        title: '',
        startDate: '',
        endDate: '',
        type: '',
        description: ''
      });
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-base-100 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Event</h2>
          <button onClick={onClose} className="btn btn-ghost btn-sm">
            <FaTimes />
          </button>
        </div>

        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Event Title</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Start Date</span>
            </label>
            <input
              type="datetime-local"
              className="input input-bordered"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">End Date</span>
            </label>
            <input
              type="datetime-local"
              className="input input-bordered"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Event Type</span>
            </label>
            <select
              className="select select-bordered"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              required
            >
              <option value="">Select Type</option>
              <option value="semester">Semester Dates</option>
              <option value="exam">Examinations</option>
              <option value="holiday">Holidays</option>
              <option value="registration">Registration</option>
            </select>
          </div>

          <div className="form-control mb-6">
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

          <div className="flex justify-end gap-2">
            <button 
              type="button" 
              className="btn btn-ghost" 
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
              {loading ? 'Adding...' : 'Add Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 