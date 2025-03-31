// src/features/CampaignHistory/types/campaign.ts
export interface Campaign {
    id: string;
    name: string;
    channel: string;
    startDate: string;
    endDate: string;
    investment: number;
    roi: number;
    status: 'active' | 'completed' | 'paused';
    impressions?: number;
    clicks?: number;
    conversions?: number;
  }