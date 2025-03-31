import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CampaignBriefing from './pages/CampaignBriefing';
import CampaignDetails from './pages/CampaignDetails';
import EditBriefing from './pages/EditBriefing';
import ContentProgressPage from './pages/ContentProgressPage';
import InsightsPage from './pages/Insights/InsightsPage'; // Added new Insights page
import Layout from './components/Layout';
import IntegrationSettings from './integrations/IntegrationSettings'; // Caminho corrigido
import CustomReports from './reports/CustomReports'; // Caminho corrigido
import TemplatesPage from './pages/TemplatesLibrary'; // Added Templates page
import PriorityInsights from './pages/Insights/components/PriorityInsights'; // Added PriorityInsights

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    // Simulate token validation
    const validateToken = async () => {
      try {
        // In a real app, you would verify the token with your backend
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error('Token validation failed:', error);
        localStorage.removeItem('authToken');
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
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
        height: '100vh',
        backgroundColor: 'background.default'
      }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: 'background.default',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <Login onLogin={handleLogin} />
          } 
        />
        
        <Route 
          path="/" 
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
          } 
        />

        <Route element={<Layout onLogout={handleLogout} />}>
          {/* Dashboard */}
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? 
                <Dashboard /> : 
                <Navigate to="/login" replace />
            } 
          />

          {/* Campaign Routes */}
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

          {/* Insights Routes */}
          <Route 
            path="/insights" 
            element={
              isAuthenticated ? 
                <InsightsPage /> : 
                <Navigate to="/login" replace />
            } 
          />
<Route 
  path="/insights/priority" 
  element={
    isAuthenticated ? 
      <PriorityInsights insights={[]} /> : // Passando array vazio como valor inicial
      <Navigate to="/login" replace />
  } 
/>

          {/* Integration Routes */}
          <Route 
            path="/integrations" 
            element={
              isAuthenticated ? 
                <IntegrationSettings /> : 
                <Navigate to="/login" replace />
            } 
          />

          {/* Report Routes */}
          <Route 
            path="/reports" 
            element={
              isAuthenticated ? 
                <CustomReports /> : 
                <Navigate to="/login" replace />
            } 
          />

          {/* Templates Route */}
          <Route 
            path="/templates" 
            element={
              isAuthenticated ? 
                <TemplatesPage /> : 
                <Navigate to="/login" replace />
            } 
          />

          {/* 404 - Not Found */}
          <Route 
            path="*" 
            element={
              <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
            } 
          />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;