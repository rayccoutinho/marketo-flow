import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  useTheme,
  AppBar,
  Toolbar,
  Link,
  Stack,
  Divider,
  Paper,
  IconButton,
  styled
} from '@mui/material';
import { 
  PlayCircleOutline,
  Bolt,
  Analytics,
  Assessment,
  Timeline,
  IntegrationInstructions,
  Settings,
  Security,
  Apple,
  Google,
  Facebook,
  Equalizer,
  ShowChart,
  PieChart,
  People,
  Receipt,
  Lock,
  ArrowRightAlt // Ícone adicionado aqui
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Theme } from '@mui/material/styles';

// Componentes estilizados
const GlassCard = styled(Paper)(({ theme }: { theme: Theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  borderRadius: theme.shape.borderRadius * 4,
  border: '1px solid rgba(255, 255, 255, 0.12)',
  boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15)',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 16px 56px rgba(0, 0, 0, 0.2)'
  }
}));

const GradientButton = styled(Button)(({ theme }: { theme: Theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1.75),
  borderRadius: theme.shape.borderRadius * 2,
  fontWeight: 500,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
  },
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const AnimatedCounter = ({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // ms
    const stepTime = Math.max(Math.floor(duration / value), 1);
    
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev >= value) {
          clearInterval(timer);
          return value;
        }
        return prev + Math.ceil(value / (duration / stepTime));
      });
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const HomePage: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: `
        radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.15) 0%, transparent 25%),
        radial-gradient(circle at 90% 80%, rgba(124, 58, 237, 0.15) 0%, transparent 25%),
        linear-gradient(135deg, #0f172a, #1e293b)
      `,
      color: 'white'
    }}>
      {/* Navigation Bar */}
      <AppBar position="static" elevation={0} sx={{ 
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(20px)',
        py: 2
      }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Bolt sx={{ 
                color: theme.palette.primary.main,
                fontSize: 32
              }} />
              <Typography variant="h6" sx={{ 
                fontWeight: 700,
                fontSize: '1.5rem'
              }}>
                Marketo Flow
              </Typography>
            </Stack>
            
            <Stack 
              direction="row" 
              spacing={4} 
              sx={{ 
                display: { xs: 'none', md: 'flex' },
                ml: 8
              }}
            >
              <Link href="#features" underline="none" color="inherit">
                <Typography sx={{ fontWeight: 500 }}>Recursos</Typography>
              </Link>
              <Link href="#solutions" underline="none" color="inherit">
                <Typography sx={{ fontWeight: 500 }}>Soluções</Typography>
              </Link>
              <Link href="#pricing" underline="none" color="inherit">
                <Typography sx={{ fontWeight: 500 }}>Preços</Typography>
              </Link>
              <Link href="#contact" underline="none" color="inherit">
                <Typography sx={{ fontWeight: 500 }}>Contato</Typography>
              </Link>
            </Stack>
            
            <Stack direction="row" spacing={2} sx={{ ml: 'auto' }}>
              <Button 
                variant="outlined" 
                sx={{ 
                  borderRadius: 2,
                  borderColor: 'rgba(255, 255, 255, 0.12)',
                  color: 'white',
                  fontWeight: 500,
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.3)'
                  }
                }}
              >
                Login
              </Button>
              <GradientButton>
                Começar
              </GradientButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ pt: 15, pb: 15 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Typography variant="h1" sx={{ 
                  fontWeight: 800,
                  fontSize: '3.5rem',
                  lineHeight: 1.2,
                  mb: 3,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}>
                  Potencialize seu marketing
                </Typography>
                <Typography variant="h4" sx={{ 
                  fontWeight: 400,
                  color: 'rgba(255, 255, 255, 0.9)',
                  mb: 4,
                  maxWidth: '90%'
                }}>
                  Análise preditiva e automação inteligente para campanhas de alto desempenho.
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <GradientButton size="large">
                    Comece agora
                  </GradientButton>
                  <Button
                    variant="text"
                    size="large"
                    startIcon={<PlayCircleOutline sx={{ color: theme.palette.primary.main }} />}
                    sx={{ 
                      color: 'white',
                      fontWeight: 500
                    }}
                  >
                    Ver demonstração
                  </Button>
                </Stack>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <GlassCard sx={{ p: 0, overflow: 'hidden' }}>
                  <Box sx={{ 
                    height: 0, 
                    paddingBottom: '56.25%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                    <Box sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 4,
                      textAlign: 'center'
                    }}>
                      <Typography variant="h6" sx={{ 
                        color: 'rgba(255, 255, 255, 0.9)',
                        mb: 2
                      }}>
                        Dashboard Interativo
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)',
                        mb: 3,
                        maxWidth: 400
                      }}>
                        Visualização em tempo real do desempenho de suas campanhas
                      </Typography>
                      <Button
                        variant="outlined"
                        size="medium"
                        startIcon={<PlayCircleOutline />}
                        sx={{ 
                          color: 'white',
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                          '&:hover': {
                            borderColor: 'rgba(255, 255, 255, 0.5)'
                          }
                        }}
                      >
                        Ver tour
                      </Button>
                    </Box>
                  </Box>
                </GlassCard>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Metrics Section */}
      <Box sx={{ py: 8, background: 'rgba(255, 255, 255, 0.03)' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Grid container spacing={4}>
              {[
                {
                  icon: <Equalizer sx={{ fontSize: 40 }} />,
                  value: 215,
                  suffix: '%',
                  title: 'ROI médio',
                  description: 'Retorno sobre investimento'
                },
                {
                  icon: <ShowChart sx={{ fontSize: 40 }} />,
                  value: 12432,
                  title: 'Visitas',
                  description: 'Por campanha (média)'
                },
                {
                  icon: <People sx={{ fontSize: 40 }} />,
                  value: 2400,
                  prefix: '+',
                  title: 'Leads',
                  description: 'Gerados mensalmente'
                },
                {
                  icon: <PieChart sx={{ fontSize: 40 }} />,
                  value: 64,
                  suffix: '%',
                  title: 'Engajamento',
                  description: 'Taxa média'
                }
              ].map((metric, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GlassCard sx={{ 
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center'
                    }}>
                      <Box sx={{
                        width: 80,
                        height: 80,
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        color: theme.palette.primary.main
                      }}>
                        {metric.icon}
                      </Box>
                      <Typography variant="h3" sx={{ 
                        fontWeight: 700,
                        mb: 1,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        <AnimatedCounter 
                          value={metric.value} 
                          prefix={metric.prefix} 
                          suffix={metric.suffix} 
                        />
                      </Typography>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 600,
                        mb: 1
                      }}>
                        {metric.title}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)'
                      }}>
                        {metric.description}
                      </Typography>
                    </GlassCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features" sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography variant="h2" textAlign="center" sx={{ 
              fontWeight: 800,
              mb: 2,
              fontSize: '2.5rem'
            }}>
              Recursos Poderosos
            </Typography>
            <Typography variant="body1" textAlign="center" sx={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              mb: 6,
              maxWidth: 700,
              mx: 'auto',
              fontSize: '1.1rem'
            }}>
              Tudo o que você precisa para otimizar suas campanhas de marketing digital
            </Typography>
            
            <Grid container spacing={4}>
              {[
                {
                  icon: <Analytics sx={{ fontSize: 32 }} />,
                  title: "Análise em Tempo Real",
                  description: "Monitoramento contínuo com atualizações instantâneas de todas as métricas importantes."
                },
                {
                  icon: <Assessment sx={{ fontSize: 32 }} />,
                  title: "Relatórios Automatizados",
                  description: "Geração automática de relatórios detalhados para todas suas métricas-chave."
                },
                {
                  icon: <Timeline sx={{ fontSize: 32 }} />,
                  title: "Previsões Inteligentes",
                  description: "Algoritmos de IA que preveem o desempenho futuro de suas campanhas."
                },
                {
                  icon: <IntegrationInstructions sx={{ fontSize: 32 }} />,
                  title: "Integrações Nativas",
                  description: "Conecte-se facilmente com todas as plataformas de marketing existentes."
                },
                {
                  icon: <Settings sx={{ fontSize: 32 }} />,
                  title: "Personalização Total",
                  description: "Dashboards completamente personalizáveis para suas necessidades específicas."
                },
                {
                  icon: <Security sx={{ fontSize: 32 }} />,
                  title: "Segurança de Dados",
                  description: "Proteção de nível empresarial para todos seus dados sensíveis."
                }
              ].map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GlassCard sx={{ 
                      p: 4, 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <Box sx={{ 
                        width: 60,
                        height: 60,
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        color: theme.palette.primary.main
                      }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h5" sx={{ 
                        fontWeight: 700, 
                        mb: 2,
                        color: 'white'
                      }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)',
                        flexGrow: 1
                      }}>
                        {feature.description}
                      </Typography>
                      <Box sx={{ mt: 3, textAlign: 'right' }}>
                        <ArrowRightAlt sx={{ 
                          color: theme.palette.primary.main,
                          fontSize: 28
                        }} />
                      </Box>
                    </GlassCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box id="pricing" sx={{ 
        py: 10,
        background: 'rgba(255, 255, 255, 0.03)'
      }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography variant="h2" textAlign="center" sx={{ 
              fontWeight: 800,
              mb: 2,
              fontSize: '2.5rem'
            }}>
              Planos Simples
            </Typography>
            <Typography variant="body1" textAlign="center" sx={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              mb: 6,
              maxWidth: 600,
              mx: 'auto',
              fontSize: '1.1rem'
            }}>
              Escolha o plano perfeito para suas necessidades de marketing
            </Typography>
            
            <Grid container spacing={4} justifyContent="center">
              {[
                {
                  name: "Básico",
                  price: "R$ 99",
                  period: "/mês",
                  description: "Ideal para pequenos negócios",
                  features: [
                    "Até 5 campanhas",
                    "Relatórios básicos",
                    "Suporte por email",
                    "Integração com 3 plataformas"
                  ],
                  highlight: false
                },
                {
                  name: "Profissional",
                  price: "R$ 299",
                  period: "/mês",
                  description: "Para equipes de marketing",
                  features: [
                    "Campanhas ilimitadas",
                    "Relatórios avançados",
                    "Suporte prioritário",
                    "Integração com 10+ plataformas",
                    "Previsões de desempenho"
                  ],
                  highlight: true
                },
                {
                  name: "Enterprise",
                  price: "Personalizado",
                  period: "",
                  description: "Solução corporativa completa",
                  features: [
                    "Todos recursos Pro",
                    "Dashboard personalizado",
                    "Suporte 24/7 dedicado",
                    "Treinamento da equipe",
                    "API completa",
                    "Consultoria estratégica"
                  ],
                  highlight: false
                }
              ].map((plan, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div
                    whileHover={plan.highlight ? { y: -10, scale: 1.02 } : { y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GlassCard sx={{ 
                      p: 4,
                      height: '100%',
                      border: plan.highlight ? `2px solid ${theme.palette.primary.main}` : '1px solid rgba(255, 255, 255, 0.12)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      {plan.highlight && (
                        <Box sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          px: 2,
                          py: 0.5,
                          bgcolor: theme.palette.primary.main,
                          color: 'white',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          borderBottomLeftRadius: 8
                        }}>
                          POPULAR
                        </Box>
                      )}
                      <Typography variant="h5" sx={{ 
                        fontWeight: 700,
                        mb: 1,
                        color: plan.highlight ? theme.palette.primary.main : 'white'
                      }}>
                        {plan.name}
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)',
                        mb: 3
                      }}>
                        {plan.description}
                      </Typography>
                      <Box sx={{ 
                        display: 'flex',
                        alignItems: 'baseline',
                        mb: 3
                      }}>
                        <Typography variant="h3" sx={{ 
                          fontWeight: 800,
                          mr: 1
                        }}>
                          {plan.price}
                        </Typography>
                        <Typography variant="body1" sx={{ 
                          color: 'rgba(255, 255, 255, 0.7)'
                        }}>
                          {plan.period}
                        </Typography>
                      </Box>
                      <Box component="ul" sx={{ 
                        pl: 2,
                        mb: 4,
                        '& li': {
                          mb: 1.5,
                          color: 'rgba(255, 255, 255, 0.8)'
                        }
                      }}>
                        {plan.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </Box>
                      <GradientButton fullWidth>
                        Assinar plano
                      </GradientButton>
                    </GlassCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Final CTA Section */}
      <Container maxWidth="md" sx={{ py: 15, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography variant="h2" gutterBottom sx={{ 
            fontWeight: 800,
            fontSize: '2.5rem'
          }}>
            Pronto para revolucionar seu marketing?
          </Typography>
          <Typography variant="body1" sx={{ 
            mb: 4, 
            maxWidth: 600, 
            mx: 'auto',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1.1rem'
          }}>
            Comece agora e experimente a plataforma que está transformando a análise de campanhas digitais.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <GradientButton size="large">
              Começar teste gratuito
            </GradientButton>
            <Button
              variant="outlined"
              size="large"
              sx={{ 
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.5)'
                },
                px: 4,
                py: 1.5
              }}
            >
              Falar com vendas
            </Button>
          </Stack>
        </motion.div>
      </Container>

      {/* Footer */}
      <Box sx={{ 
        py: 6,
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Bolt sx={{ 
                  color: theme.palette.primary.main,
                  fontSize: 32
                }} />
                <Typography variant="h5" sx={{ 
                  fontWeight: 700,
                  fontSize: '1.5rem'
                }}>
                  Marketo Flow
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ 
                color: 'rgba(255, 255, 255, 0.6)',
                mt: 2,
                maxWidth: 400
              }}>
                A plataforma de análise de marketing mais avançada para profissionais exigentes.
              </Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="body2" sx={{ 
                fontWeight: 600,
                mb: 2,
                color: 'white'
              }}>
                Produto
              </Typography>
              <Stack spacing={1}>
                {['Recursos', 'Preços', 'Integrações', 'API'].map((item) => (
                  <Link href="#" key={item} underline="none" sx={{ 
                    color: 'rgba(255, 255, 255, 0.6)',
                    '&:hover': {
                      color: 'white'
                    }
                  }}>
                    {item}
                  </Link>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="body2" sx={{ 
                fontWeight: 600,
                mb: 2,
                color: 'white'
              }}>
                Empresa
              </Typography>
              <Stack spacing={1}>
                {['Sobre nós', 'Carreiras', 'Blog', 'Contato'].map((item) => (
                  <Link href="#" key={item} underline="none" sx={{ 
                    color: 'rgba(255, 255, 255, 0.6)',
                    '&:hover': {
                      color: 'white'
                    }
                  }}>
                    {item}
                  </Link>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="body2" sx={{ 
                fontWeight: 600,
                mb: 2,
                color: 'white'
              }}>
                Social
              </Typography>
              <Stack direction="row" spacing={1}>
                {[Apple, Google, Facebook].map((Icon, i) => (
                  <IconButton 
                    key={i} 
                    size="small" 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.6)',
                      '&:hover': {
                        color: 'white',
                        bgcolor: 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                  >
                    <Icon fontSize="small" />
                  </IconButton>
                ))}
              </Stack>
            </Grid>
          </Grid>
          <Divider sx={{ my: 6, borderColor: 'rgba(255, 255, 255, 0.08)' }} />
          <Typography variant="body2" sx={{ 
            color: 'rgba(255, 255, 255, 0.4)',
            textAlign: 'center'
          }}>
            © {new Date().getFullYear()} Marketo Flow. Todos os direitos reservados.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;