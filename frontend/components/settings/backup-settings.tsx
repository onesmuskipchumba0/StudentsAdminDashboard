'use client';

import { useState } from 'react';
import { 
  FaDownload, 
  FaUpload, 
  FaHistory, 
  FaClock, 
  FaCheckCircle,
  FaExclamationCircle
} from 'react-icons/fa';

interface BackupHistory {
  id: string;
  date: string;
  size: string;
  type: 'automatic' | 'manual';
  status: 'success' | 'failed';
}

export function BackupSettings() {
  const [backupHistory, setBackupHistory] = useState<BackupHistory[]>([
    {
      id: '1',
      date: '2024-03-15 14:30',
      size: '100 MB',
      type: 'automatic',
      status: 'success'
    },
    {
      id: '2',
      date: '2024-03-15 15:45',
      size: '200 MB',
      type: 'manual',
      status: 'failed'
    }
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Backup Settings</h2>

      {/* Backup History */}
      <div className="space-y-4">
        {backupHistory.map((backup) => {
          return (
            <div key={backup.id} className="card bg-base-200">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-base-300 flex items-center justify-center">
                      {backup.type === 'automatic' ? (
                        <FaClock className="text-2xl" />
                      ) : (
                        <FaHistory className="text-2xl" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{backup.date}</h3>
                      <p className="text-sm text-gray-500">
                        {backup.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`badge ${
                      backup.status === 'success' 
                        ? 'badge-success' 
                        : 'badge-error'
                    }`}>
                      {backup.status}
                    </span>
                    {backup.status === 'failed' && (
                      <FaExclamationCircle className="text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Backup */}
      <div className="card bg-base-200">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-4">
            <FaDownload className="text-xl" />
            <h3 className="font-medium">Backup</h3>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Backup your data to a secure location
          </p>

          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Backup Location</span>
              </label>
              <input
                type="text"
                className="input input-bordered font-mono"
                value="s3://backup-bucket/your-backup-file.zip"
                readOnly
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Backup Frequency</span>
              </label>
              <select className="select select-bordered">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button className="btn btn-outline">
                View Documentation
              </button>
              <button className="btn btn-primary">
                Backup Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 