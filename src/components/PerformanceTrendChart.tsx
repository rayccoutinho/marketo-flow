import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PerformanceData {
  name: string;
  engagement?: number;
  roas?: number;
  leads?: number;
}

interface PerformanceTrendChartProps {
  data: PerformanceData[];
}

const PerformanceTrendChart: React.FC<PerformanceTrendChartProps> = ({ data }) => {
  return (
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
        <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
        <XAxis dataKey="name" stroke="#a0aec0" />
        <YAxis stroke="#a0aec0" />
        <Tooltip 
          formatter={(value: number, name: string) => {
            if (name === 'engagement') return [`${value}%`, 'Engajamento'];
            if (name === 'roas') return [`${value.toFixed(1)}x`, 'ROAS'];
            return [value, 'Leads'];
          }}
          labelStyle={{ color: '#2d3748' }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="engagement"
          stroke="#48bb78"
          activeDot={{ r: 8 }}
          name="Engajamento (%)"
        />
        <Line
          type="monotone"
          dataKey="roas"
          stroke="#4299e1"
          name="ROAS (x)"
        />
        <Line
          type="monotone"
          dataKey="leads"
          stroke="#9f7aea"
          name="Leads"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PerformanceTrendChart;