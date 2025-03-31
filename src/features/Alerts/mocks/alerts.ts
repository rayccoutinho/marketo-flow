// src/features/Alerts/mocks/alerts.ts
import { Alert } from '../types/alert';

export const ALERTS_DATA: Alert[] = [
  {
    id: '1',
    title: 'CTR abaixo do esperado',
    message: 'O CTR da campanha "Black Friday" está 20% abaixo da média histórica',
    severity: 'high',
    channel: 'google-ads',
    timestamp: '2023-11-15T09:30:00',
    campaignId: 'campaign-1'
  },
  {
    id: '2',
    title: 'Orçamento esgotando',
    message: 'O orçamento diário da campanha "Natal 2023" está 90% utilizado',
    severity: 'critical',
    channel: 'meta',
    timestamp: '2023-12-20T14:45:00',
    campaignId: 'campaign-2'
  },
  {
    id: '3',
    title: 'Conversão acima do esperado',
    message: 'A campanha "Dia das Mães" está com conversão 35% acima da média',
    severity: 'medium',
    channel: 'tiktok',
    timestamp: '2023-05-05T11:15:00',
    campaignId: 'campaign-3'
  },
  {
    id: '4',
    title: 'Taxa de rejeição alta',
    message: 'A landing page da campanha atual tem taxa de rejeição de 65%',
    severity: 'high',
    channel: 'email',
    timestamp: '2023-09-10T16:20:00'
  }
];