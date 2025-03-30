import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Divider, 
  Chip,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Avatar,
  Badge,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  FiFileText,
  FiImage,
  FiVideo,
  FiCheckCircle,
  FiEdit2,
  FiClock,
  FiUser,
  FiPlus,
  FiSearch,
  FiFilter,
  FiDownload,
  FiMoreVertical
} from 'react-icons/fi';
import { marketingTheme } from '../theme';

const contentTypes = [
  { id: 1, name: 'Posts para Instagram', icon: <FiImage />, color: '#EC4899' },
  { id: 2, name: 'Artigos para Blog', icon: <FiFileText />, color: '#3B82F6' },
  { id: 3, name: 'Vídeos para YouTube', icon: <FiVideo />, color: '#EF4444' },
  { id: 4, name: 'Newsletters', icon: <FiMail />, color: '#10B981' },
];

const statusSteps = ['Planejado', 'Em Produção', 'Revisão', 'Publicado'];

const teamMembers = [
  { id: 1, name: 'Ana Silva', role: 'Designer', avatar: 'A' },
  { id: 2, name: 'Carlos Souza', role: 'Redator', avatar: 'C' },
  { id: 3, name: 'Mariana Costa', role: 'Editora', avatar: 'M' },
];

const contentItems = [
  {
    id: 1,
    title: 'Post Institucional - Doações',
    type: 1,
    campaign: 'Casas André Luiz',
    assignedTo: 1,
    deadline: '2024-04-15',
    status: 1,
    progress: 30
  },
  // ... outros itens de conteúdo
];

export default function ContentProgress() {
  const [activeTab, setActiveTab] = useState('all');
  const [activeStep, setActiveStep] = useState(0);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Box sx={{ p: 3 }}>
      {/* Cabeçalho */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold">Acompanhamento de Conteúdo</Typography>
          <Typography variant="body2" color="text.secondary">
            Controle de produção e publicação de materiais
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Button 
            variant="contained" 
            startIcon={<FiPlus />}
            sx={{
              background: 'linear-gradient(135deg, #6366F1, #8B5CF6)'
            }}
          >
            Novo Conteúdo
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<FiDownload />}
          >
            Exportar
          </Button>
        </Box>
      </Box>

      {/* Filtros e Busca */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              placeholder="Buscar conteúdo..."
              InputProps={{
                startAdornment: <FiSearch style={{ marginRight: 8, color: marketingTheme.palette.text.secondary }} />
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Tipo de Conteúdo</InputLabel>
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                label="Tipo de Conteúdo"
              >
                <MenuItem value="all">Todos</MenuItem>
                {contentTypes.map(type => (
                  <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                label="Status"
              >
                <MenuItem value="all">Todos</MenuItem>
                {statusSteps.map((step, index) => (
                  <MenuItem key={index} value={index}>{step}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Estatísticas Rápidas */}
      <Grid container spacing={3} mb={4}>
        {contentTypes.map(type => (
          <Grid item xs={12} sm={6} md={3} key={type.id}>
            <Paper sx={{ p: 3, borderLeft: `4px solid ${type.color}` }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Box sx={{ color: type.color }}>{type.icon}</Box>
                <Box>
                  <Typography variant="subtitle2">{type.name}</Typography>
                  <Typography variant="h5">24</Typography>
                  <Typography variant="caption" color="text.secondary">+12% no mês</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Barra de Progresso Geral */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>Progresso Geral de Conteúdo</Typography>
        <Stepper alternativeLabel activeStep={1} sx={{ mb: 3 }}>
          {statusSteps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="body2">12 concluídos</Typography>
          <Typography variant="body2">8 em andamento</Typography>
          <Typography variant="body2">4 pendentes</Typography>
        </Box>
        <Box width="100%" height={8} bgcolor="#1F2937" borderRadius={4}>
          <Box width="60%" height={8} bgcolor="#6366F1" borderRadius={4} />
        </Box>
      </Paper>

      {/* Lista de Conteúdos */}
      <Paper sx={{ p: 3 }}>
        <Tabs 
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{ mb: 3 }}
        >
          <Tab label="Todos" value="all" />
          <Tab label="Planejados" value="0" icon={<FiClock size={16} />} iconPosition="start" />
          <Tab label="Em Produção" value="1" icon={<FiEdit2 size={16} />} iconPosition="start" />
          <Tab label="Em Revisão" value="2" icon={<FiCheckCircle size={16} />} iconPosition="start" />
          <Tab label="Publicados" value="3" icon={<FiCheckCircle size={16} />} iconPosition="start" />
        </Tabs>

        <List>
          {contentItems
            .filter(item => 
              (activeTab === 'all' || item.status === parseInt(activeTab)) &&
              (filter === 'all' || item.type === parseInt(filter)) &&
              item.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(item => {
              const contentType = contentTypes.find(t => t.id === item.type);
              const assignedMember = teamMembers.find(m => m.id === item.assignedTo);

              return (
                <ListItem 
                  key={item.id}
                  secondaryAction={
                    <IconButton edge="end">
                      <FiMoreVertical />
                    </IconButton>
                  }
                  sx={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.04)' }
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: contentType?.color }}>
                      {contentType?.icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.title}
                    secondary={
                      <>
                        <Box component="span" display="block">{item.campaign}</Box>
                        <Box component="span" display="block" mt={0.5}>
                          <Chip 
                            label={statusSteps[item.status]} 
                            size="small" 
                            sx={{ 
                              backgroundColor: 
                                item.status === 0 ? '#F59E0B20' :
                                item.status === 1 ? '#3B82F620' :
                                item.status === 2 ? '#8B5CF620' : '#10B98120',
                              color: 
                                item.status === 0 ? '#F59E0B' :
                                item.status === 1 ? '#3B82F6' :
                                item.status === 2 ? '#8B5CF6' : '#10B981'
                            }}
                          />
                        </Box>
                      </>
                    }
                  />
                  <Box display="flex" alignItems="center" gap={3} mr={4}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>
                        {assignedMember?.avatar}
                      </Avatar>
                      <Typography variant="body2">{assignedMember?.name}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(item.deadline).toLocaleDateString('pt-BR')}
                    </Typography>
                    <Box width={100}>
                      <Box display="flex" justifyContent="space-between" mb={0.5}>
                        <Typography variant="caption">{item.progress}%</Typography>
                      </Box>
                      <Box width="100%" height={6} bgcolor="#1F2937" borderRadius={3}>
                        <Box 
                          width={`${item.progress}%`} 
                          height={6} 
                          bgcolor={contentType?.color} 
                          borderRadius={3}
                        />
                      </Box>
                    </Box>
                  </Box>
                </ListItem>
              );
            })}
        </List>
      </Paper>

      {/* Equipe e Atribuições */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" fontWeight="bold" mb={3}>Equipe e Atribuições</Typography>
        <Grid container spacing={3}>
          {teamMembers.map(member => {
            const assignedItems = contentItems.filter(item => item.assignedTo === member.id);
            const completedItems = assignedItems.filter(item => item.status === 3).length;

            return (
              <Grid item xs={12} sm={6} md={4} key={member.id}>
                <Paper sx={{ p: 2 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar>{member.avatar}</Avatar>
                    <Box>
                      <Typography fontWeight="medium">{member.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{member.role}</Typography>
                    </Box>
                  </Box>
                  <Box mb={2}>
                    <Typography variant="body2" mb={1}>
                      {completedItems}/{assignedItems.length} tarefas concluídas
                    </Typography>
                    <Box width="100%" height={6} bgcolor="#1F2937" borderRadius={3}>
                      <Box 
                        width={`${(completedItems / assignedItems.length) * 100}%`} 
                        height={6} 
                        bgcolor="#6366F1" 
                        borderRadius={3}
                      />
                    </Box>
                  </Box>
                  <List dense>
                    {assignedItems.slice(0, 3).map(item => (
                      <ListItem 
                        key={item.id}
                        sx={{ py: 0.5 }}
                        secondaryAction={
                          <Checkbox 
                            edge="end"
                            checked={item.status === 3}
                            color="primary"
                          />
                        }
                      >
                        <ListItemText
                          primary={item.title}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                    {assignedItems.length > 3 && (
                      <Typography variant="body2" color="primary" textAlign="center" mt={1}>
                        +{assignedItems.length - 3} mais
                      </Typography>
                    )}
                  </List>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Box>
  );
}