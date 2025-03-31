import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, LinkProps } from 'react-router-dom';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemButtonProps,
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
  styled,
  useTheme
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
  Insights as InsightsIcon
} from '@mui/icons-material';

const drawerWidth = 240;

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

interface CustomListItemButtonProps extends ListItemButtonProps {
  component?: React.ElementType;
  to?: string;
  selected?: boolean;
}

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<CustomListItemButtonProps>(({ theme, selected }) => ({
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

const Layout = ({ onLogout, children }: LayoutProps) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
        { text: 'Progresso', icon: <CampaignIcon />, path: '/campanhas/progresso' },
      ]
    },
    {
      subheader: 'Análises',
      items: [
        { text: 'Insights', icon: <InsightsIcon />, path: '/insights' },
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
        <Toolbar sx={{ justifyContent: 'center', py: 2 }}>
          <Typography variant="h6" noWrap component="div">
            Marketo Flow
          </Typography>
        </Toolbar>
        <Divider />
        
        {/* Menu Items */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 1 }}>
          {menuGroups.map((group, index) => (
            <React.Fragment key={index}>
              <ListSubheader 
                sx={{ 
                  bgcolor: 'inherit',
                  color: theme.palette.text.secondary,
                  fontWeight: 'medium'
                }}
              >
                {group.subheader}
              </ListSubheader>
              <List disablePadding>
                {group.items.map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <StyledListItemButton 
                      component={Link}
                      to={item.path}
                      selected={isItemSelected(item)}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.text} 
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </StyledListItemButton>
                  </ListItem>
                ))}
              </List>
              {index < menuGroups.length - 1 && <Divider sx={{ my: 1 }} />}
            </React.Fragment>
          ))}
        </Box>
        
        {/* User Section */}
        <Box sx={{ p: 2, bgcolor: 'background.default' }}>
          <Divider sx={{ mb: 2 }} />
          <ListItemButton 
            onClick={handleMenuOpen}
            sx={{
              borderRadius: theme.shape.borderRadius,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <Avatar sx={{ 
              mr: 2,
              bgcolor: theme.palette.primary.main,
              width: 32,
              height: 32
            }}>
              <AccountIcon fontSize="small" />
            </Avatar>
            <ListItemText 
              primary="Minha Conta" 
              secondary="Administrador"
              primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </ListItemButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
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
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'background.default',
          minHeight: '100vh'
        }}
      >
        <Toolbar />
        {children || <Outlet />}
      </Box>
    </Box>
  );
};

export default Layout;