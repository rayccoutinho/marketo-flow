// tests/utils/helpers.js
export function validateResponse(response) {
    if (!response) throw new Error('Resposta vazia');
    if (response.status >= 400) throw new Error(`HTTP ${response.status}`);
  }