import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider,
  Toolbar,
  CssBaseline,
  ListSubheader,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  useTheme,
  AppBar,
  IconButton,
  Container,
  styled
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Campaign as CampaignIcon,
  ExitToApp as LogoutIcon,
  AccountCircle as AccountIcon,
  Settings as SettingsIcon,
  Assessment as ReportsIcon,
  Widgets as TemplatesIcon,
  Link as IntegrationsIcon,
  List as ListIcon,
  Insights as InsightsIcon,
  History as HistoryIcon,
  Notifications as AlertsIcon,
  Menu as MenuIcon
} from '@mui/icons-material';

const drawerWidth = 280;

const GlassAppBar = styled(AppBar)(({ theme }) => ({
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  color: theme.palette.text.primary,
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
  [theme.breakpoints.up('sm')]: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
  },
}));

const GlassSidebar = styled(Box)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  [theme.breakpoints.up('sm')]: {
    position: 'fixed',
    height: '100vh',
  },
}));

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  minHeight: '100vh',
  background: `
    radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.05) 0%, transparent 25%),
    radial-gradient(circle at 90% 80%, rgba(124, 58, 237, 0.05) 0%, transparent 25%),
    ${theme.palette.background.default}
  `,
  [theme.breakpoints.up('sm')]: {
    marginLeft: `${drawerWidth}px`,
  },
}));

const GlassMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
}));

type MenuItemType = {
  text: string;
  icon: React.ReactNode;
  path: string;
  matchExact?: boolean;
};

type MenuGroupType = {
  subheader: string;
  items: MenuItemType[];
};

type LayoutProps = {
  onLogout: () => void;
  children?: React.ReactNode;
};

const Layout = ({ onLogout, children }: LayoutProps) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const open = Boolean(anchorEl);

  const menuGroups: MenuGroupType[] = [
    {
      subheader: 'Principal',
      items: [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', matchExact: true },
      ]
    },
    {
      subheader: 'Campanhas',
      items: [
        { text: 'Nova Campanha', icon: <CampaignIcon />, path: '/briefing/novo' },
        { text: 'Lista de Campanhas', icon: <ListIcon />, path: '/campanhas' },
        { text: 'Histórico', icon: <HistoryIcon />, path: '/campaign-history' },
        { text: 'Progresso', icon: <CampaignIcon />, path: '/campanhas/progresso' },
      ]
    },
    {
      subheader: 'Análises',
      items: [
        { text: 'Insights', icon: <InsightsIcon />, path: '/insights' },
        { text: 'Alertas', icon: <AlertsIcon />, path: '/alerts' },
        { text: 'Relatórios', icon: <ReportsIcon />, path: '/reports' },
      ]
    },
    {
      subheader: 'Configurações',
      items: [
        { text: 'Templates', icon: <TemplatesIcon />, path: '/templates' },
        { text: 'Integrações', icon: <IntegrationsIcon />, path: '/integrations' },
      ]
    }
  ];

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    onLogout();
  };

  const isItemSelected = (item: MenuItemType) => {
    return item.matchExact 
      ? location.pathname === item.path
      : location.pathname.startsWith(item.path);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      background: theme.palette.background.default
    }}>
      <CssBaseline />
      
      <GlassAppBar position="fixed">
        <Toolbar sx={{ 
          px: { sm: 3 },
          minHeight: '64px !important'
        }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ 
            flexGrow: 1, 
            fontWeight: 600,
            letterSpacing: '-0.01em'
          }}>
            Marketo Flow
          </Typography>
          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar sx={{ 
              width: 36,
              height: 36,
              bgcolor: 'rgba(37, 99, 235, 0.1)',
              color: theme.palette.primary.main,
              border: '1px solid rgba(37, 99, 235, 0.2)'
            }}>
              <AccountIcon fontSize="small" />
            </Avatar>
          </IconButton>
        </Toolbar>
      </GlassAppBar>

      <GlassSidebar component="nav">
        <Box
          sx={{
            width: drawerWidth,
            height: '100vh',
            position: 'fixed',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRight: '1px solid rgba(255, 255, 255, 0.2)',
            display: { xs: mobileOpen ? 'block' : 'none', sm: 'block' },
            overflowY: 'auto',
            boxShadow: '2px 0 16px rgba(0, 0, 0, 0.05)'
          }}
        >
          <Toolbar sx={{ 
            justifyContent: 'center', 
            py: 4,
            mb: 1,
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 24,
              right: 24,
              height: '1px',
              backgroundColor: 'rgba(0, 0, 0, 0.05)'
            }
          }}>
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}>
              <Box sx={{
                width: 32,
                height: 32,
                borderRadius: '8px',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L3 7L12 12L21 7L12 2Z" fill="white"/>
                  <path d="M3 12L12 17L21 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M3 17L12 22L21 17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: theme.palette.text.primary,
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  letterSpacing: '-0.01em'
                }}
              >
                Marketo Flow
              </Typography>
            </Box>
          </Toolbar>
          
          <Box sx={{ 
            flexGrow: 1, 
            overflowY: 'auto', 
            p: 2,
            pt: 1
          }}>
            {menuGroups.map((group, index) => (
              <React.Fragment key={index}>
                <ListSubheader 
                  sx={{ 
                    bgcolor: 'transparent',
                    color: theme.palette.text.secondary,
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    px: 1.5,
                    pt: index > 0 ? 3 : 1,
                    pb: 1,
                    lineHeight: '1.5',
                    backdropFilter: 'blur(4px)'
                  }}
                >
                  {group.subheader}
                </ListSubheader>
                <List disablePadding>
                  {group.items.map((item) => (
                    <ListItem key={item.text} disablePadding>
                      <ListItemButton 
                        component={Link}
                        to={item.path}
                        selected={isItemSelected(item)}
                        sx={{
                          borderRadius: '8px',
                          mb: 0.5,
                          px: 1.5,
                          py: '8px',
                          '&.Mui-selected': {
                            backgroundColor: 'rgba(37, 99, 235, 0.08)',
                            color: theme.palette.primary.main,
                            '& .MuiListItemIcon-root': {
                              color: theme.palette.primary.main
                            }
                          },
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.03)',
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <ListItemIcon sx={{ 
                          minWidth: 36,
                          color: isItemSelected(item) ? 
                            theme.palette.primary.main : 
                            theme.palette.text.secondary
                        }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText 
                          primary={item.text} 
                          primaryTypographyProps={{ 
                            variant: 'body2',
                            fontWeight: isItemSelected(item) ? 600 : 400,
                            fontSize: '0.875rem',
                            letterSpacing: '-0.01em'
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </React.Fragment>
            ))}
          </Box>
        </Box>
      </GlassSidebar>

      <MainContent component="main">
        <Toolbar />
        <Container maxWidth="xl" sx={{ 
          p: { xs: 2, sm: 3 },
          '&.MuiContainer-root': {
            pl: { sm: 3 },
            pr: { sm: 3 }
          }
        }}>
          {children || <Outlet />}
        </Container>
      </MainContent>

      <GlassMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 1.5,
            minWidth: 200,
            borderRadius: '12px',
            overflow: 'visible',
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            }
          }
        }}
      >
        <MenuItem 
          onClick={() => {
            handleMenuClose();
            navigate('/settings');
          }}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.03)',
              backdropFilter: 'blur(4px)'
            },
            py: 1.5,
            px: 2
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Configurações</Typography>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem 
          onClick={handleLogoutClick}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.03)',
              backdropFilter: 'blur(4px)'
            },
            py: 1.5,
            px: 2
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Sair</Typography>
        </MenuItem>
      </GlassMenu>
    </Box>
  );
};

export default Layout;