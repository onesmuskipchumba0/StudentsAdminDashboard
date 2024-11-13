'use client';

import { useState } from 'react';
import { FaGoogle, FaMicrosoft, FaSlack, FaGithub, FaDropbox, FaPlug } from 'react-icons/fa';

interface Integration {
  id: string;
  name: string;
  icon: any;
  description: string;
  status: 'connected' | 'disconnected';
  lastSync?: string;
}

export function IntegrationSettings() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'google',
      name: 'Google Workspace',
      icon: FaGoogle,
      description: 'Connect your Google Calendar and Drive',
      status: 'connected',
      lastSync: '2024-03-15 14:30'
    },
    {
      id: 'microsoft',
      name: 'Microsoft 365',
      icon: FaMicrosoft,
      description: 'Sync with Teams and OneDrive',
      status: 'disconnected'
    },
    {
      id: 'slack',
      name: 'Slack',
      icon: FaSlack,
      description: 'Receive notifications in Slack',
      status: 'connected',
      lastSync: '2024-03-15 15:45'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: FaGithub,
      description: 'Connect to GitHub repositories',
      status: 'disconnected'
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      icon: FaDropbox,
      description: 'Sync files with Dropbox',
      status: 'disconnected'
    }
  ]);

  const toggleConnection = (id: string) => {
    setIntegrations(integrations.map(integration => {
      if (integration.id === id) {
        const newStatus = integration.status === 'connected' ? 'disconnected' : 'connected';
        return {
          ...integration,
          status: newStatus,
          lastSync: newStatus === 'connected' ? new Date().toISOString() : undefined
        };
      }
      return integration;
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Integration Settings</h2>

      {/* Available Integrations */}
      <div className="space-y-4">
        {integrations.map((integration) => {
          const Icon = integration.icon;
          return (
            <div key={integration.id} className="card bg-base-200">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-base-300 flex items-center justify-center">
                      <Icon className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="font-medium">{integration.name}</h3>
                      <p className="text-sm text-gray-500">
                        {integration.description}
                      </p>
                      {integration.lastSync && (
                        <p className="text-xs text-gray-500">
                          Last synced: {integration.lastSync}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`badge ${
                      integration.status === 'connected' 
                        ? 'badge-success' 
                        : 'badge-ghost'
                    }`}>
                      {integration.status}
                    </span>
                    <button
                      className={`btn ${
                        integration.status === 'connected' 
                          ? 'btn-error' 
                          : 'btn-primary'
                      }`}
                      onClick={() => toggleConnection(integration.id)}
                    >
                      {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Integration */}
      <div className="card bg-base-200">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-4">
            <FaPlug className="text-xl" />
            <h3 className="font-medium">Custom Integration</h3>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Set up a custom integration using our API
          </p>

          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">API Key</span>
              </label>
              <input
                type="text"
                className="input input-bordered font-mono"
                value="sk_test_1234567890abcdef"
                readOnly
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Webhook URL</span>
              </label>
              <input
                type="text"
                className="input input-bordered font-mono"
                value="https://api.example.com/webhooks/your-endpoint"
                readOnly
              />
            </div>

            <div className="flex justify-end gap-2">
              <button className="btn btn-outline">
                View Documentation
              </button>
              <button className="btn btn-primary">
                Generate New Key
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 