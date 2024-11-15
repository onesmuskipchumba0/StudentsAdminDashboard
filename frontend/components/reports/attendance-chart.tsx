import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface AttendanceData {
  month: string;
  attendance: number;
  department: string;
  year: string;
  totalStudents: number;
  presentStudents: number;
}

interface AttendanceChartProps {
  data: AttendanceData[];
}

export function AttendanceChart({ data }: AttendanceChartProps) {
  // Calculate attendance percentage
  const chartData = data.map(item => ({
    ...item,
    attendanceRate: ((item.presentStudents / item.totalStudents) * 100).toFixed(1)
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-base-100 p-4 rounded-lg shadow border">
          <p className="font-bold">{label}</p>
          <p>Attendance Rate: {payload[0].value}%</p>
          <p>Present: {payload[0].payload.presentStudents}</p>
          <p>Total: {payload[0].payload.totalStudents}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month"
            label={{ value: 'Month', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            label={{ 
              value: 'Attendance Rate (%)', 
              angle: -90, 
              position: 'insideLeft',
              offset: -5
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="attendanceRate"
            name="Attendance Rate"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
} 