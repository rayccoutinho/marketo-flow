// src/integrations/metaAds.ts
import { FacebookAdsApi, Campaign, AdAccount } from 'facebook-nodejs-business-sdk';

interface IMetaCampaign {
  name: string;
  objective: 'LINK_CLICKS' | 'CONVERSIONS' | 'REACH' | 'BRAND_AWARENESS';
  status: 'ACTIVE' | 'PAUSED';
  special_ad_category?: string;
}

export class MetaAdsService {
  private readonly accessToken: string;
  private readonly account: AdAccount;

  constructor(accessToken: string, accountId: string) {
    this.accessToken = accessToken;
    FacebookAdsApi.init(accessToken); // Inicializa a API globalmente
    this.account = new AdAccount(accountId);
  }

  async createCampaign(campaignData: IMetaCampaign): Promise<Campaign> {
    try {
      const result = await this.account.createCampaign(
        [],
        {
          ...campaignData,
          access_token: this.accessToken, // Corrigido: usa a propriedade diretamente
        }
      );
      
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to create Meta Ads campaign:', error.message);
        throw new Error(`Meta Ads campaign creation failed: ${error.message}`);
      }
      throw new Error('Unknown error occurred while creating campaign');
    }
  }
}