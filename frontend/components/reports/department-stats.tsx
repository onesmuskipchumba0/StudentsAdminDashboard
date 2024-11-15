import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface DepartmentData {
  name: string;
  students: number;
  faculty: number;
  courses: number;
  year: string;
}

interface DepartmentStatsProps {
  data: DepartmentData[];
}

export function DepartmentStats({ data }: DepartmentStatsProps) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name"
            label={{ value: 'Department', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            label={{ 
              value: 'Count', 
              angle: -90, 
              position: 'insideLeft',
              offset: -5
            }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="students" name="Students" fill="#8884d8" />
          <Bar dataKey="faculty" name="Faculty" fill="#82ca9d" />
          <Bar dataKey="courses" name="Courses" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 