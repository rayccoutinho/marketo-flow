import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChannelData {
  name: string;
  value: number;
  color: string;
}

const ChannelBreakdownChart: React.FC<{ data: ChannelData[] }> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis type="number" stroke="#9CA3AF" />
        <YAxis dataKey="name" type="category" stroke="#9CA3AF" />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
          formatter={(value: number) => [`${value}%`, 'Participação']}
        />
        <Legend />
        <Bar dataKey="value" name="Participação" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <React.Fragment key={`cell-${index}`}>
              <defs>
                <linearGradient id={`color-${index}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={entry.color} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={entry.color} stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <rect 
                x={0} 
                y={0} 
                width="100%" 
                height="100%" 
                fill={`url(#color-${index})`} 
              />
            </React.Fragment>
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChannelBreakdownChart;