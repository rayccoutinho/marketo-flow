import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts';

const RadialProgressChart = ({ value, size = 150 }: { value: number; size?: number }) => {
  const theme = useTheme();
  
  const data = [
    {
      value: value,
      fill: theme.palette.primary.main,
    }
  ];

  return (
    <Box sx={{ position: 'relative', width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart 
          innerRadius="80%" 
          outerRadius="100%" 
          barSize={10} 
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar
            background
            dataKey="value"
            cornerRadius={10}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
      }}>
        <Typography variant="h4" fontWeight={700}>
          {value}%
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Concluído
        </Typography>
      </Box>
    </Box>
  );
};

export default RadialProgressChart;