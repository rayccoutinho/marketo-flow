import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Area
} from 'recharts';
import { useTheme } from '@mui/material';
import { styled } from '@mui/system';

interface PerformanceData {
  name: string;
  ctr: number;
  roas: number;
  conversions: number;
}

const GlassChartContainer = styled('div')(({ theme }) => ({
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  padding: theme.spacing(3),
  height: '100%'
}));

const PerformanceLineChart: React.FC<{ data: PerformanceData[] }> = ({ data }) => {
  const theme = useTheme();
  
  // Cores baseadas no tema Material-UI
  const colors = {
    ctr: theme.palette.primary.main,
    roas: theme.palette.secondary.main,
    conversions: theme.palette.warning.main
  };

  return (
    <GlassChartContainer>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            {/* Gradientes para as áreas */}
            <linearGradient id="colorCtr" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.ctr} stopOpacity={0.2}/>
              <stop offset="95%" stopColor={colors.ctr} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorRoas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.roas} stopOpacity={0.2}/>
              <stop offset="95%" stopColor={colors.roas} stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={theme.palette.divider} 
            vertical={false}
          />
          
          <XAxis 
            dataKey="name" 
            tick={{ fill: theme.palette.text.secondary }}
            axisLine={{ stroke: theme.palette.divider }}
            tickLine={{ stroke: theme.palette.divider }}
          />
          
          <YAxis 
            tick={{ fill: theme.palette.text.secondary }}
            axisLine={{ stroke: theme.palette.divider }}
            tickLine={{ stroke: theme.palette.divider }}
          />
          
          <Tooltip 
            contentStyle={{
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderColor: theme.palette.divider,
              borderRadius: theme.shape.borderRadius,
              boxShadow: theme.shadows[2]
            }}
            formatter={(value: number, name: string) => {
              if (name === 'ctr') return [`${value.toFixed(1)}%`, 'CTR'];
              if (name === 'roas') return [`${value.toFixed(1)}x`, 'ROAS'];
              return [value, 'Conversões'];
            }}
            labelStyle={{
              color: theme.palette.text.primary,
              fontWeight: 600
            }}
          />
          
          <Legend 
            wrapperStyle={{
              paddingTop: '20px'
            }}
          />
          
          {/* Área de fundo para CTR */}
          <Area 
            type="monotone" 
            dataKey="ctr" 
            stroke="none" 
            fillOpacity={0.1} 
            fill="url(#colorCtr)" 
          />
          
          {/* Linha principal para CTR */}
          <Line 
            type="monotone" 
            dataKey="ctr" 
            stroke={colors.ctr} 
            strokeWidth={2}
            dot={{ r: 4, fill: colors.ctr }}
            activeDot={{ 
              r: 6, 
              stroke: colors.ctr,
              strokeWidth: 2,
              fill: theme.palette.background.paper
            }}
          />
          
          {/* Área de fundo para ROAS */}
          <Area 
            type="monotone" 
            dataKey="roas" 
            stroke="none" 
            fillOpacity={0.1} 
            fill="url(#colorRoas)" 
          />
          
          {/* Linha principal para ROAS */}
          <Line 
            type="monotone" 
            dataKey="roas" 
            stroke={colors.roas} 
            strokeWidth={2}
            dot={{ r: 4, fill: colors.roas }}
            activeDot={{ 
              r: 6, 
              stroke: colors.roas,
              strokeWidth: 2,
              fill: theme.palette.background.paper
            }}
          />
          
          {/* Linha para Conversões */}
          <Line 
            type="monotone" 
            dataKey="conversions" 
            stroke={colors.conversions} 
            strokeWidth={2}
            dot={{ r: 4, fill: colors.conversions }}
            activeDot={{ 
              r: 6, 
              stroke: colors.conversions,
              strokeWidth: 2,
              fill: theme.palette.background.paper
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </GlassChartContainer>
  );
};

export default PerformanceLineChart;