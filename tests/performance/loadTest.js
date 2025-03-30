import { STAGING_CONFIG, PRODUCTION_CONFIG } from './k6.conf.js';
import { check } from 'k6';
import http from 'k6/http';

// Validação inicial dos ambientes
const ENV = __ENV.ENVIRONMENT || 'staging';
if (!['staging', 'production'].includes(ENV)) {
  throw new Error(`Ambiente inválido: ${ENV}`);
}

// Configuração dinâmica
const CONFIG = ENV === 'production' ? PRODUCTION_CONFIG : STAGING_CONFIG;

// Verificação crítica dos tokens
if (!__ENV.API_TOKEN || !__ENV.K6_CLOUD_TOKEN) {
  throw new Error('Tokens de API não configurados!');
}

if (__ENV.API_TOKEN !== __ENV.K6_CLOUD_TOKEN) {
  console.warn('AVISO: Tokens diferentes configurados para API e K6 Cloud');
}

export const options = {
  ...CONFIG,
  ext: {
    loadimpact: {
      projectID: 3687857,
      name: `Teste de Carga - ${ENV}`
    }
  }
};

// Endpoints mapeados
const ENDPOINTS = {
  HEALTHCHECK: '/health',
  CAMPAIGNS: '/campaigns'
};

// Função principal
export default function () {
  const params = {
    headers: {
      'Authorization': __ENV.API_TOKEN,
      'Content-Type': 'application/json',
      'X-Test-Environment': ENV
    },
    timeout: '30s'
  };

  try {
    // Teste de healthcheck
    const healthRes = http.get(`${__ENV.API_URL}${ENDPOINTS.HEALTHCHECK}`, params);
    
    check(healthRes, {
      'Healthcheck - status 200': (r) => r.status === 200,
      'Healthcheck - tempo < 500ms': (r) => r.timings.duration < 500
    });

    // Teste de listagem de campanhas (opcional)
    if (healthRes.status === 200) {
      const campaignsRes = http.get(`${__ENV.API_URL}${ENDPOINTS.CAMPAIGNS}`, params);
      
      check(campaignsRes, {
        'Campanhas - status 200': (r) => r.status === 200,
        'Campanhas - tempo < 800ms': (r) => r.timings.duration < 800
      });
    }

  } catch (error) {
    console.error(`Erro durante o teste: ${error.message}`);
  }
}