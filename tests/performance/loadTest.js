import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';

// Métricas customizadas
const errorRate = new Rate('errors');
const requestDuration = new Trend('request_duration');

export const options = {
  stages: [
    { duration: '2m', target: 100 },  // Rampa de subida
    { duration: '5m', target: 300 },  // Carga sustentada
    { duration: '1m', target: 0 },    // Rampa de descida
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],   // Menos de 1% de erros
    http_req_duration: ['p(95)<500'], // 95% das requisições < 500ms
  },
};

export default function () {
  const endpoints = [
    { method: 'GET', path: '/api/campaigns' },
    { method: 'POST', path: '/api/briefings', body: JSON.stringify({ title: 'Teste' }) },
  ];

  endpoints.forEach(({ method, path, body }) => {
    const res = http.request(method, `${__ENV.API_URL}${path}`, body || null, {
      headers: {
        'Authorization': __ENV.API_TOKEN,
        'Content-Type': 'application/json',
      },
    });

    // Registra métricas
    check(res, { 'status was 200': (r) => r.status === 200 }) || errorRate.add(1);
    requestDuration.add(res.timings.duration);

    sleep(1);
  });
}