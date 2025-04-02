import React from 'react';
import { Box, Container, Typography, Button, Grid, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const ProductShowcase: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ background: theme.palette.grey[100] }}>
      <Container maxWidth="lg">
        <Grid container alignItems="center" spacing={6}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Typography variant="h3" fontWeight={800} gutterBottom>
                Visualize seu marketing decolar
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Nosso dashboard intuitivo mostra exatamente o desempenho de suas campanhas em tempo real.
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  px: 5,
                  py: 1.5,
                  borderRadius: 50,
                  fontWeight: 600,
                  mt: 3
                }}
              >
                Ver Demonstração
              </Button>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Box
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: theme.shadows[10],
                  position: 'relative',
                  paddingTop: '56.25%', // 16:9
                  background: '#fff'
                }}
              >
                {/* Placeholder para imagem/vídeo do produto */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #6e8efb, #a777e3)'
                  }}
                >
                  <Typography variant="h4" color="#fff">
                    Dashboard Marketo Flow
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductShowcase;