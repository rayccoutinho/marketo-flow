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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const isAuth = !!token;
    setIsAuthenticated(isAuth);
    setIsLoading(false);
    
    // Redireciona para login se não estiver autenticado
    if (!isAuth && window.location.pathname !== '/login') {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const handleLogin = () => {
    localStorage.setItem('authToken', 'valid-token');
    setIsAuthenticated(true);
    navigate('/dashboard', { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
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
        {/* Rotas públicas */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <Login onLogin={handleLogin} />
          } 
        />
        
        {/* Redirecionamentos */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <Navigate to="/login" replace />
          } 
        />
        
        {/* Rotas protegidas */}
        <Route element={<Layout onLogout={handleLogout} />}>
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? 
                <Dashboard /> : 
                <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/briefing/novo" 
            element={
              isAuthenticated ? 
                <CampaignBriefing /> : 
                <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/campanhas/:id" 
            element={
              isAuthenticated ? 
                <CampaignDetails /> : 
                <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/campanhas/:id/editar" 
            element={
              isAuthenticated ? 
                <EditBriefing /> : 
                <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/campanhas/:id/progresso" 
            element={
              isAuthenticated ? 
                <ContentProgressPage /> : 
                <Navigate to="/login" replace />
            } 
          />

          <Route 
            path="/briefing/:id" 
            element={
              isAuthenticated ? 
                <CampaignDetails /> : 
                <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/briefing/editar/:id" 
            element={
              isAuthenticated ? 
                <EditBriefing /> : 
                <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/campanha/:id/progresso" 
            element={
              isAuthenticated ? 
                <ContentProgressPage /> : 
                <Navigate to="/login" replace />
            } 
          />

          <Route 
            path="/relatorios" 
            element={
              isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <Navigate to="/login" replace />
            } 
          />
        </Route>

        {/* Fallback para rotas não encontradas */}
        <Route 
          path="*" 
          element={
            isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <Navigate to="/login" replace />
          } 
        />
      </Routes>
    </Box>
  );
}

export default App;