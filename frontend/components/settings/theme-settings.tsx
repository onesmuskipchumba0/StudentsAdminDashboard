'use client';

import { useState } from 'react';
import { FaPalette, FaFont, FaMoon } from 'react-icons/fa';

const themes = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter'
];

export function ThemeSettings() {
  const [settings, setSettings] = useState({
    theme: 'light',
    fontSize: 'medium',
    darkMode: false,
    animations: true
  });

  const handleThemeChange = (theme: string) => {
    setSettings({ ...settings, theme });
    // Update theme in document
    document.documentElement.setAttribute('data-theme', theme);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Theme Settings</h2>

      {/* Theme Selection */}
      <div className="card bg-base-200">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-4">
            <FaPalette className="text-xl" />
            <h3 className="font-medium">Theme</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {themes.map((theme) => (
              <button
                key={theme}
                className={`btn ${
                  settings.theme === theme ? 'btn-primary' : 'btn-outline'
                }`}
                onClick={() => handleThemeChange(theme)}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Font Size */}
      <div className="card bg-base-200">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-4">
            <FaFont className="text-xl" />
            <h3 className="font-medium">Font Size</h3>
          </div>

          <select
            className="select select-bordered w-full max-w-xs"
            value={settings.fontSize}
            onChange={(e) => setSettings({
              ...settings,
              fontSize: e.target.value
            })}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>

      {/* Additional Settings */}
      <div className="card bg-base-200">
        <div className="card-body space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaMoon className="text-xl" />
              <div>
                <h3 className="font-medium">Dark Mode</h3>
                <p className="text-sm text-gray-500">
                  Automatically switch to dark theme at night
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={settings.darkMode}
              onChange={(e) => setSettings({
                ...settings,
                darkMode: e.target.checked
              })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Animations</h3>
              <p className="text-sm text-gray-500">
                Enable interface animations
              </p>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={settings.animations}
              onChange={(e) => setSettings({
                ...settings,
                animations: e.target.checked
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 