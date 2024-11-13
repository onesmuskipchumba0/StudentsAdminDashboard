import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

interface RevenueData {
  month: string;
  tuition: number;
  fees: number;
  other: number;
  department: string;
  year: string;
}

interface RevenueChartProps {
  data: RevenueData[];
  selectedYear: string;
}

export function RevenueChart({ data, selectedYear }: RevenueChartProps) {
  // Aggregate data by month
  const aggregatedData = data.reduce((acc, curr) => {
    if (!acc[curr.month]) {
      acc[curr.month] = {
        month: curr.month,
        tuition: 0,
        fees: 0,
        other: 0,
        departments: new Set()
      };
    }
    acc[curr.month].tuition += curr.tuition;
    acc[curr.month].fees += curr.fees;
    acc[curr.month].other += curr.other;
    acc[curr.month].departments.add(curr.department);
    return acc;
  }, {} as Record<string, {
    month: string;
    tuition: number;
    fees: number;
    other: number;
    departments: Set<string>;
  }>);

  const chartData = Object.values(aggregatedData)
    .map(data => ({
      ...data,
      total: data.tuition + data.fees + data.other,
      departmentCount: data.departments.size
    }))
    .sort((a, b) => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return months.indexOf(a.month) - months.indexOf(b.month);
    });

  // Calculate statistics
  const totalRevenue = chartData.reduce((sum, item) => sum + item.total, 0);
  const averageRevenue = Math.round(totalRevenue / chartData.length);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-base-100 p-4 rounded-lg shadow border">
          <h3 className="font-bold mb-2">{label}</h3>
          <div className="space-y-1">
            <p>Total Revenue: {formatCurrency(data.total)}</p>
            <p>Tuition: {formatCurrency(data.tuition)}</p>
            <p>Fees: {formatCurrency(data.fees)}</p>
            <p>Other: {formatCurrency(data.other)}</p>
            <p>Departments: {data.departmentCount}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[400px]">
      <div className="text-sm text-gray-500 mb-4">
        Total Revenue: {formatCurrency(totalRevenue)} • 
        Average Monthly Revenue: {formatCurrency(averageRevenue)}
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
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
              value: 'Amount ($)', 
              angle: -90, 
              position: 'insideLeft' 
            }}
            tickFormatter={(value) => formatCurrency(value)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <ReferenceLine 
            y={averageRevenue} 
            label={`Average: ${formatCurrency(averageRevenue)}`} 
            stroke="#ff7300" 
            strokeDasharray="3 3" 
          />
          <Bar 
            dataKey="tuition" 
            stackId="a" 
            fill="#8884d8" 
            name="Tuition"
          />
          <Bar 
            dataKey="fees" 
            stackId="a" 
            fill="#82ca9d" 
            name="Fees"
          />
          <Bar 
            dataKey="other" 
            stackId="a" 
            fill="#ffc658" 
            name="Other"
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#ff7300"
            name="Total Revenue"
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
} 