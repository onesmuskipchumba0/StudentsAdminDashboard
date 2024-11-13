'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaCamera } from 'react-icons/fa';

export function ProfileSettings() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    title: 'Professor',
    department: 'Computer Science',
    phone: '+1 (555) 123-4567',
    office: 'Room 123, Building A',
    bio: 'Computer Science professor specializing in AI and Machine Learning.'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update
    console.log('Profile updated:', profile);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
      
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <Image
                src="/avatars/default.jpg"
                alt="Profile"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
            <button className="btn btn-circle btn-sm absolute bottom-0 right-0">
              <FaCamera />
            </button>
          </div>
          <div>
            <h3 className="font-medium">{profile.name}</h3>
            <p className="text-sm text-gray-500">{profile.title}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={profile.title}
              onChange={(e) => setProfile({ ...profile, title: e.target.value })}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Department</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={profile.department}
              onChange={(e) => setProfile({ ...profile, department: e.target.value })}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input
              type="tel"
              className="input input-bordered"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Office</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={profile.office}
              onChange={(e) => setProfile({ ...profile, office: e.target.value })}
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Bio</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          />
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