import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface BudgetData {
  name: string;
  value: number;
  color: string;
}

interface BudgetPieChartProps {
  data: BudgetData[];
}

const BudgetPieChart: React.FC<BudgetPieChartProps> = ({ data }) => {
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
          formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Valor']}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

// Exportação padrão corrigida
export default BudgetPieChart;