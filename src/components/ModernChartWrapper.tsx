import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';

interface ModernChartWrapperProps {
  title: string;
  children: React.ReactNode;
  height?: number | string;
}

const ModernChartWrapper = ({ title, children, height = 340 }: ModernChartWrapperProps) => {
  const theme = useTheme();

  return (
    <Box sx={{
      height,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.background.paper,
      borderRadius: '16px',
      boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.05)',
      border: '1px solid rgba(0, 0, 0, 0.03)',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 1rem 2rem rgba(0, 0, 0, 0.1)'
      }
    }}>
      <Box sx={{
        px: 3,
        py: 2.5,
        borderBottom: '1px solid rgba(0, 0, 0, 0.03)',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Box sx={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: theme.palette.primary.main,
          mr: 1.5
        }} />
        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>
      </Box>
      <Box sx={{
        flex: 1,
        p: 3,
        pt: 2,
        position: 'relative'
      }}>
        {children}
      </Box>
    </Box>
  );
};

export default ModernChartWrapper;