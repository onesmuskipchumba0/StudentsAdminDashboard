'use client';

import { useState } from 'react';

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    email: {
      announcements: true,
      gradeUpdates: true,
      messages: true,
      reminders: false
    },
    push: {
      announcements: false,
      gradeUpdates: true,
      messages: true,
      reminders: true
    },
    frequency: 'immediate'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle notification settings update
    console.log('Notification settings updated:', notifications);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Notification Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="font-medium mb-3">Email Notifications</h3>
          <div className="space-y-2">
            {Object.entries(notifications.email).map(([key, value]) => (
              <div key={key} className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={value}
                    onChange={(e) => setNotifications({
                      ...notifications,
                      email: {
                        ...notifications.email,
                        [key]: e.target.checked
                      }
                    })}
                  />
                  <span className="label-text capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">Push Notifications</h3>
          <div className="space-y-2">
            {Object.entries(notifications.push).map(([key, value]) => (
              <div key={key} className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={value}
                    onChange={(e) => setNotifications({
                      ...notifications,
                      push: {
                        ...notifications.push,
                        [key]: e.target.checked
                      }
                    })}
                  />
                  <span className="label-text capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">Notification Frequency</h3>
          <select
            className="select select-bordered w-full max-w-xs"
            value={notifications.frequency}
            onChange={(e) => setNotifications({
              ...notifications,
              frequency: e.target.value
            })}
          >
            <option value="immediate">Immediate</option>
            <option value="hourly">Hourly Digest</option>
            <option value="daily">Daily Digest</option>
            <option value="weekly">Weekly Digest</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
} 