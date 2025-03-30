// tests/performance/config/thresholds.js
export const thresholds = {
    http_req_failed: ['rate<0.01'],     // Menos de 1% de falhas
    http_req_duration: ['p(95)<500'],   // 95% das requisições abaixo de 500ms
    checks: ['rate>0.99']               // Taxa de sucesso > 99%
  };