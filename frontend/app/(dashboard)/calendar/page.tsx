'use client';

import { useState } from 'react';
import { CalendarView, EventsList, EventModal } from '@/components/academic-calendar';
import { FaPlus, FaCalendarAlt } from 'react-icons/fa';

// Dummy academic events data
const academicEvents = [
  {
    id: '1',
    title: 'Fall Semester Start',
    startDate: '2024-09-01',
    endDate: '2024-09-01',
    type: 'semester',
    description: 'Beginning of Fall Semester 2024',
  },
  {
    id: '2',
    title: 'Mid-term Examinations',
    startDate: '2024-10-15',
    endDate: '2024-10-25',
    type: 'exam',
    description: 'Fall Semester Mid-term Examination Period',
  },
  {
    id: '3',
    title: 'Winter Break',
    startDate: '2024-12-20',
    endDate: '2025-01-05',
    type: 'holiday',
    description: 'Winter Holiday Break',
  },
  {
    id: '4',
    title: 'Spring Registration',
    startDate: '2024-11-15',
    endDate: '2024-12-15',
    type: 'registration',
    description: 'Course Registration for Spring Semester 2025',
  },
  {
    id: '5',
    title: 'Final Examinations',
    startDate: '2024-12-10',
    endDate: '2024-12-20',
    type: 'exam',
    description: 'Fall Semester Final Examination Period',
  },
];

export default function AcademicCalendarPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [filterType, setFilterType] = useState('all');

  // Filter events based on type
  const filteredEvents = filterType === 'all' 
    ? academicEvents 
    : academicEvents.filter(event => event.type === filterType);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-2xl" />
          <h1 className="text-2xl font-bold">Academic Calendar</h1>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
        >
          <FaPlus className="mr-2" /> Add Event
        </button>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-6">
        <div className="join">
          <button 
            className={`btn join-item ${view === 'calendar' ? 'btn-active' : ''}`}
            onClick={() => setView('calendar')}
          >
            Calendar View
          </button>
          <button 
            className={`btn join-item ${view === 'list' ? 'btn-active' : ''}`}
            onClick={() => setView('list')}
          >
            List View
          </button>
        </div>

        <select
          className="select select-bordered"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Events</option>
          <option value="semester">Semester Dates</option>
          <option value="exam">Examinations</option>
          <option value="holiday">Holidays</option>
          <option value="registration">Registration</option>
        </select>
      </div>

      {/* Calendar/List View */}
      <div className="bg-base-100 rounded-lg shadow">
        {view === 'calendar' ? (
          <CalendarView events={filteredEvents} />
        ) : (
          <EventsList events={filteredEvents} />
        )}
      </div>

      {/* Add Event Modal */}
      <EventModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
} 