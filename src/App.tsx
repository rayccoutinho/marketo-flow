import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CampaignBriefing from './pages/CampaignBriefing';
import ContentProgressPage from './pages/ContentProgressPage';
import Layout from './components/Layout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <Box sx={{ height: '100vh', bgcolor: '#f5f7fb' }}>
      <Routes>
        {/* Rota de login */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <Login onLogin={handleLogin} />
          } 
        />
        
        {/* Redirecionamento raiz */}
        <Route 
          path="/" 
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
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
            path="/briefing" 
            element={
              isAuthenticated ? 
                <CampaignBriefing /> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/progresso" 
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
                <CampaignBriefing /> : 
                <Navigate to="/login" replace />
            } 
          />
        </Route>

        {/* Fallback para rotas não encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Box>
  );
}

export default App;