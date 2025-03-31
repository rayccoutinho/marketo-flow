// src/features/Alerts/types/alert.ts
export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';
export type AlertChannel = 'google-ads' | 'meta' | 'tiktok' | 'email' | 'all';

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  channel: AlertChannel;
  timestamp: string;
  campaignId?: string;
  read?: boolean;
  link?: string;
}

export interface AlertFilter {
  search?: string;
  severity?: AlertSeverity;
  channel?: AlertChannel;
  unreadOnly?: boolean;
}

// Adicione esta linha para garantir que o arquivo seja tratado como módulo
export {};