'use client';

import { useState } from 'react';
import { 
  ProfileSettings,
  NotificationSettings,
  SecuritySettings,
  ThemeSettings,
  IntegrationSettings,
  BackupSettings
} from '@/components/settings';
import { FaCog, FaBell, FaLock, FaPalette, FaPlug, FaDatabase } from 'react-icons/fa';

const settingsTabs = [
  { id: 'profile', label: 'Profile', icon: FaCog },
  { id: 'notifications', label: 'Notifications', icon: FaBell },
  { id: 'security', label: 'Security', icon: FaLock },
  { id: 'theme', label: 'Theme', icon: FaPalette },
  { id: 'integrations', label: 'Integrations', icon: FaPlug },
  { id: 'backup', label: 'Backup & Restore', icon: FaDatabase }
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="w-full md:w-64">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-2">
              {settingsTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`
                      btn btn-ghost justify-start gap-2 normal-case
                      ${activeTab === tab.id ? 'bg-base-200' : ''}
                    `}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon className="text-lg" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              {activeTab === 'profile' && <ProfileSettings />}
              {activeTab === 'notifications' && <NotificationSettings />}
              {activeTab === 'security' && <SecuritySettings />}
              {activeTab === 'theme' && <ThemeSettings />}
              {activeTab === 'integrations' && <IntegrationSettings />}
              {activeTab === 'backup' && <BackupSettings />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 