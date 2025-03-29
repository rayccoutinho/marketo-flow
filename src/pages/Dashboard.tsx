import { Box, Typography, Paper } from '@mui/material';

export default function Dashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Painel de Controle
      </Typography>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Métricas Principais</Typography>
        {/* Adicione gráficos ou métricas aqui */}
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Últimas Campanhas</Typography>
        {/* Adicione tabela de campanhas aqui */}
      </Paper>
    </Box>
  );
}