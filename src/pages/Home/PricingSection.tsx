import React from 'react';
import { Box, Container, Grid, Typography, Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const plans = [
  {
    name: "Starter",
    price: "R$ 299",
    period: "/mês",
    description: "Ideal para pequenas equipes",
    features: [
      "5 campanhas ativas",
      "Automação básica",
      "Relatórios essenciais",
      "Suporte por e-mail"
    ],
    cta: "Começar Teste"
  },
  {
    name: "Professional",
    price: "R$ 799",
    period: "/mês",
    description: "Para equipes de marketing em crescimento",
    features: [
      "20 campanhas ativas",
      "Automação avançada",
      "Relatórios personalizados",
      "Suporte prioritário",
      "Integrações API"
    ],
    cta: "Assinar Agora",
    featured: true
  }
];

const PricingSection: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 10, background: theme.palette.background.paper }}>
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" sx={{ mb: 6, fontWeight: 700 }}>
          Planos Simples e Transparentes
        </Typography>
        
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {plans.map((plan, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Box sx={{
                  p: 4,
                  borderRadius: 3,
                  background: theme.palette.background.default,
                  border: plan.featured ? `2px solid ${theme.palette.primary.main}` : 'none',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {plan.featured && (
                    <Box sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      px: 2,
                      py: 1,
                      bgcolor: 'primary.main',
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 600,
                      borderBottomLeftRadius: 8
                    }}>
                      POPULAR
                    </Box>
                  )}
                  
                  <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
                    {plan.name}
                  </Typography>
                  <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
                    {plan.price}
                    <Typography component="span" variant="body1" color="text.secondary">
                      {plan.period}
                    </Typography>
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {plan.description}
                  </Typography>
                  
                  <Box sx={{ mb: 4 }}>
                    {plan.features.map((feature, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <Box sx={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2
                        }}>
                          ✓
                        </Box>
                        <Typography variant="body1">{feature}</Typography>
                      </Box>
                    ))}
                  </Box>
                  
                  <Button
                    variant={plan.featured ? "contained" : "outlined"}
                    fullWidth
                    size="large"
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600
                    }}
                  >
                    {plan.cta}
                  </Button>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default PricingSection;