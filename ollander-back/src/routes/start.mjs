import { registreerRoute, antwoord } from './router.mjs';
import { zoekOpIp, werkRegistratieBij } from '../db/registraties.mjs';

// POST /api/start
// Start de quiz voor een gekend IP-adres na validatie van de challenge.
registreerRoute('POST', '/api/start', async (event) => {
  const ip =
    event.requestContext?.identity?.sourceIp ??
    event.requestContext?.http?.sourceIp ??
    event.headers?.['x-forwarded-for']?.split(',')[0].trim() ??
    'onbekend';

  const body = JSON.parse(event.body ?? '{}');
  const { challenge, naam } = body;

  // Stap 1 + 2: zoek IP
  const registratie = await zoekOpIp(ip);
  if (!registratie) {
    return antwoord(200, { success: false });
  }

  // Stap 3: valideer status
  if (registratie.start && registratie.stop && registratie.rank > 0) {
    await werkRegistratieBij(ip, { blocked: true });
    return antwoord(200, { success: false });
  }

  if (challenge !== registratie.challenge) {
    await werkRegistratieBij(ip, { blocked: true });
    return antwoord(200, { success: false });
  }

  if (registratie.blocked) {
    return antwoord(200, { success: false });
  }

  // Stap 4: sla naam en starttijd op
  await werkRegistratieBij(ip, {
    naam: naam ?? '',
    start: new Date().toISOString(),
  });

  return antwoord(200, { success: true });
});
