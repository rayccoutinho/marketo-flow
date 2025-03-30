import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChannelData {
  name: string;
  engagement?: number;
  roas?: number;
  leads?: number;
}

interface ChannelPerformanceChartProps {
  data: ChannelData[];
}

const ChannelPerformanceChart: React.FC<ChannelPerformanceChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
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
        <Bar
          dataKey="engagement"
          fill="#48bb78"
          name="Engajamento (%)"
        />
        <Bar
          dataKey="roas"
          fill="#4299e1"
          name="ROAS (x)"
        />
        <Bar
          dataKey="leads"
          fill="#9f7aea"
          name="Leads"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChannelPerformanceChart;