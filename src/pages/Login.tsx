import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Link,
  styled,
  InputAdornment,
  IconButton,
  Divider
} from '@mui/material';
import { 
  Bolt as BoltIcon, 
  Visibility, 
  VisibilityOff,
  Apple,
  Google,
  Facebook
} from '@mui/icons-material';

interface LoginProps {
  onLogin: () => void;
}

const GlassCard = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  padding: theme.spacing(6),
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  borderRadius: theme.shape.borderRadius * 4,
  border: '1px solid rgba(255, 255, 255, 0.12)',
  boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15)',
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1.75),
  borderRadius: theme.shape.borderRadius * 2,
  fontSize: '0.9375rem',
  fontWeight: 500,
  letterSpacing: '0.025em',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: `0 6px 16px ${theme.palette.primary.main}30`,
  },
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const SocialButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius * 2,
  border: '1px solid rgba(255, 255, 255, 0.12)',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  color: 'white',
  textTransform: 'none',
  fontSize: '0.875rem',
  fontWeight: 400,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  transition: 'all 0.3s ease',
}));

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    onLogin();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `
          radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.15) 0%, transparent 25%),
          radial-gradient(circle at 90% 80%, rgba(124, 58, 237, 0.15) 0%, transparent 25%),
          linear-gradient(135deg, #0f172a, #1e293b)
        `,
        p: 3
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <GlassCard>
          {/* Logo Section */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <BoltIcon sx={{ 
                  fontSize: 32, 
                  color: 'white',
                  transform: 'rotate(15deg)'
                }} />
              </Box>
            </motion.div>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700, 
                color: 'white',
                mb: 1,
                fontSize: '2rem',
                letterSpacing: '-0.02em'
              }}
            >
              Marketo Flow
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.9375rem'
              }}
            >
              Otimize suas campanhas com nossa plataforma inteligente
            </Typography>
          </Box>

          {/* Form Section */}
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ 
              '& > *:not(:last-child)': { 
                mb: 3 
              } 
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <TextField
                fullWidth
                id="email"
                type="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.12)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.1)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.6)',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'rgba(255, 255, 255, 0.8)',
                  },
                  '& .MuiInputBase-input': {
                    py: 1.5,
                    px: 2,
                  },
                }}
                placeholder="seu@email.com"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <TextField
                fullWidth
                id="password"
                type={showPassword ? 'text' : 'password'}
                label="Senha"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: 'rgba(255, 255, 255, 0.6)' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.12)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.1)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.6)',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'rgba(255, 255, 255, 0.8)',
                  },
                  '& .MuiInputBase-input': {
                    py: 1.5,
                    px: 2,
                  },
                }}
                placeholder="••••••••"
                required
              />
            </motion.div>

            <Box sx={{ textAlign: 'right', mb: 4 }}>
              <Link 
                href="#"
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.8125rem',
                  '&:hover': {
                    color: 'white',
                    textDecoration: 'none'
                  }
                }}
              >
                Esqueceu sua senha?
              </Link>
            </Box>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <GradientButton
                fullWidth
                type="submit"
                disabled={isLoading}
                size="large"
              >
                {isLoading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress size={20} sx={{ color: 'white', mr: 2 }} />
                    Acessando...
                  </Box>
                ) : 'Continuar'}
              </GradientButton>
            </motion.div>
          </Box>

          {/* Divider */}
          <Box sx={{ my: 4 }}>
            <Divider sx={{ 
              '&::before, &::after': {
                borderColor: 'rgba(255, 255, 255, 0.12)',
              }
            }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.5)', 
                  px: 2,
                  fontSize: '0.75rem'
                }}
              >
                ou continue com
              </Typography>
            </Divider>
          </Box>

          {/* Social Login */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            mb: 4
          }}>
            <SocialButton startIcon={<Apple />}>
              Apple
            </SocialButton>
            <SocialButton startIcon={<Google />}>
              Google
            </SocialButton>
            <SocialButton startIcon={<Facebook />}>
              Facebook
            </SocialButton>
          </Box>

          {/* Signup Link */}
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              textAlign: 'center',
              fontSize: '0.8125rem'
            }}
          >
            Não tem uma conta?{' '}
            <Link 
              href="#" 
              sx={{ 
                color: 'white',
                fontWeight: 500,
                '&:hover': {
                  textDecoration: 'none'
                }
              }}
            >
              Cadastre-se
            </Link>
          </Typography>
        </GlassCard>
      </motion.div>
    </Box>
  );
}