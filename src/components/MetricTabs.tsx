import React, { useState } from 'react';
import { 
  Box,
  Button,
  Divider,
  Paper,
  Typography,
  styled,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';

interface MetricTab {
  id: string;
  label: string;
  component: React.ReactNode;
  icon?: React.ReactNode;
}

const GlassCard = styled(Paper)(({ theme }) => ({
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  overflow: 'hidden'
}));

const TabButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.875rem',
  padding: theme.spacing(1.5, 3),
  borderRadius: 0,
  color: theme.palette.text.secondary,
  position: 'relative',
  '&:hover': {
    backgroundColor: 'transparent'
  },
  '&.active': {
    color: theme.palette.primary.main,
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 2,
      backgroundColor: theme.palette.primary.main
    }
  }
}));

export const MetricTabs = ({ tabs }: { tabs: MetricTab[] }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(tabs.length > 0 ? tabs[0].id : '');

  if (tabs.length === 0) {
    return (
      <GlassCard>
        <Box p={4}>
          <Typography color="text.secondary">No tabs available</Typography>
        </Box>
      </GlassCard>
    );
  }

  return (
    <GlassCard>
      <Box 
        sx={{ 
          display: 'flex',
          borderBottom: '1px solid',
          borderColor: 'divider',
          px: 2
        }}
      >
        {tabs.map((tab) => (
          <motion.div 
            key={tab.id}
            whileTap={{ scale: 0.98 }}
          >
            <TabButton
              onClick={() => setActiveTab(tab.id)}
              className={activeTab === tab.id ? 'active' : ''}
              startIcon={tab.icon}
              sx={{
                '&.active': {
                  color: theme.palette.primary.main,
                }
              }}
            >
              {tab.label}
            </TabButton>
          </motion.div>
        ))}
      </Box>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Box sx={{ p: 3 }}>
          {tabs.find((tab) => tab.id === activeTab)?.component || (
            <Typography color="text.secondary">
              No content available for this tab
            </Typography>
          )}
        </Box>
      </motion.div>
    </GlassCard>
  );
};