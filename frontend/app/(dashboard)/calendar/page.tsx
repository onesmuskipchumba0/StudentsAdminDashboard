'use client';

import { useState, useEffect } from 'react';
import { CalendarView, EventsList, EventModal } from '@/components/academic-calendar';
import { FaPlus, FaCalendarAlt } from 'react-icons/fa';



export default function AcademicCalendarPage() {
  const [academicEvents, setAcademicEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [filterType, setFilterType] = useState('all');

  const fetchAcademicEvents = async () => {
    const response = await fetch('http://localhost:5000/api/events')
    const data = await response.json()
    setAcademicEvents(data)
  }
  useEffect(() => {
    fetchAcademicEvents()
  }, [])
  // Filter events based on type
  const filteredEvents = filterType === 'all' 
    ? academicEvents 
    : academicEvents.filter(event => event.type === filterType);

  const handleEventAdded = () => {
    fetchAcademicEvents(); // Refresh the events list
  };

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
        onSuccess={handleEventAdded}
      />
    </div>
  );
} 