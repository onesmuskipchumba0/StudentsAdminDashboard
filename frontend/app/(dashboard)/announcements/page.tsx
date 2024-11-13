'use client';

import { useState } from 'react';
import { 
  AnnouncementList, 
  AnnouncementModal, 
  AnnouncementStats 
} from '@/components/announcements';
import { FaPlus, FaBullhorn } from 'react-icons/fa';

// Dummy announcements data
const announcements = [
  {
    id: '1',
    title: 'Mid-term Examination Schedule',
    content: 'The mid-term examinations will be conducted from October 15th to October 25th. Please check your respective department notice boards for detailed schedules.',
    category: 'academic',
    priority: 'high',
    author: 'Academic Office',
    createdAt: '2024-03-15T10:00:00Z',
    department: 'All Departments',
    attachments: ['schedule.pdf'],
    pinned: true
  },
  {
    id: '2',
    title: 'Campus Maintenance Notice',
    content: 'The main library will be closed for maintenance work this weekend (March 20-21). Online resources will remain accessible.',
    category: 'facility',
    priority: 'medium',
    author: 'Facility Management',
    createdAt: '2024-03-14T15:30:00Z',
    department: 'All Departments',
    attachments: [],
    pinned: false
  },
  // Add more announcements...
];

export default function AnnouncementsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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