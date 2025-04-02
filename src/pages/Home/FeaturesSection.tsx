import React from 'react';
import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const features = [
  {
    title: "Briefing Inteligente",
    description: "Gera sugestões de estratégia com base em KPIs históricos",
    icon: "📊"
  },
  {
    title: "Orquestração Automatizada",
    description: "Conecta planejamento → execução → análise em um único fluxo",
    icon: "🤖"
  },
  {
    title: "Otimização em Tempo Real",
    description: "Sugere ajustes com IA baseados no desempenho das campanhas",
    icon: "⚡"
  }
];

const FeaturesSection: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 10, background: theme.palette.background.paper }}>
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" sx={{ mb: 6, fontWeight: 700 }}>
          Diferenciais Marketo Flow
        </Typography>
        
        <Grid container spacing={6}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Box sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 3,
                  background: theme.palette.background.default,
                  textAlign: 'center'
                }}>
                  <Typography variant="h2" sx={{ mb: 2 }}>
                    {feature.icon}
                  </Typography>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
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

export default FeaturesSection;