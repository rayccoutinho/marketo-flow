// src/utils/types.ts
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export interface CampaignRow {
  id: number;
  name: string;
  status: 'Ativa' | 'Pausada' | 'Concluída';
  budget: number;
  clicks: number;
  impressions: number;
  startDate: string;
  endDate: string;
}

export interface MetricCardProps {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  title: string;
  value: string | number;
  color: string;
}

export const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', { 
    style: 'currency', 
    currency: 'BRL' 
  });
};