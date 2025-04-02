import React from 'react';
import { Box, useTheme, styled } from '@mui/material';
import HeroSection from './HeroSection';
import ValueProposition from './ValueProposition';
import ProductShowcase from './ProductShowcase';
import Testimonials from './Testimonials';
import CtaSection from './CtaSection';

const HomeContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  overflowX: 'hidden',
  '& section': {
    padding: theme.spacing(15, 0),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(10, 0)
    }
  }
}));

const HomePage: React.FC = () => {
  return (
    <HomeContainer>
      {/* Hero com vídeo background e CTA principal */}
      <HeroSection />
      
      {/* Diferenciais com ícones animados */}
      <ValueProposition />
      
      {/* Demonstração interativa do produto */}
      <ProductShowcase />
      
      {/* Depoimentos reais com fotos */}
      <Testimonials />
      
      {/* Seção final de conversão */}
      <CtaSection />
    </HomeContainer>
  );
};

export default HomePage;