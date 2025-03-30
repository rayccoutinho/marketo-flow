// tests/performance/k6.conf.js
export const STAGING_CONFIG = {
    vus: 50,
    duration: '5m',
    thresholds: {
      http_req_failed: ['rate<0.01'],
      http_req_duration: ['p(95)<500']
    }
  };
  
  export const PRODUCTION_CONFIG = {
    vus: 100,
    duration: '10m',
    thresholds: {
      http_req_failed: ['rate<0.005'],
      http_req_duration: ['p(95)<300']
    }
  };