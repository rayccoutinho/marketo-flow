import React, { useState, useRef } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Checkbox, 
  FormControlLabel,
  Divider,
  Chip,
  Autocomplete,
  Tabs,
  Tab,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Snackbar,
  Alert,
  useTheme,
  styled
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ptBR from 'date-fns/locale/pt-BR';
import { FiPlus, FiTrash2, FiChevronDown, FiChevronUp, FiPaperclip, FiFile, FiX } from 'react-icons/fi';

// Componentes estilizados
const GlassPaper = styled(Paper)(({ theme }) => ({
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  borderRadius: '12px',
  padding: theme.spacing(4),
  margin: '0 auto',
  maxWidth: '1200px',
  marginBottom: theme.spacing(4),
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '-0.01em',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
  fontSize: '1.25rem',
}));

const ContentCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: '12px',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  },
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  fontWeight: 500,
  letterSpacing: '0.01em',
  borderRadius: '8px',
  padding: theme.spacing(1.5, 3),
  textTransform: 'none',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  fontWeight: 500,
  letterSpacing: '0.01em',
  borderRadius: '8px',
  padding: theme.spacing(1.5, 3),
  textTransform: 'none',
  borderColor: 'rgba(0, 0, 0, 0.12)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderColor: 'rgba(0, 0, 0, 0.24)',
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
    height: 3,
  },
  marginBottom: theme.spacing(4),
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.875rem',
  minWidth: 'unset',
  padding: theme.spacing(1, 2),
  marginRight: theme.spacing(2),
  color: theme.palette.text.primary,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    '& fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.12)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.24)',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: 1,
    },
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: '8px',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0, 0, 0, 0.12)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0, 0, 0, 0.24)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
    borderWidth: 1,
  },
}));

// Tipos
type ContentType = 'image' | 'video' | 'text' | 'banner' | 'story';
type ContentNature = 'paid' | 'organic';
type PlatformType = 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'website' | 'meta_ads' | 'google_ads';
type ExpandableSections = 'contentPlan' | 'approvalWorkflow' | 'attachments';

interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  platform: PlatformType;
  nature: ContentNature;
  dueDate: string;
  assignedTo: string;
  budget?: number;
  notes?: string;
}

type Attachment = {
  id: string;
  name: string;
  size: number;
  type: string;
};

type FormValues = {
  id?: string;
  campaignName: string;
  campaignType: string;
  objective: string;
  targetAudience: string;
  budget: number;
  paidTrafficBudget: number;
  contentBudget: number;
  startDate: Date | null;
  endDate: Date | null;
  primaryChannel: string;
  secondaryChannels: string[];
  keyMessages: string;
  successMetrics: string;
  kpis: {
    roas: number;
    ctr: number;
    engagementRate: number;
  };
  competitorAnalysis: string;
  requiresApproval: boolean;
  template: string;
  contentPlan: {
    items: ContentItem[];
  };
  approvalWorkflow: string[];
  progressMetrics: {
    targetProgress: number;
    reviewStages: string[];
  };
  attachments: Attachment[];
  status?: string;
  createdAt?: string;
};

// Constantes
const campaignTemplates = [
  { value: 'institutional', label: 'Institucional' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'leadgen', label: 'Geração de Leads' },
  { value: 'branding', label: 'Branding' }
];

const contentTypes = [
  { value: 'image', label: 'Imagem' },
  { value: 'video', label: 'Vídeo' },
  { value: 'text', label: 'Texto' },
  { value: 'banner', label: 'Banner' },
  { value: 'story', label: 'Story' }
];

const platforms = [
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'meta_ads', label: 'Meta Ads' },
  { value: 'google_ads', label: 'Google Ads' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'website', label: 'Website' }
];

const channels = [
  'Facebook',
  'Instagram',
  'Meta Ads',
  'Google Ads',
  'Email Marketing',
  'LinkedIn',
  'Twitter/X',
  'TikTok',
  'Outros'
];

const teamMembers = [
  'Ana Silva (Design)',
  'Carlos Mendes (Redação)',
  'João Santos (Mídia)',
  'Maria Oliveira (Gerente)'
];

const CampaignBriefing = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Record<ExpandableSections, boolean>>({
    contentPlan: true,
    approvalWorkflow: true,
    attachments: true
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { control, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      campaignName: '',
      campaignType: '',
      objective: '',
      targetAudience: '',
      budget: 0,
      paidTrafficBudget: 0,
      contentBudget: 0,
      startDate: null,
      endDate: null,
      primaryChannel: '',
      secondaryChannels: [],
      keyMessages: '',
      successMetrics: '',
      kpis: {
        roas: 2.5,
        ctr: 2.0,
        engagementRate: 3.0
      },
      competitorAnalysis: '',
      requiresApproval: false,
      template: '',
      contentPlan: {
        items: []
      },
      approvalWorkflow: [],
      progressMetrics: {
        targetProgress: 20,
        reviewStages: ['Rascunho', 'Revisão', 'Aprovação', 'Publicação']
      },
      attachments: [],
      status: 'draft'
    }
  });

  const { fields: contentItems, append: appendContentItem, remove: removeContentItem } = useFieldArray({
    control,
    name: 'contentPlan.items'
  });

  const { fields: attachments, append: appendAttachment, remove: removeAttachment } = useFieldArray({
    control,
    name: 'attachments'
  });

  const toggleSection = (section: ExpandableSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const onSubmit = (data: FormValues) => {
    try {
      const campaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
      const newCampaign = { 
        ...data, 
        id: Date.now().toString(),
        status: 'draft',
        createdAt: new Date().toISOString()
      };
      campaigns.push(newCampaign);
      localStorage.setItem('campaigns', JSON.stringify(campaigns));
      setOpenSnackbar(true);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      console.error('Erro ao salvar briefing:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files).map(file => ({
        id: `file-${Date.now()}-${file.name}`,
        name: file.name,
        size: file.size,
        type: file.type
      }));

      appendAttachment(files);
      event.target.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const watchBudget = watch('budget');
  const watchStartDate = watch('startDate');

  const addContentItem = () => {
    appendContentItem({
      id: `item-${Date.now()}`,
      title: '',
      type: 'image',
      platform: 'facebook',
      nature: 'organic',
      dueDate: watchStartDate?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
      assignedTo: teamMembers[0],
      notes: ''
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <GlassPaper>
        <Typography variant="h4" component="h1" gutterBottom sx={{ 
          mb: 4,
          fontWeight: 600,
          letterSpacing: '-0.02em',
          color: 'text.primary'
        }}>
          Novo Briefing de Campanha
        </Typography>

        <StyledTabs value={activeTab} onChange={handleTabChange}>
          <StyledTab label="Informações Básicas" />
          <StyledTab label="Estratégia" />
          <StyledTab label="Conteúdo" />
          <StyledTab label="Anexos" />
          <StyledTab label="Revisão" />
        </StyledTabs>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          {activeTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <SectionHeader variant="h6">
                  Template e Informações Gerais
                </SectionHeader>
                <Divider sx={{ mb: 3 }} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="campaignName"
                  control={control}
                  rules={{ required: 'Nome da campanha é obrigatório' }}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      label="Nome da Campanha"
                      variant="outlined"
                      fullWidth
                      error={!!errors.campaignName}
                      helperText={errors.campaignName?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="template"
                  control={control}
                  render={({ field }) => {
                    const currentValue = campaignTemplates.find(
                      (option) => option.value === field.value
                    ) || null;

                    return (
                      <Autocomplete
                        options={campaignTemplates}
                        getOptionLabel={(option) => option.label}
                        value={currentValue}
                        onChange={(_, newValue) => {
                          field.onChange(newValue ? newValue.value : '');
                        }}
                        renderInput={(params) => (
                          <StyledTextField 
                            {...params} 
                            label="Template de Campanha" 
                            variant="outlined" 
                          />
                        )}
                      />
                    );
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="objective"
                  control={control}
                  rules={{ required: 'Objetivo é obrigatório' }}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      label="Objetivo Principal"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={2}
                      error={!!errors.objective}
                      helperText={errors.objective?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="campaignType"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Tipo de Campanha</InputLabel>
                      <StyledSelect
                        {...field}
                        label="Tipo de Campanha"
                      >
                        <MenuItem value="paid">Tráfego Pago</MenuItem>
                        <MenuItem value="organic">Conteúdo Orgânico</MenuItem>
                        <MenuItem value="integrated">Integrada (Pago + Orgânico)</MenuItem>
                      </StyledSelect>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  name="startDate"
                  control={control}
                  rules={{ required: 'Data de início é obrigatória' }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Data de Início"
                      format="dd/MM/yyyy"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.startDate,
                          helperText: errors.startDate?.message
                        }
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  name="endDate"
                  control={control}
                  rules={{ required: 'Data de término é obrigatória' }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Data de Término"
                      format="dd/MM/yyyy"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.endDate,
                          helperText: errors.endDate?.message
                        }
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  name="budget"
                  control={control}
                  rules={{ 
                    required: 'Orçamento é obrigatório',
                    min: { value: 1000, message: 'Mínimo de R$ 1.000' }
                  }}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      label="Orçamento Total (R$)"
                      type="number"
                      variant="outlined"
                      fullWidth
                      InputProps={{ inputProps: { min: 1000, step: 500 } }}
                      error={!!errors.budget}
                      helperText={errors.budget?.message}
                    />
                  )}
                />
              </Grid>

              {watchBudget > 0 && (
                <>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="paidTrafficBudget"
                      control={control}
                      render={({ field }) => (
                        <StyledTextField
                          {...field}
                          label="Orçamento Tráfego Pago (R$)"
                          type="number"
                          variant="outlined"
                          fullWidth
                          InputProps={{ inputProps: { max: watchBudget, min: 0, step: 500 } }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="contentBudget"
                      control={control}
                      render={({ field }) => (
                        <StyledTextField
                          {...field}
                          label="Orçamento Conteúdo (R$)"
                          type="number"
                          variant="outlined"
                          fullWidth
                          InputProps={{ inputProps: { max: watchBudget, min: 0, step: 500 } }}
                        />
                      )}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          )}

          {activeTab === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <SectionHeader variant="h6">
                  Canais e Público-Alvo
                </SectionHeader>
                <Divider sx={{ mb: 3 }} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="primaryChannel"
                  control={control}
                  rules={{ required: 'Canal principal é obrigatório' }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.primaryChannel}>
                      <InputLabel>Canal Principal</InputLabel>
                      <StyledSelect
                        {...field}
                        label="Canal Principal"
                      >
                        {channels.map(channel => (
                          <MenuItem key={channel} value={channel}>
                            {channel}
                          </MenuItem>
                        ))}
                      </StyledSelect>
                      {errors.primaryChannel && (
                        <Typography variant="caption" color="error">
                          {errors.primaryChannel.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="secondaryChannels"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Canais Secundários</InputLabel>
                      <StyledSelect
                        {...field}
                        multiple
                        label="Canais Secundários"
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {(selected as string[]).map((value) => (
                              <Chip key={value} label={value} size="small" />
                            ))}
                          </Box>
                        )}
                      >
                        {channels.map(channel => (
                          <MenuItem key={channel} value={channel}>
                            <Checkbox checked={field.value.includes(channel)} />
                            {channel}
                          </MenuItem>
                        ))}
                      </StyledSelect>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="targetAudience"
                  control={control}
                  rules={{ required: 'Público-alvo é obrigatório' }}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      label="Público-Alvo (Gênero, Idade, Interesses)"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={3}
                      error={!!errors.targetAudience}
                      helperText={errors.targetAudience?.message}
                      placeholder="Ex: 72.6% mulheres, 25-60 anos, interessadas em causas sociais"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <SectionHeader variant="h6" sx={{ mt: 4 }}>
                  KPIs e Métricas
                </SectionHeader>
                <Divider sx={{ mb: 3 }} />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  name="kpis.roas"
                  control={control}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      label="ROAS Mínimo"
                      type="number"
                      variant="outlined"
                      fullWidth
                      InputProps={{ inputProps: { min: 0, step: 0.1 } }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  name="kpis.ctr"
                  control={control}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      label="CTR Mínimo (%)"
                      type="number"
                      variant="outlined"
                      fullWidth
                      InputProps={{ inputProps: { min: 0, max: 100, step: 0.1 } }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  name="kpis.engagementRate"
                  control={control}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      label="Taxa de Engajamento (%)"
                      type="number"
                      variant="outlined"
                      fullWidth
                      InputProps={{ inputProps: { min: 0, max: 100, step: 0.1 } }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="keyMessages"
                  control={control}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      label="Mensagens-Chave"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Principais mensagens a serem comunicadas"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="successMetrics"
                  control={control}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      label="Métricas de Sucesso"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Como o sucesso será medido (ex: 1000 leads, 5% conversão)"
                    />
                  )}
                />
              </Grid>
            </Grid>
          )}

          {activeTab === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SectionHeader>Plano de Conteúdo</SectionHeader>
                  <IconButton 
                    onClick={() => toggleSection('contentPlan')} 
                    size="small" 
                    sx={{ ml: 1 }}
                  >
                    {expandedSections.contentPlan ? <FiChevronUp /> : <FiChevronDown />}
                  </IconButton>
                </Box>
                <Divider sx={{ mb: 3 }} />
                {expandedSections.contentPlan && (
                  <>
                    <Box sx={{ mb: 3 }}>
                      <PrimaryButton
                        variant="outlined"
                        startIcon={<FiPlus />}
                        onClick={addContentItem}
                        sx={{ mb: 2 }}
                      >
                        Adicionar Item
                      </PrimaryButton>

                      {contentItems.map((field, index) => (
                        <ContentCard key={field.id}>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={6}>
                              <Controller
                                name={`contentPlan.items.${index}.title`}
                                control={control}
                                rules={{ required: 'Título é obrigatório' }}
                                render={({ field }) => (
                                  <StyledTextField
                                    {...field}
                                    label="Título do Conteúdo"
                                    fullWidth
                                    error={!!errors.contentPlan?.items?.[index]?.title}
                                    helperText={errors.contentPlan?.items?.[index]?.title?.message}
                                  />
                                )}
                              />
                            </Grid>

                            <Grid item xs={6} md={2}>
                              <Controller
                                name={`contentPlan.items.${index}.type`}
                                control={control}
                                render={({ field }) => (
                                  <FormControl fullWidth>
                                    <InputLabel>Tipo</InputLabel>
                                    <StyledSelect {...field} label="Tipo">
                                      {contentTypes.map(type => (
                                        <MenuItem key={type.value} value={type.value}>
                                          {type.label}
                                        </MenuItem>
                                      ))}
                                    </StyledSelect>
                                  </FormControl>
                                )}
                              />
                            </Grid>

                            <Grid item xs={6} md={2}>
                              <Controller
                                name={`contentPlan.items.${index}.platform`}
                                control={control}
                                render={({ field }) => (
                                  <FormControl fullWidth>
                                    <InputLabel>Plataforma</InputLabel>
                                    <StyledSelect {...field} label="Plataforma">
                                      {platforms.map(platform => (
                                        <MenuItem key={platform.value} value={platform.value}>
                                          {platform.label}
                                        </MenuItem>
                                      ))}
                                    </StyledSelect>
                                  </FormControl>
                                )}
                              />
                            </Grid>

                            <Grid item xs={6} md={2}>
                              <Controller
                                name={`contentPlan.items.${index}.nature`}
                                control={control}
                                render={({ field }) => (
                                  <FormControl fullWidth>
                                    <InputLabel>Tipo</InputLabel>
                                    <StyledSelect {...field} label="Tipo">
                                      <MenuItem value="organic">Orgânico</MenuItem>
                                      <MenuItem value="paid">Pago</MenuItem>
                                    </StyledSelect>
                                  </FormControl>
                                )}
                              />
                            </Grid>

                            {watch(`contentPlan.items.${index}.nature`) === 'paid' && (
                              <Grid item xs={6} md={2}>
                                <Controller
                                  name={`contentPlan.items.${index}.budget`}
                                  control={control}
                                  render={({ field }) => (
                                    <StyledTextField
                                      {...field}
                                      label="Orçamento (R$)"
                                      type="number"
                                      fullWidth
                                      InputProps={{ inputProps: { min: 0 } }}
                                    />
                                  )}
                                />
                              </Grid>
                            )}

                            <Grid item xs={6} md={2}>
                              <Controller
                                name={`contentPlan.items.${index}.dueDate`}
                                control={control}
                                render={({ field }) => (
                                  <StyledTextField
                                    {...field}
                                    label="Data de Entrega"
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                  />
                                )}
                              />
                            </Grid>

                            <Grid item xs={6} md={2}>
                              <Controller
                                name={`contentPlan.items.${index}.assignedTo`}
                                control={control}
                                render={({ field }) => (
                                  <FormControl fullWidth>
                                    <InputLabel>Responsável</InputLabel>
                                    <StyledSelect {...field} label="Responsável">
                                      {teamMembers.map(member => (
                                        <MenuItem key={member} value={member}>
                                          {member}
                                        </MenuItem>
                                      ))}
                                    </StyledSelect>
                                  </FormControl>
                                )}
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <Controller
                                name={`contentPlan.items.${index}.notes`}
                                control={control}
                                render={({ field }) => (
                                  <StyledTextField
                                    {...field}
                                    label="Observações"
                                    fullWidth
                                    multiline
                                    rows={2}
                                  />
                                )}
                              />
                            </Grid>

                            <Grid item xs={12} sx={{ textAlign: 'right' }}>
                              <IconButton
                                onClick={() => removeContentItem(index)}
                                color="error"
                                sx={{ mt: -1 }}
                              >
                                <FiTrash2 />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </ContentCard>
                      ))}
                    </Box>

                    <Grid item xs={12}>
                      <SectionHeader>
                        Fluxo de Aprovação
                      </SectionHeader>
                      <Divider sx={{ mb: 2 }} />
                      <Controller
                        name="approvalWorkflow"
                        control={control}
                        render={({ field }) => (
                          <Autocomplete
                            multiple
                            options={teamMembers}
                            value={field.value}
                            onChange={(_, newValue) => field.onChange(newValue)}
                            renderInput={(params) => (
                              <StyledTextField
                                {...params}
                                label="Ordem de Aprovação"
                                placeholder="Selecione os aprovadores"
                              />
                            )}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  label={option}
                                  {...getTagProps({ index })}
                                  size="small"
                                />
                              ))
                            }
                          />
                        )}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          )}

          {activeTab === 3 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SectionHeader>Documentos Anexados</SectionHeader>
                  <IconButton 
                    onClick={() => toggleSection('attachments')} 
                    size="small" 
                    sx={{ ml: 1 }}
                  >
                    {expandedSections.attachments ? <FiChevronUp /> : <FiChevronDown />}
                  </IconButton>
                </Box>
                <Divider sx={{ mb: 3 }} />
                {expandedSections.attachments && (
                  <>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx"
                      multiple
                      style={{ display: 'none' }}
                    />
                    <PrimaryButton
                      variant="outlined"
                      startIcon={<FiPaperclip />}
                      onClick={triggerFileInput}
                      sx={{ mb: 3 }}
                    >
                      Anexar Documentos
                    </PrimaryButton>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Formatos aceitos: PDF, DOC, DOCX (Máx. 10MB cada)
                    </Typography>

                    {attachments.length > 0 ? (
                      <List sx={{ bgcolor: 'background.paper', borderRadius: '8px' }}>
                        {attachments.map((file, index) => (
                          <ListItem
                            key={file.id}
                            secondaryAction={
                              <IconButton edge="end" onClick={() => removeAttachment(index)}>
                                <FiX />
                              </IconButton>
                            }
                          >
                            <ListItemIcon>
                              <FiFile />
                            </ListItemIcon>
                            <ListItemText
                              primary={file.name}
                              secondary={formatFileSize(file.size)}
                            />
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Nenhum documento anexado ainda
                      </Typography>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
          )}

          {activeTab === 4 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <SectionHeader>
                  Revisão Final
                </SectionHeader>
                <Divider sx={{ mb: 3 }} />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="competitorAnalysis"
                  control={control}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      label="Análise de Concorrentes"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={6}
                      placeholder="Descreva a análise dos principais concorrentes..."
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="requiresApproval"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          color="primary"
                        />
                      }
                      label="Requer aprovação antes de iniciar"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" paragraph>
                  Verifique todas as informações antes de enviar. Este briefing será usado para planejar toda a campanha de marketing.
                </Typography>
              </Grid>
            </Grid>
          )}

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <SecondaryButton 
              variant="outlined" 
              size="large"
              disabled={activeTab === 0}
              onClick={() => setActiveTab(prev => prev - 1)}
            >
              Voltar
            </SecondaryButton>
            
            {activeTab < 4 ? (
              <PrimaryButton 
                variant="contained" 
                size="large"
                onClick={() => setActiveTab(prev => prev + 1)}
              >
                Próximo
              </PrimaryButton>
            ) : (
              <PrimaryButton 
                type="submit" 
                variant="contained" 
                size="large"
                sx={{ px: 4 }}
              >
                Enviar Briefing
              </PrimaryButton>
            )}
          </Grid>
        </form>
      </GlassPaper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          sx={{ 
            width: '100%',
            backdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          Briefing salvo com sucesso!
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  );
};

export default CampaignBriefing;