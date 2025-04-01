import React from 'react';
import { 
  Paper, 
  Stack, 
  Typography, 
  useTheme,
  styled,
  Box,
  Chip
} from '@mui/material';
import { motion } from 'framer-motion';

interface MetricCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  color: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
}

const GlassCard = styled(Paper)(({ theme }) => ({
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  position: 'relative',
  '&:hover': {
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transform: 'translateY(-2px)'
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: 'currentColor',
    opacity: 0.2
  }
}));

export default function MetricCard({ 
  icon: Icon, 
  title, 
  value, 
  color,
  change,
  trend
}: MetricCardProps) {
  const theme = useTheme();
  
  return (
    <motion.div whileHover={{ y: -4 }}>
      <GlassCard sx={{ 
        color: theme.palette[color].main,
        '&:hover': {
          boxShadow: `0 8px 24px ${theme.palette[color].main}20`
        }
      }}>
        <Box sx={{ p: 3 }}>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
            <Box>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
                <Box sx={{
                  p: 1.25,
                  borderRadius: 2,
                  backgroundColor: `${theme.palette[color].main}10`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon sx={{ 
                    fontSize: 20,
                    color: theme.palette[color].main
                  }} />
                </Box>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    color: 'text.secondary',
                    fontWeight: 500,
                    letterSpacing: '0.025em'
                  }}
                >
                  {title}
                </Typography>
              </Stack>
              
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  color: 'text.primary',
                  lineHeight: 1.2,
                  mb: 0.5
                }}
              >
                {value}
              </Typography>
            </Box>
            
            {change !== undefined && trend && (
              <Chip
                label={`${trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} ${change}%`}
                size="small"
                sx={{
                  backgroundColor: trend === 'up' ? 'rgba(16, 185, 129, 0.1)' : 
                                    trend === 'down' ? 'rgba(239, 68, 68, 0.1)' : 
                                    'rgba(156, 163, 175, 0.1)',
                  color: trend === 'up' ? 'success.main' : 
                         trend === 'down' ? 'error.main' : 
                         'text.secondary',
                  fontWeight: 600,
                  height: 24
                }}
              />
            )}
          </Stack>
        </Box>
      </GlassCard>
    </motion.div>
  );
}