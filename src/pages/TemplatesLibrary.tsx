import React, { useState } from 'react';
import { 
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
  styled,
  useTheme
} from '@mui/material';
import {
  Search as SearchIcon,
  GridView as GridIcon,
  ViewList as ListIcon,
  Download as DownloadIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Componentes estilizados
const GlassCard = styled(Box)(({ theme }) => ({
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  overflow: 'hidden'
}));

const TemplateCard = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  border: '1px solid rgba(0, 0, 0, 0.05)',
  borderRadius: '12px',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)'
  }
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  fontWeight: 500,
  letterSpacing: '0.01em',
  borderRadius: '8px',
  padding: theme.spacing(1.5, 3),
  textTransform: 'none',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
}));

const TemplatesLibrary = () => {
  const theme = useTheme();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const templates = [
    {
      id: 1,
      name: 'E-commerce - Black Friday',
      description: 'Fluxo completo para promoções de e-commerce',
      category: 'Vendas',
      lastUsed: '15/11/2023'
    },
    {
      id: 2,
      name: 'Onboarding SaaS',
      description: 'Sequência de emails para ativação de usuários',
      category: 'Engajamento',
      lastUsed: '02/11/2023'
    },
    {
      id: 3,
      name: 'Geração de Leads B2B',
      description: 'Campanha para captação de leads qualificados',
      category: 'Captação',
      lastUsed: '25/10/2023'
    },
    {
      id: 4,
      name: 'Reengajamento',
      description: 'Recuperação de clientes inativos',
      category: 'Retenção',
      lastUsed: '10/10/2023'
    }
  ];

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newViewMode: 'grid' | 'list',
  ) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 },
      minHeight: '100vh',
      background: `
        radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.05) 0%, transparent 25%),
        radial-gradient(circle at 90% 80%, rgba(124, 58, 237, 0.05) 0%, transparent 25%)
      `
    }}>
      <Box 
        sx={{ 
          mb: 4,
          maxWidth: '800px'
        }}
      >
        <Typography 
          variant="h3" 
          fontWeight={600} 
          gutterBottom
          sx={{ 
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            lineHeight: 1.2
          }}
        >
          Biblioteca de Templates
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
          Modelos prontos para otimizar suas campanhas de marketing
        </Typography>
      </Box>

      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mb={3}
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={2}
      >
        <PrimaryButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {/* Lógica para novo template */}}
        >
          Criar Template
        </PrimaryButton>
        
        <Box display="flex" gap={2} width={{ xs: '100%', sm: 'auto' }}>
          <TextField
            placeholder="Buscar templates..."
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              sx: {
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                width: { xs: '100%', md: 320 }
              }
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewModeChange}
            aria-label="view mode"
            size="small"
          >
            <ToggleButton value="grid" aria-label="grid view">
              <GridIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              <ListIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      <GlassCard>
        <Box p={3}>
          {viewMode === 'grid' ? (
            <Grid container spacing={3}>
              {filteredTemplates.map((template) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={template.id}>
                  <motion.div
                    whileHover={{ y: -4 }}
                  >
                    <TemplateCard>
                      <Box 
                        p={2.5}
                        sx={{ 
                          backgroundColor: 'rgba(37, 99, 235, 0.05)',
                          borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                          {template.name}
                        </Typography>
                        <Chip
                          label={template.category}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(37, 99, 235, 0.1)',
                            color: 'primary.main'
                          }}
                        />
                      </Box>
                      <Box p={2.5} flexGrow={1}>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                          {template.description}
                        </Typography>
                      </Box>
                      <Box 
                        p={2}
                        display="flex" 
                        justifyContent="space-between" 
                        alignItems="center"
                        sx={{ 
                          backgroundColor: 'rgba(0, 0, 0, 0.02)',
                          borderTop: '1px solid rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          Último uso: {template.lastUsed}
                        </Typography>
                        <Button
                          size="small"
                          startIcon={<DownloadIcon fontSize="small" />}
                          sx={{ 
                            textTransform: 'none',
                            color: 'primary.main'
                          }}
                        >
                          Usar
                        </Button>
                      </Box>
                    </TemplateCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ 
                    '& .MuiTableCell-root': { 
                      color: 'text.secondary',
                      fontWeight: 600,
                      borderBottomColor: 'divider',
                      backgroundColor: 'rgba(255, 255, 255, 0.5)'
                    } 
                  }}>
                    <TableCell>Nome</TableCell>
                    <TableCell>Descrição</TableCell>
                    <TableCell>Categoria</TableCell>
                    <TableCell>Último Uso</TableCell>
                    <TableCell align="right">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTemplates.map((template) => (
                    <TableRow 
                      key={template.id} 
                      hover 
                      sx={{ 
                        '&:last-child td': { borderBottom: 0 },
                        '& .MuiTableCell-root': { 
                          borderBottomColor: 'divider',
                          backgroundColor: 'rgba(255, 255, 255, 0.7)'
                        }
                      }}
                    >
                      <TableCell>
                        <Typography fontWeight={500}>{template.name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {template.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={template.category}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(37, 99, 235, 0.1)',
                            color: 'primary.main'
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {template.lastUsed}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          size="small"
                          startIcon={<DownloadIcon fontSize="small" />}
                          sx={{ 
                            textTransform: 'none',
                            color: 'primary.main'
                          }}
                        >
                          Usar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </GlassCard>
    </Box>
  );
};

export default TemplatesLibrary;