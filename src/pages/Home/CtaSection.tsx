import React from 'react';
import { Box, Container, Typography, Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const CtaSection: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #3a7bd5, #00d2ff)',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Container maxWidth="md" sx={{ py: 10, textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography variant="h3" fontWeight={800} gutterBottom>
            Pronto para transformar seu marketing?
          </Typography>
          <Typography variant="h6" sx={{ mb: 5, opacity: 0.9 }}>
            Comece hoje mesmo e veja resultados em poucas semanas.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 2,
                borderRadius: 50,
                fontWeight: 600,
                background: '#fff',
                color: theme.palette.primary.main,
                '&:hover': {
                  background: 'rgba(255,255,255,0.9)'
                }
              }}
            >
              Começar Teste Gratuito
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 6,
                py: 2,
                borderRadius: 50,
                fontWeight: 600,
                color: '#fff',
                borderColor: '#fff',
                '&:hover': {
                  background: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Falar com Especialista
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default CtaSection;