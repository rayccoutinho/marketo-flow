import http from 'k6/http';
import { check, group } from 'k6';

export const options = {
  vus: 100,
  duration: '5m',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500'],
    checks: ['rate>0.99']
  }
};

export default function () {
  // Verifique se as variáveis de ambiente estão definidas
  if (!__ENV.API_URL || !__ENV.API_TOKEN) {
    throw new Error('Variáveis de ambiente não configuradas!');
  }

  // Execute uma requisição real para um endpoint válido
  const res = http.get(`${__ENV.API_URL}/api/v1/healthcheck`, {
    headers: {
      'Authorization': __ENV.API_TOKEN,
      'Content-Type': 'application/json'
    }
  });

  // Adicione verificações significativas
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500
  });
}