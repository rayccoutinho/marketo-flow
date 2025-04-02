import React from 'react';
import { Box, Container, Typography, Avatar, Grid, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Carlos Silva",
    role: "Diretor de Marketing, TechCorp",
    content: "O Marketo Flow revolucionou nossa forma de criar campanhas. A automação inteligente nos poupou 20 horas semanais.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Ana Oliveira",
    role: "Gerente de Mídia, BrandUp",
    content: "Os insights em tempo real nos permitiram aumentar nosso ROI em 35% no último trimestre.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  }
];

const Testimonials: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 10, background: theme.palette.background.default }}>
      <Container maxWidth="md">
        <Typography variant="h3" align="center" sx={{ mb: 6, fontWeight: 700 }}>
          O que nossos clientes dizem
        </Typography>
        
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={6} key={index}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Box sx={{
                  p: 4,
                  borderRadius: 3,
                  background: theme.palette.background.paper,
                  height: '100%'
                }}>
                  <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>
                    "{testimonial.content}"
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      src={testimonial.avatar} 
                      sx={{ width: 56, height: 56, mr: 2 }} 
                    />
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;