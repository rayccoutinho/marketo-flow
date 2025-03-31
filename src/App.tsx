import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CampaignBriefing from './pages/CampaignBriefing';
import CampaignDetails from './pages/CampaignDetails';
import EditBriefing from './pages/EditBriefing';
import ContentProgressPage from './pages/ContentProgressPage';
import Layout from './components/Layout';

// Importações com caminhos corrigidos
import IntegrationSettings from './integrations/IntegrationSettings';
import CustomReports from './reports/CustomReports';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('authToken', 'valid-token');
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/login');
  };

  if (isLoading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      height: '100vh', 
      bgcolor: '#f5f7fb', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Routes>
        <Route path="/login" 
          element={isAuthenticated ? 
            <Navigate to="/dashboard" /> : 
            <Login onLogin={handleLogin} />} 
        />
        
        <Route path="/" 
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
          } 
        />

        <Route element={<Layout onLogout={handleLogout} />}>
          <Route path="/dashboard" 
            element={isAuthenticated ? 
              <Dashboard /> : 
              <Navigate to="/login" />} 
          />

          <Route path="/briefing/novo" 
            element={isAuthenticated ? 
              <CampaignBriefing /> : 
              <Navigate to="/login" />} 
          />
          <Route path="/campanhas/:id" 
            element={isAuthenticated ? 
              <CampaignDetails /> : 
              <Navigate to="/login" />} 
          />
          <Route path="/campanhas/:id/editar" 
            element={isAuthenticated ? 
              <EditBriefing /> : 
              <Navigate to="/login" />} 
          />
          <Route path="/campanhas/:id/progresso" 
            element={isAuthenticated ? 
              <ContentProgressPage /> : 
              <Navigate to="/login" />} 
          />

          {/* Rotas com caminhos definitivos */}
          <Route path="/integrations" 
            element={isAuthenticated ? 
              <IntegrationSettings /> : 
              <Navigate to="/login" />} 
          />
          <Route path="/reports" 
            element={isAuthenticated ? 
              <CustomReports /> : 
              <Navigate to="/login" />} 
          />

          <Route path="*" 
            element={
              <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
            } 
          />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;