import React from 'react';
import { Box, useTheme } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DynamicLineChart = ({ timeRange }: { timeRange: 'week' | 'month' | 'quarter' }) => {
  const theme = useTheme();

  // Dados dinâmicos baseados no período selecionado
  const getData = () => {
    if (timeRange === 'week') {
      return [
        { name: 'Seg', visits: 4000, leads: 2400, conversions: 1800 },
        { name: 'Ter', visits: 3000, leads: 1398, conversions: 1200 },
        { name: 'Qua', visits: 2000, leads: 9800, conversions: 800 },
        { name: 'Qui', visits: 2780, leads: 3908, conversions: 1600 },
        { name: 'Sex', visits: 1890, leads: 4800, conversions: 1400 },
        { name: 'Sáb', visits: 2390, leads: 3800, conversions: 1200 },
        { name: 'Dom', visits: 3490, leads: 4300, conversions: 2100 },
      ];
    } else if (timeRange === 'month') {
      return [
        { name: 'Sem 1', visits: 12000, leads: 8000, conversions: 5000 },
        { name: 'Sem 2', visits: 15000, leads: 10000, conversions: 6000 },
        { name: 'Sem 3', visits: 18000, leads: 12000, conversions: 7000 },
        { name: 'Sem 4', visits: 20000, leads: 15000, conversions: 9000 },
      ];
    } else {
      return [
        { name: 'Jan-Mar', visits: 45000, leads: 30000, conversions: 18000 },
        { name: 'Abr-Jun', visits: 50000, leads: 35000, conversions: 22000 },
        { name: 'Jul-Set', visits: 55000, leads: 40000, conversions: 25000 },
        { name: 'Out-Dez', visits: 60000, leads: 45000, conversions: 30000 },
      ];
    }
  };

  return (
    <Box sx={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={getData()}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis 
            dataKey="name" 
            tick={{ fill: theme.palette.text.secondary }}
          />
          <YAxis 
            tick={{ fill: theme.palette.text.secondary }}
          />
          <Tooltip 
            contentStyle={{
              background: theme.palette.background.paper,
              borderColor: theme.palette.divider,
              borderRadius: '12px',
              boxShadow: theme.shadows[3]
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="visits"
            name="Visitas"
            stroke={theme.palette.primary.main}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="leads"
            name="Leads"
            stroke={theme.palette.secondary.main}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="conversions"
            name="Conversões"
            stroke={theme.palette.success.main}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default DynamicLineChart;