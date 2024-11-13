'use client';

import type { ScheduleClass } from '@/types/schedule';

interface ScheduleTableProps {
  classes: ScheduleClass[];
}

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export function ScheduleTable({ classes }: ScheduleTableProps) {
  const getClassForTimeSlot = (time: string, day: string) => {
    return classes.find(cls => {
      const timeIndex = timeSlots.indexOf(time);
      const startTimeIndex = timeSlots.indexOf(cls.startTime);
      const endTimeIndex = timeSlots.indexOf(cls.endTime);
      
      return cls.day === day && 
             timeIndex >= startTimeIndex && 
             timeIndex < endTimeIndex;
    });
  };

  return (
    <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
      <table className="table table-fixed w-full">
        <thead>
          <tr className="bg-base-200">
            <th className="w-20">Time</th>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time) => (
            <tr key={time}>
              <td className="font-medium">{time}</td>
              {daysOfWeek.map((day) => {
                const classSession = getClassForTimeSlot(time, day);
                const isFirstSlot = classSession?.startTime === time;

                return (
                  <td key={`${day}-${time}`} className="p-2">
                    {classSession && isFirstSlot && (
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <div className="font-medium text-sm">
                          {classSession.subject}
                        </div>
                        <div className="text-xs text-gray-600">
                          {classSession.teacher} • {classSession.room}
                        </div>
                        <div className="text-xs text-gray-500">
                          {classSession.startTime} - {classSession.endTime}
                        </div>
                        <div className="text-xs text-gray-500">
                          {classSession.department} • {classSession.semester}
                        </div>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 