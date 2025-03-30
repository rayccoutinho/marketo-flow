import { STAGING_CONFIG, PRODUCTION_CONFIG } from './k6.conf.js';

const ENV = __ENV.ENVIRONMENT || 'staging';
const CONFIG = ENV === 'production' ? PRODUCTION_CONFIG : STAGING_CONFIG;

export const options = CONFIG;

export default function () {
  const endpoints = {
    campaigns: '/campaigns',
    healthcheck: '/health'
  };

  const res = http.get(`${__ENV.API_URL}${endpoints.healthcheck}`, {
    headers: {
      Authorization: __ENV.API_TOKEN,
      'Content-Type': 'application/json'
    }
  });

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time OK': (r) => r.timings.duration < 500
  });
}