import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CampaignBriefing from './pages/CampaignBriefing';
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
    navigate('/');
  };

  return (
    <Box sx={{ height: '100vh', bgcolor: '#f5f7fb' }}>
      <Routes>
        {/* Rota pública */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <Login onLogin={handleLogin} />
          } 
        />
        
        {/* Rotas protegidas */}
        <Route 
          element={<Layout onLogout={handleLogout} />}
        >
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? 
                <Dashboard /> : 
                <Navigate to="/" replace />
            } 
          />
          <Route 
            path="/briefing" 
            element={
              isAuthenticated ? 
                <CampaignBriefing /> : 
                <Navigate to="/" replace />
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