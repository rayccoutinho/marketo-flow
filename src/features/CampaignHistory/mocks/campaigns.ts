// src/features/CampaignHistory/mocks/campaigns.ts
import { Campaign } from '../types/campaign';

export const CAMPAIGN_DATA: Campaign[] = [
  {
    id: '1',
    name: 'Black Friday 2023',
    channel: 'Google Ads',
    startDate: '2023-11-20',
    endDate: '2023-11-27',
    investment: 15000,
    roi: 42.5,
    status: 'completed',
    impressions: 125000,
    clicks: 8500,
    conversions: 420
  },
  {
    id: '2',
    name: 'Natal 2023',
    channel: 'Meta Ads',
    startDate: '2023-12-01',
    endDate: '2023-12-25',
    investment: 20000,
    roi: 38.2,
    status: 'completed',
    impressions: 180000,
    clicks: 12000,
    conversions: 650
  },
  {
    id: '3',
    name: 'Liquidação de Verão',
    channel: 'Google Ads + Meta',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    investment: 25000,
    roi: 28.7,
    status: 'active',
    impressions: 210000,
    clicks: 15000,
    conversions: 720
  },
  {
    id: '4',
    name: 'Dia das Mães',
    channel: 'TikTok Ads',
    startDate: '2024-05-01',
    endDate: '2024-05-12',
    investment: 18000,
    roi: 15.3,
    status: 'paused',
    impressions: 95000,
    clicks: 5200,
    conversions: 280
  }
];