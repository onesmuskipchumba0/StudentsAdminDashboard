import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', attendance: 85 },
  { day: 'Tue', attendance: 88 },
  { day: 'Wed', attendance: 92 },
  { day: 'Thu', attendance: 87 },
  { day: 'Fri', attendance: 85 },
];

export const AttendanceChart = () => {
  return (
    <div className="p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Attendance Overview</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="attendance" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}; 