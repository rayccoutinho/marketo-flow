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

const ModernAppBar = styled(AppBar)(({ theme }) => ({
  backdropFilter: 'blur(8px)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  color: theme.palette.text.primary,
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
  [theme.breakpoints.up('sm')]: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
  },
}));

const Sidebar = styled(Box)(({ theme }) => ({
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
  [theme.breakpoints.up('sm')]: {
    marginLeft: `${drawerWidth}px`,
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
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <CssBaseline />
      
      <ModernAppBar position="fixed">
        <Toolbar sx={{ px: { sm: 3 } }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Marketo Flow
          </Typography>
          <IconButton onClick={handleMenuOpen}>
            <Avatar sx={{ 
              width: 36,
              height: 36,
              bgcolor: theme.palette.primary.main
            }}>
              <AccountIcon fontSize="small" />
            </Avatar>
          </IconButton>
        </Toolbar>
      </ModernAppBar>

      <Sidebar>
        <Box
          sx={{
            width: drawerWidth,
            height: '100vh',
            position: 'fixed',
            bgcolor: 'background.paper',
            borderRight: '1px solid',
            borderColor: 'divider',
            display: { xs: mobileOpen ? 'block' : 'none', sm: 'block' },
            overflowY: 'auto'
          }}
        >
          <Toolbar sx={{ 
            justifyContent: 'center', 
            py: 3,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
          }}>
            <Typography 
              variant="h6" 
              noWrap 
              component="div" 
              sx={{ 
                color: 'common.white',
                fontWeight: 700,
                letterSpacing: 1
              }}
            >
              Marketo Flow
            </Typography>
          </Toolbar>
          
          <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
            {menuGroups.map((group, index) => (
              <React.Fragment key={index}>
                <ListSubheader 
                  sx={{ 
                    bgcolor: 'transparent',
                    color: 'text.secondary',
                    fontWeight: 'medium',
                    px: 0,
                    pt: index > 0 ? 3 : 0
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
                          borderRadius: 2,
                          mb: 0.5,
                          '&.Mui-selected': {
                            bgcolor: 'primary.light',
                            color: 'primary.contrastText',
                            '& .MuiListItemIcon-root': {
                              color: 'primary.contrastText'
                            }
                          },
                          '&:hover': {
                            bgcolor: 'action.hover',
                          }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText 
                          primary={item.text} 
                          primaryTypographyProps={{ 
                            variant: 'body2',
                            fontWeight: isItemSelected(item) ? 600 : 400
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
      </Sidebar>

      <MainContent>
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

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 200,
            borderRadius: 2,
            overflow: 'visible',
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            }
          }
        }}
      >
        <MenuItem onClick={() => {
          handleMenuClose();
          navigate('/settings');
        }}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Configurações
        </MenuItem>
        <MenuItem onClick={handleLogoutClick}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Layout;