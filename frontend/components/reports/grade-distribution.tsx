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

interface GradeData {
  grade: string;
  students: number;
  department: string;
  year: string;
  semester: string;
}

interface GradeDistributionProps {
  data: GradeData[];
  selectedYear: string;
  selectedSemester: string;
}

export function GradeDistribution({ 
  data,
  selectedYear,
  selectedSemester 
}: GradeDistributionProps) {
  // Aggregate data by grade
  const aggregatedData = data.reduce((acc, curr) => {
    if (!acc[curr.grade]) {
      acc[curr.grade] = { grade: curr.grade, students: 0 };
    }
    acc[curr.grade].students += curr.students;
    return acc;
  }, {} as Record<string, { grade: string; students: number }>);

  const chartData = Object.values(aggregatedData).sort((a, b) => 
    a.grade.localeCompare(b.grade)
  );

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="grade"
            label={{ value: 'Grade', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            label={{ 
              value: 'Number of Students', 
              angle: -90, 
              position: 'insideLeft' 
            }}
          />
          <Tooltip 
            formatter={(value: number) => [`${value} students`]}
            labelFormatter={(label) => `Grade ${label}`}
          />
          <Legend />
          <Bar 
            dataKey="students" 
            name="Students" 
            fill="#82ca9d" 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 