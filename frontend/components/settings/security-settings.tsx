'use client';

import { useState } from 'react';
import { FaKey, FaShieldAlt, FaHistory } from 'react-icons/fa';

export function SecuritySettings() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const loginHistory = [
    {
      date: '2024-03-15 14:30',
      device: 'Chrome on Windows',
      location: 'New York, USA',
      status: 'success'
    },
    {
      date: '2024-03-14 09:15',
      device: 'Safari on iPhone',
      location: 'New York, USA',
      status: 'success'
    },
    {
      date: '2024-03-13 18:45',
      device: 'Firefox on MacOS',
      location: 'Boston, USA',
      status: 'failed'
    }
  ];

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password update
    console.log('Password update:', passwordData);
    setShowPasswordForm(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Security Settings</h2>

      {/* Password Section */}
      <div className="card bg-base-200">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaKey className="text-xl" />
              <div>
                <h3 className="font-medium">Password</h3>
                <p className="text-sm text-gray-500">
                  Last changed 30 days ago
                </p>
              </div>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setShowPasswordForm(!showPasswordForm)}
            >
              Change Password
            </button>
          </div>

          {showPasswordForm && (
            <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Current Password</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value
                  })}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value
                  })}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm New Password</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value
                  })}
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowPasswordForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="card bg-base-200">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaShieldAlt className="text-xl" />
              <div>
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-500">
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={twoFactorEnabled}
              onChange={(e) => setTwoFactorEnabled(e.target.checked)}
            />
          </div>
        </div>
      </div>

      {/* Login History */}
      <div className="card bg-base-200">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-4">
            <FaHistory className="text-xl" />
            <h3 className="font-medium">Login History</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Device</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loginHistory.map((login, index) => (
                  <tr key={index}>
                    <td>{login.date}</td>
                    <td>{login.device}</td>
                    <td>{login.location}</td>
                    <td>
                      <span className={`badge ${
                        login.status === 'success' 
                          ? 'badge-success' 
                          : 'badge-error'
                      }`}>
                        {login.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 