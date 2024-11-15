import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface EnrollmentData {
  year: string;
  semester: string;
  department: string;
  students: number;
}

interface EnrollmentChartProps {
  data: EnrollmentData[];
  selectedYear: string;
  selectedSemester: string;
}

export function EnrollmentChart({ 
  data,
  selectedYear,
  selectedSemester 
}: EnrollmentChartProps) {
  // Aggregate data by semester
  const aggregatedData = data.reduce((acc, curr) => {
    const key = `${curr.year}-${curr.semester}`;
    if (!acc[key]) {
      acc[key] = {
        period: `${curr.semester} ${curr.year}`,
        students: 0,
        year: curr.year,
        semester: curr.semester
      };
    }
    acc[key].students += curr.students;
    return acc;
  }, {} as Record<string, any>);

  const chartData = Object.values(aggregatedData).sort((a, b) => {
    if (a.year !== b.year) return a.year.localeCompare(b.year);
    return a.semester.localeCompare(b.semester);
  });

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="period"
            label={{ value: 'Semester', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            label={{ 
              value: 'Number of Students', 
              angle: -90, 
              position: 'insideLeft',
              offset: -5
            }}
          />
          <Tooltip 
            formatter={(value: number) => [`${value} students`]}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="students"
            name="Enrolled Students"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 