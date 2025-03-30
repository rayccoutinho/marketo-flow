import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PerformanceData {
  name: string;
  ctr: number;
  roas: number;
  conversions: number;
}

const PerformanceLineChart: React.FC<{ data: PerformanceData[] }> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="name" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
          formatter={(value: number, name: string) => {
            if (name === 'ctr') return [`${value.toFixed(1)}%`, 'CTR'];
            if (name === 'roas') return [`${value.toFixed(1)}x`, 'ROAS'];
            return [value, 'Conversões'];
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="ctr" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="roas" stroke="#82ca9d" />
        <Line type="monotone" dataKey="conversions" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PerformanceLineChart;