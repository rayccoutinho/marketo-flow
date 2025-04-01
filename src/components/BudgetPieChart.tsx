import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTheme, Box } from '@mui/material'; // Adicionado Box aqui
import { styled } from '@mui/material/styles';

// Tipos
interface BudgetData {
  name: string;
  value: number;
  color: string;
}

interface BudgetPieChartProps {
  data: BudgetData[];
}

// Componente estilizado para o container do gráfico
const ChartContainer = styled('div')(({ theme }) => ({ // Alterado para 'div' nativo
  width: '100%',
  height: '100%',
  '& .recharts-legend-item-text': {
    color: theme.palette.text.secondary,
    fontSize: '0.75rem'
  },
  '& .recharts-tooltip-label': {
    color: theme.palette.text.primary,
    fontWeight: 500,
    marginBottom: theme.spacing(1)
  },
  '& .recharts-default-tooltip': {
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    border: 'none',
    backgroundColor: `${theme.palette.background.paper} !important`,
    padding: `${theme.spacing(1.5)} !important`
  }
}));

const BudgetPieChart: React.FC<BudgetPieChartProps> = ({ data }) => {
  const theme = useTheme();

  // Cores padrão baseadas no tema
  const defaultColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main
  ];

  // Mescla cores fornecidas com padrão
  const chartData = data.map((item, index) => ({
    ...item,
    color: item.color || defaultColors[index % defaultColors.length]
  }));

  return (
    <Box sx={{ width: '100%', height: '100%' }}> {/* Usando Box aqui */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                stroke={theme.palette.background.paper}
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Valor']}
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              border: 'none',
              borderRadius: theme.shape.borderRadius,
              boxShadow: theme.shadows[2]
            }}
            itemStyle={{
              color: theme.palette.text.primary
            }}
          />
          <Legend 
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{
              paddingTop: theme.spacing(2)
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BudgetPieChart;