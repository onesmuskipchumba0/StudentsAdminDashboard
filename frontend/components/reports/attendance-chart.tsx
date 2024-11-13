import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
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
  // Aggregate data by month
  const aggregatedData = data.reduce((acc, curr) => {
    if (!acc[curr.month]) {
      acc[curr.month] = {
        month: curr.month,
        attendance: 0,
        totalStudents: 0,
        presentStudents: 0,
        departments: new Set()
      };
    }
    acc[curr.month].totalStudents += curr.totalStudents;
    acc[curr.month].presentStudents += curr.presentStudents;
    acc[curr.month].departments.add(curr.department);
    acc[curr.month].attendance = Math.round(
      (acc[curr.month].presentStudents / acc[curr.month].totalStudents) * 100
    );
    return acc;
  }, {} as Record<string, {
    month: string;
    attendance: number;
    totalStudents: number;
    presentStudents: number;
    departments: Set<string>;
  }>);

  const chartData = Object.values(aggregatedData)
    .map(data => ({
      ...data,
      departmentCount: data.departments.size
    }))
    .sort((a, b) => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return months.indexOf(a.month) - months.indexOf(b.month);
    });

  // Calculate statistics
  const averageAttendance = Math.round(
    chartData.reduce((sum, item) => sum + item.attendance, 0) / chartData.length
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-base-100 p-4 rounded-lg shadow border">
          <h3 className="font-bold mb-2">{label}</h3>
          <div className="space-y-1">
            <p>Attendance: {data.attendance}%</p>
            <p>Present Students: {data.presentStudents}</p>
            <p>Total Students: {data.totalStudents}</p>
            <p>Departments: {data.departmentCount}</p>
          </div>
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
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month"
            label={{ value: 'Month', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            domain={[0, 100]}
            label={{ 
              value: 'Attendance (%)', 
              angle: -90, 
              position: 'insideLeft' 
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <ReferenceLine 
            y={averageAttendance} 
            label={`Average: ${averageAttendance}%`} 
            stroke="#ff7300" 
            strokeDasharray="3 3" 
          />
          <Area
            type="monotone"
            dataKey="attendance"
            name="Attendance Rate"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
} 