import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const ChannelMixChart = () => {
  const theme = useTheme();

  const data = [
    { name: 'Email', value: 35 },
    { name: 'Redes Sociais', value: 25 },
    { name: 'Anúncios', value: 20 },
    { name: 'SEO', value: 15 },
    { name: 'Outros', value: 5 }
  ];

  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.info.main,
    theme.palette.success.main,
    theme.palette.warning.main
  ];

  return (
    <Box sx={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              borderColor: theme.palette.divider,
              borderRadius: '8px',
              boxShadow: theme.shadows[2]
            }}
            formatter={(value, name) => [`${value}%`, name]}
          />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ChannelMixChart;