import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface EnrollmentData {
  month: string;
  students: number;
}

interface Props {
  data: EnrollmentData[];
}

export const EnrollmentChart = ({ data }: Props) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Student Enrollment Trends</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tick={{ fill: '#374151' }}
              stroke="#374151"
            />
            <YAxis
              tick={{ fill: '#374151' }}
              stroke="#374151"
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="students"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}; 