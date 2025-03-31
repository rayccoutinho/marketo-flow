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
  IconButton,
  Typography,
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
  List as ListIcon
} from '@mui/icons-material';

const drawerWidth = 240;

type MenuItemType = {
  text: string;
  icon: React.ReactNode;
  path: string;
};

type MenuGroupType = {
  subheader: string;
  items: MenuItemType[];
};

type LayoutProps = {
  onLogout: () => void;
};

// Definindo tipos para o ListItemButton estilizado
type StyledListItemButtonProps = {
  selected?: boolean;
  to: string;
  component?: typeof Link;
};

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<StyledListItemButtonProps>(({ theme, selected }) => ({
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(0.5, 1),
  ...(selected && {
    backgroundColor: theme.palette.action.selected,
    color: theme.palette.primary.main,
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
  }),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Layout = ({ onLogout }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const menuGroups: MenuGroupType[] = [
    {
      subheader: 'Principal',
      items: [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
      ]
    },
    {
      subheader: 'Campanhas',
      items: [
        { text: 'Nova Campanha', icon: <CampaignIcon />, path: '/briefing/novo' },
        { text: 'Lista de Campanhas', icon: <ListIcon />, path: '/campanhas' },
      ]
    },
    {
      subheader: 'Ferramentas',
      items: [
        { text: 'Templates', icon: <TemplatesIcon />, path: '/templates' },
        { text: 'Integrações', icon: <IntegrationsIcon />, path: '/integrations' },
        { text: 'Relatórios', icon: <ReportsIcon />, path: '/reports' },
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
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ 
          width: drawerWidth, 
          flexShrink: 0,
          bgcolor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
          height: '100vh',
          position: 'fixed',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography variant="h6" noWrap>
            Marketo Flow
          </Typography>
        </Toolbar>
        <Divider />
        
        {/* Menu Items */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 1 }}>
          {menuGroups.map((group, index) => (
            <React.Fragment key={index}>
              <ListSubheader sx={{ bgcolor: 'inherit' }}>
                {group.subheader}
              </ListSubheader>
              <List>
                {group.items.map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <StyledListItemButton 
                      component={Link}
                      to={item.path}
                      selected={location.pathname.startsWith(item.path)}
                    >
                      <ListItemIcon>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </StyledListItemButton>
                  </ListItem>
                ))}
              </List>
              {index < menuGroups.length - 1 && <Divider sx={{ my: 1 }} />}
            </React.Fragment>
          ))}
        </Box>
        
        {/* User Section */}
        <Box sx={{ p: 2 }}>
          <Divider />
          <ListItemButton onClick={handleMenuOpen}>
            <Avatar sx={{ mr: 2 }}>
              <AccountIcon />
            </Avatar>
            <ListItemText primary="Minha Conta" secondary="Administrador" />
          </ListItemButton>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;