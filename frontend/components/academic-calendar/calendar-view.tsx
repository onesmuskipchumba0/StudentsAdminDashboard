'use client';

import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  type: string;
  description: string;
}

interface CalendarViewProps {
  events: Event[];
}

export function CalendarView({ events }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getEventForDate = (date: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return events.filter(event => {
      const eventStart = new Date(event.startDate).toISOString().split('T')[0];
      const eventEnd = new Date(event.endDate).toISOString().split('T')[0];
      return dateStr >= eventStart && dateStr <= eventEnd;
    });
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  return (
    <div className="p-4">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <button className="btn btn-ghost btn-sm" onClick={prevMonth}>
          <FaChevronLeft />
        </button>
        <h2 className="text-xl font-bold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button className="btn btn-ghost btn-sm" onClick={nextMonth}>
          <FaChevronRight />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Week days */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-medium p-2">
            {day}
          </div>
        ))}

        {/* Empty cells for first week */}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="p-2" />
        ))}

        {/* Calendar days */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const date = index + 1;
          const eventsForDate = getEventForDate(date);

          return (
            <div
              key={date}
              className="min-h-24 p-2 border rounded-lg hover:bg-base-200 transition-colors"
            >
              <div className="font-medium">{date}</div>
              <div className="space-y-1">
                {eventsForDate.map(event => (
                  <div
                    key={event.id}
                    className={`text-xs p-1 rounded truncate
                      ${event.type === 'exam' ? 'bg-red-100 text-red-800' :
                        event.type === 'holiday' ? 'bg-green-100 text-green-800' :
                        event.type === 'semester' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 