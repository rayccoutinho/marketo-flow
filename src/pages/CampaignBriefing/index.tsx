import React from 'react';
import { useForm, Controller } from 'react-hook-form';
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
  Tab
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ptBR from 'date-fns/locale/pt-BR';

type FormValues = {
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
};

const campaignTemplates = [
  { value: 'institutional', label: 'Institucional (ex: Casas André Luiz)' },
  { value: 'ecommerce', label: 'E-commerce (ex: Mercatudo)' },
  { value: 'leadgen', label: 'Geração de Leads' },
  { value: 'branding', label: 'Branding' }
];

const channels = [
  'Meta Ads',
  'Google Ads',
  'Email Marketing',
  'LinkedIn',
  'Twitter/X',
  'Instagram',
  'TikTok',
  'Outros'
];

const competitorFields = [
  'Estratégia de Conteúdo',
  'Investimento em Ads',
  'Canais Prioritários',
  'Taxa de Engajamento'
];

const CampaignBriefing = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const { control, handleSubmit, formState: { errors }, watch } = useForm<FormValues>({
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
      template: ''
    }
  });

  const onSubmit = (data: FormValues) => {
    console.log('Dados do briefing:', data);
    alert('Briefing enviado com sucesso!');
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const watchBudget = watch('budget');

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Box component={Paper} elevation={3} sx={{ p: 4, maxWidth: 1200, mx: 'auto', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
          Novo Briefing de Campanha
        </Typography>

        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 4 }}>
          <Tab label="Informações Básicas" />
          <Tab label="Estratégia" />
          <Tab label="Análise Competitiva" />
          <Tab label="Revisão" />
        </Tabs>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          {activeTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Template e Informações Gerais
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="campaignName"
                  control={control}
                  rules={{ required: 'Nome da campanha é obrigatório' }}
                  render={({ field }) => (
                    <TextField
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
            <TextField 
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
                    <TextField
                      {...field}
                      label="Objetivo Principal"
                      variant="outlined"
                      fullWidth
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
                      <Select
                        {...field}
                        label="Tipo de Campanha"
                      >
                        <MenuItem value="paid">Tráfego Pago</MenuItem>
                        <MenuItem value="organic">Conteúdo Orgânico</MenuItem>
                        <MenuItem value="integrated">Integrada (Pago + Orgânico)</MenuItem>
                      </Select>
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
                    <TextField
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
                        <TextField
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
                        <TextField
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
                <Typography variant="h6" gutterBottom>
                  Canais e Público-Alvo
                </Typography>
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
                      <Select
                        {...field}
                        label="Canal Principal"
                      >
                        {channels.map(channel => (
                          <MenuItem key={channel} value={channel}>
                            {channel}
                          </MenuItem>
                        ))}
                      </Select>
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
                      <Select
                        {...field}
                        multiple
                        label="Canais Secundários"
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {(selected as string[]).map((value) => (
                              <Chip key={value} label={value} />
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
                      </Select>
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
                    <TextField
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
                <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                  KPIs e Métricas
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  name="kpis.roas"
                  control={control}
                  render={({ field }) => (
                    <TextField
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
                    <TextField
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
                    <TextField
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
                    <TextField
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
                    <TextField
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
                <Typography variant="h6" gutterBottom>
                  Análise Competitiva
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Baseado nos briefings institucionais e de produto fornecidos
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="competitorAnalysis"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Análise de Concorrentes"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={8}
                      placeholder={`Exemplo:\n- Concorrente A: Investe pesado em Meta Ads (R$50k/mês)\n- Concorrente B: Conteúdo orgânico forte no Instagram\n- Diferencial nosso: ${watch('template') === 'institutional' ? 'Transparência nas doações' : 'Preços competitivos nos bazares'}`}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Campos sugeridos para análise:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {competitorFields.map(field => (
                    <Chip key={field} label={field} variant="outlined" />
                  ))}
                </Box>
              </Grid>
            </Grid>
          )}

          {activeTab === 3 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Revisão Final
                </Typography>
                <Divider sx={{ mb: 3 }} />
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
                  Verifique todas as informações antes de enviar. Este briefing será usado para planejar toda a campanha de marketing, incluindo tráfego pago, conteúdo orgânico e análise de resultados.
                </Typography>
              </Grid>
            </Grid>
          )}

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button 
              variant="outlined" 
              size="large"
              disabled={activeTab === 0}
              onClick={() => setActiveTab(prev => prev - 1)}
            >
              Voltar
            </Button>
            
            {activeTab < 3 ? (
              <Button 
                variant="contained" 
                size="large"
                onClick={() => setActiveTab(prev => prev + 1)}
              >
                Próximo
              </Button>
            ) : (
              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                sx={{ px: 4 }}
              >
                Enviar Briefing
              </Button>
            )}
          </Grid>
        </form>
      </Box>
    </LocalizationProvider>
  );
};

export default CampaignBriefing;