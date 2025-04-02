import React from 'react';
import { Box, Typography, Button, Container, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{
      position: 'relative',
      height: '100vh',
      minHeight: 800,
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.default,
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%)',
        zIndex: 1
      }
    }}>
      {/* Background minimalista */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.dark} 100%)`,
        opacity: 0.05
      }} />

      <Container sx={{ 
        position: 'relative', 
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: '4rem',
              fontWeight: 700,
              lineHeight: 1.1,
              mb: 3,
              letterSpacing: '-0.02em',
              [theme.breakpoints.down('md')]: {
                fontSize: '2.5rem'
              }
            }}
          >
            Marketing Automation<br />para Resultados Extraordinários
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              mb: 5,
              fontWeight: 400,
              maxWidth: 700,
              margin: '0 auto',
              color: theme.palette.text.secondary
            }}
          >
            A plataforma completa que conecta estratégia, execução e análise em um fluxo contínuo
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 1,
                fontSize: '1rem',
                fontWeight: 500,
                textTransform: 'none',
                letterSpacing: '0.02em'
              }}
            >
              Iniciar teste gratuito
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 1,
                fontSize: '1rem',
                fontWeight: 500,
                textTransform: 'none',
                letterSpacing: '0.02em'
              }}
            >
              Ver demonstração →
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HeroSection;