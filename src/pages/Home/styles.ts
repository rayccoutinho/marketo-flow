// src/pages/Home/styles.ts
import { Theme } from '@mui/material/styles';

export const heroStyles = {
  root: {
    minHeight: '90vh',
    display: 'flex',
    alignItems: 'center',
    background: 'linear-gradient(to bottom, #000000, #1a1a1a)',
    color: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '200px',
      background: 'linear-gradient(to bottom, transparent, #121212)'
    }
  }
};

// Adicione mais estilos conforme necessário
export {};