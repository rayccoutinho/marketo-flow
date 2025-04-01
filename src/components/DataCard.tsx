import React from 'react';
import { 
  Card, 
  Typography, 
  Chip, 
  Box,
  SvgIcon,
  styled,
  useTheme 
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
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
  transition: 'all 0.3s ease',
  background: theme.palette.background.paper,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)'
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
  }
}));

const DataCard: React.FC<DataCardProps> = ({ 
  title, 
  value, 
  change, 
  icon,
  variant = 'default'
}) => {
  const theme = useTheme();
  const isPositive = change >= 0;

  return (
    <GradientCard 
      sx={{
        p: 3,
        height: '100%',
        ...(variant === 'accent' && {
          background: `linear-gradient(135deg, rgba(37, 99, 235, 0.05), rgba(124, 58, 237, 0.05))`,
          border: '1px solid rgba(37, 99, 235, 0.1)'
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
              letterSpacing: '0.5px',
              fontSize: '0.75rem',
              lineHeight: 1.5
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
                ? `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})` 
                : 'none',
              WebkitBackgroundClip: variant === 'accent' ? 'text' : 'initial',
              WebkitTextFillColor: variant === 'accent' ? 'transparent' : 'initial',
              color: variant === 'accent' ? 'primary' : 'text.primary',
              fontSize: '1.75rem'
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
              bgcolor: 'rgba(37, 99, 235, 0.1)',
              color: 'primary.main',
              lineHeight: 0
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
            fontSize: '0.75rem',
            '.MuiChip-icon': {
              marginRight: '4px',
              marginLeft: 0
            }
          }}
        />
        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{ ml: 1, fontSize: '0.75rem' }}
        >
          vs período anterior
        </Typography>
      </Box>
    </GradientCard>
  );
};

export default DataCard;