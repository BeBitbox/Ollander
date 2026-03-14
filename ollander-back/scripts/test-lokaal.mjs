/**
 * Roept de Lambda handler aan met nep-events, zonder API Gateway.
 *
 * Gebruik:
 *   DYNAMODB_ENDPOINT=http://localhost:8000 node scripts/test-lokaal.mjs
 */

import { handler } from '../src/index.mjs';

function maakGetEvent(pad, ip = '1.2.3.4') {
  return {
    httpMethod: 'GET',
    path: pad,
    headers: {},
    requestContext: {
      identity: { sourceIp: ip },
    },
  };
}

async function roepAan(beschrijving, event) {
  console.log(`\n--- ${beschrijving} ---`);
  const resultaat = await handler(event);
  console.log('Status:', resultaat.statusCode);
  console.log('Body:  ', resultaat.body);
}

await roepAan('GET /api/init (nieuw IP)', maakGetEvent('/api/init', '10.0.0.1'));
await roepAan('GET /api/init (zelfde IP, tweede keer)', maakGetEvent('/api/init', '10.0.0.1'));
await roepAan('GET /api/init (ander IP)', maakGetEvent('/api/init', '10.0.0.2'));
await roepAan('Onbekende route', maakGetEvent('/api/onbekend'));