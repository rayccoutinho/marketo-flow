import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface CampaignTypeData {
  name: string;
  value: number;
  color: string;
}

interface CampaignTypeDistributionProps {
  data: CampaignTypeData[];
}

const CampaignTypeDistribution: React.FC<CampaignTypeDistributionProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number) => [`${value}%`, 'Participação']}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CampaignTypeDistribution;