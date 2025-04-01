import React from 'react';
import { 
  Card, 
  Typography, 
  Chip, 
  Box,
  SvgIcon,
  styled 
} from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

interface DataCardProps {
  title: string;
  value: string | number;
  change: number;
  icon?: React.ReactNode;
  variant?: 'default' | 'accent';
}

const GradientCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  border: 'none',
  borderRadius: '16px',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  background: theme.palette.background.paper,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #6366F1, #8B5CF6)'
  }
}));

const DataCard: React.FC<DataCardProps> = ({ 
  title, 
  value, 
  change, 
  icon,
  variant = 'default'
}) => {
  const isPositive = change >= 0;

  return (
    <GradientCard 
      sx={{
        p: 3,
        height: '100%',
        ...(variant === 'accent' && {
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
          border: '1px solid rgba(99, 102, 241, 0.2)'
        })
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography 
            variant="overline" 
            color="text.secondary"
            sx={{ 
              display: 'block',
              mb: 1,
              fontWeight: 600,
              letterSpacing: '0.5px'
            }}
          >
            {title}
          </Typography>
          
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              lineHeight: 1.2,
              background: variant === 'accent' 
                ? 'linear-gradient(90deg, #6366F1, #8B5CF6)' 
                : 'none',
              WebkitBackgroundClip: variant === 'accent' ? 'text' : 'initial',
              WebkitTextFillColor: variant === 'accent' ? 'transparent' : 'initial',
              color: variant === 'accent' ? 'primary' : 'text.primary'
            }}
          >
            {value}
          </Typography>
        </Box>
        
        {icon && (
          <Box
            sx={{
              p: 1.5,
              borderRadius: '12px',
              bgcolor: 'rgba(99, 102, 241, 0.1)',
              color: 'primary.main'
            }}
          >
            {icon}
          </Box>
        )}
      </Box>
      
      <Box display="flex" alignItems="center" mt={2}>
        <Chip 
          icon={
            <SvgIcon 
              component={isPositive ? TrendingUp : TrendingDown} 
              fontSize="small"
              color={isPositive ? 'success' : 'error'}
            />
          }
          label={`${isPositive ? '+' : ''}${change}%`}
          sx={{
            pl: 1,
            backgroundColor: isPositive 
              ? 'rgba(16, 185, 129, 0.1)' 
              : 'rgba(239, 68, 68, 0.1)',
            color: isPositive ? 'success.main' : 'error.main',
            fontWeight: 600,
            '.MuiChip-icon': {
              marginRight: '4px'
            }
          }}
        />
        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{ ml: 1 }}
        >
          vs período anterior
        </Typography>
      </Box>
    </GradientCard>
  );
};

export default DataCard;