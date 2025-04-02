import React from 'react';
import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const features = [
  {
    title: "Briefing Inteligente",
    description: "Sistema que transforma objetivos em estratégias mensuráveis automaticamente",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Orquestração Automatizada",
    description: "Integração perfeita entre planejamento e execução em todas as plataformas",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Otimização em Tempo Real",
    description: "Algoritmos que ajustam automaticamente as campanhas para máximo desempenho",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
];

const ValueProposition: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 15, backgroundColor: theme.palette.background.paper }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={10}>
          <Typography variant="overline" sx={{ 
            letterSpacing: '0.1em',
            color: theme.palette.primary.main,
            fontWeight: 500,
            mb: 2,
            display: 'block'
          }}>
            DIFERENCIAIS
          </Typography>
          <Typography variant="h3" sx={{ 
            fontWeight: 600,
            letterSpacing: '-0.01em'
          }}>
            Performance de nível empresarial
          </Typography>
        </Box>

        <Grid container spacing={8}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  height: '100%'
                }}>
                  <Box sx={{ 
                    width: 80,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 4,
                    color: theme.palette.primary.main
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" sx={{ 
                    fontWeight: 600,
                    mb: 2,
                    letterSpacing: '-0.01em'
                  }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: theme.palette.text.secondary,
                    lineHeight: 1.6
                  }}>
                    {feature.description}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ValueProposition;