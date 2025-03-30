import React from 'react';
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
  Typography
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Campaign as CampaignIcon,
  ExitToApp as LogoutIcon,
  AccountCircle as AccountIcon
} from '@mui/icons-material';

const drawerWidth = 240;

type LayoutProps = {
  onLogout: () => void;
};

const Layout = ({ onLogout }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    onLogout();
    navigate('/');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Novo Briefing', icon: <CampaignIcon />, path: '/briefing' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
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
          position: 'fixed'
        }}
      >
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography variant="h6" noWrap>
            Marketo Flow
          </Typography>
        </Toolbar>
        <Divider />
        
        <List>
          <ListSubheader sx={{ bgcolor: 'inherit' }}>Menu</ListSubheader>
          {menuItems.map((item) => (
            <ListItem 
              key={item.text} 
              disablePadding
              sx={{
                bgcolor: location.pathname === item.path ? 'action.selected' : 'inherit'
              }}
            >
              <ListItemButton 
                component={Link} 
                to={item.path}
                selected={location.pathname === item.path}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        <Box sx={{ mt: 'auto', p: 2 }}>
          <Divider />
          <ListItemButton onClick={handleLogoutClick}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItemButton>
        </Box>
      </Box>

      {/* Conteúdo Principal */}
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
        
        {/* Header com perfil do usuário */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end',
            mb: 3
          }}
        >
          <IconButton onClick={handleMenuOpen}>
            <Avatar>
              <AccountIcon />
            </Avatar>
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogoutClick}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Sair
            </MenuItem>
          </Menu>
        </Box>
        
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;