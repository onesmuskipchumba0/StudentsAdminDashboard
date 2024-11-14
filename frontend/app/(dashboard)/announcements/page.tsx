'use client';

import { useState, useEffect } from 'react';
import { 
  AnnouncementList, 
  AnnouncementModal, 
  AnnouncementStats 
} from '@/components/announcements';
import { FaPlus, FaBullhorn } from 'react-icons/fa';

// Dummy announcements data


export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAnnouncements = async () => {
    const response = await fetch('http://localhost:5000/api/announcements');
    const data = await response.json();
    setAnnouncements(data);
    console.log(data);
  }
  useEffect(() => {
    fetchAnnouncements();
  }, []);
  // Filter announcements based on category, priority, and search query
  const filteredAnnouncements = announcements.filter(announcement => {
    const matchCategory = filterCategory === 'all' || announcement.category === filterCategory;
    const matchPriority = filterPriority === 'all' || announcement.priority === filterPriority;
    const matchSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchPriority && matchSearch;
  });

  // Sort announcements: pinned first, then by date
  const sortedAnnouncements = [...filteredAnnouncements].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FaBullhorn className="text-2xl" />
          <h1 className="text-2xl font-bold">Announcements</h1>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
        >
          <FaPlus className="mr-2" /> New Announcement
        </button>
      </div>

      {/* Statistics */}
      <AnnouncementStats announcements={announcements} />

      {/* Filters */}
      <div className="flex flex-wrap gap-4 my-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search announcements..."
            className="input input-bordered w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="select select-bordered w-48"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="academic">Academic</option>
          <option value="facility">Facility</option>
          <option value="event">Event</option>
          <option value="general">General</option>
        </select>
        <select
          className="select select-bordered w-48"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Announcements List */}
      <AnnouncementList announcements={sortedAnnouncements} />

      {/* New Announcement Modal */}
      <AnnouncementModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
} 