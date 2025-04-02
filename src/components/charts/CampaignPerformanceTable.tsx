import React from 'react';
import { 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Chip,
  Avatar,
  LinearProgress,
  useTheme,
  Typography // Importação adicionada aqui
} from '@mui/material';
import { 
  Campaign as CampaignIcon,
  Email,
  Facebook,
  Google,
  LinkedIn,
  Twitter
} from '@mui/icons-material';

const CampaignPerformanceTable = () => {
  const theme = useTheme();

  const campaigns = [
    {
      id: 1,
      name: 'Black Friday 2023',
      channel: 'Email',
      progress: 75,
      budget: 25000,
      spent: 18750,
      status: 'active'
    },
    {
      id: 2,
      name: 'Natal 2023',
      channel: 'Redes Sociais',
      progress: 58,
      budget: 18000,
      spent: 10440,
      status: 'active'
    },
    {
      id: 3,
      name: 'Anúncio Verão',
      channel: 'Google Ads',
      progress: 82,
      budget: 15000,
      spent: 12300,
      status: 'active'
    },
    {
      id: 4,
      name: 'Webinar Q1',
      channel: 'LinkedIn',
      progress: 90,
      budget: 8000,
      spent: 7200,
      status: 'completed'
    }
  ];

  const getChannelIcon = (channel: string) => {
    switch(channel) {
      case 'Email': return <Email />;
      case 'Redes Sociais': return <Facebook />;
      case 'Google Ads': return <Google />;
      case 'LinkedIn': return <LinkedIn />;
      case 'Twitter': return <Twitter />;
      default: return <CampaignIcon />;
    }
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: '12px' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ 
            '& .MuiTableCell-root': { 
              fontWeight: 600,
              color: theme.palette.text.secondary,
              backgroundColor: theme.palette.background.default
            }
          }}>
            <TableCell>Campanha</TableCell>
            <TableCell>Canal</TableCell>
            <TableCell>Progresso</TableCell>
            <TableCell>Orçamento</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
                    <CampaignIcon sx={{ color: theme.palette.primary.main }} />
                  </Avatar>
                  <Typography fontWeight={500}>{campaign.name}</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Chip
                  avatar={<Avatar sx={{ bgcolor: 'transparent' }}>{getChannelIcon(campaign.channel)}</Avatar>}
                  label={campaign.channel}
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={campaign.progress}
                    sx={{
                      height: 8,
                      width: '100%',
                      borderRadius: 4,
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        backgroundColor: 
                          campaign.progress < 30 ? theme.palette.error.main :
                          campaign.progress < 70 ? theme.palette.warning.main :
                          theme.palette.success.main
                      }
                    }}
                  />
                  <Typography variant="body2" fontWeight={500}>
                    {campaign.progress}%
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography>R$ {campaign.budget.toLocaleString('pt-BR')}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Gasto: R$ {campaign.spent.toLocaleString('pt-BR')}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={campaign.status === 'active' ? 'Ativa' : 'Concluída'}
                  size="small"
                  sx={{
                    backgroundColor: 
                      campaign.status === 'active' 
                        ? theme.palette.success.light 
                        : theme.palette.grey[300],
                    color: 
                      campaign.status === 'active' 
                        ? theme.palette.success.dark 
                        : theme.palette.grey[700]
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CampaignPerformanceTable;