import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],  // Less than 1% failures
    http_req_duration: ['p(95)<500'], // 95% of requests under 500ms
    checks: ['rate>0.99']             // More than 99% success rate
  }
};

export default function () {
  const res = http.get(`${__ENV.API_URL}/campaigns`, {
    headers: { Authorization: __ENV.API_TOKEN }
  });
  check(res, { 'status was 200': (r) => r.status === 200 });
}