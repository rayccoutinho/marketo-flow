export interface Campaign {
    id: string;
    name: string;
    status: 'active' | 'paused' | 'completed';
    progress: number;
    budget: number;
    spent: number;
    startDate: string;
    endDate: string;
    channel: 'email' | 'social' | 'ads' | 'seo';
    engagementRate?: number;
    impressions?: number;
    clicks?: number;
  }
  
  export interface Metric {
    title: string;
    value: number | string;
    change: number;
    icon: React.ReactNode;
  }
  
  export interface ChartData {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor?: string[];
      borderWidth?: number;
    }[];
  }