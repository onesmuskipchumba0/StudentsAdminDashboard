import React from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
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

export function RevenueChart({ 
  data,
  selectedYear 
}: RevenueChartProps) {
  // Calculate totals for each revenue stream
  const chartData = data.map(item => ({
    ...item,
    total: item.tuition + item.fees + item.other
  }));

  // Format currency
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-base-100 p-4 rounded-lg shadow border">
          <p className="font-bold">{label}</p>
          <div className="space-y-1">
            <p>Tuition: {formatCurrency(payload[0].value)}</p>
            <p>Fees: {formatCurrency(payload[1].value)}</p>
            <p>Other: {formatCurrency(payload[2].value)}</p>
            <p className="font-bold border-t pt-1">
              Total: {formatCurrency(payload[3].value)}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[400px]">
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
              value: 'Revenue (USD)', 
              angle: -90, 
              position: 'insideLeft',
              offset: -5
            }}
            tickFormatter={(value) => formatCurrency(value)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="tuition" name="Tuition" fill="#8884d8" stackId="a" />
          <Bar dataKey="fees" name="Fees" fill="#82ca9d" stackId="a" />
          <Bar dataKey="other" name="Other" fill="#ffc658" stackId="a" />
          <Line
            type="monotone"
            dataKey="total"
            name="Total Revenue"
            stroke="#ff7300"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
} 