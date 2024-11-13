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
  // Aggregate data by semester if multiple departments are selected
  const aggregatedData = data.reduce((acc, curr) => {
    const key = `${curr.year}-${curr.semester}`;
    if (!acc[key]) {
      acc[key] = {
        year: curr.year,
        semester: curr.semester,
        students: 0
      };
    }
    acc[key].students += curr.students;
    return acc;
  }, {} as Record<string, Omit<EnrollmentData, 'department'>>);

  const chartData = Object.values(aggregatedData).sort((a, b) => {
    if (a.year !== b.year) return a.year.localeCompare(b.year);
    return a.semester.localeCompare(b.semester);
  });

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="semester" 
            label={{ value: 'Semester', position: 'insideBottom', offset: -5 }}
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
            labelFormatter={(label) => `${label}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="students"
            name="Enrolled Students"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 