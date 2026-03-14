import { registreerRoute, antwoord } from './router.mjs';
import { zoekOpIp, werkRegistratieBij, telBeterePlaatsen } from '../db/registraties.mjs';

// POST /api/stop
// Beëindigt de quiz, berekent rank en geeft resultaten terug.
registreerRoute('POST', '/api/stop', async (event) => {
  const ip =
    event.requestContext?.identity?.sourceIp ??
    event.requestContext?.http?.sourceIp ??
    event.headers?.['x-forwarded-for']?.split(',')[0].trim() ??
    'onbekend';

  const body = JSON.parse(event.body ?? '{}');
  const { challenge, score } = body;

  // Stap 1 + 2: zoek IP
  const registratie = await zoekOpIp(ip);
  if (!registratie) {
    return antwoord(200, { success: false });
  }

  // Stap 3: valideer status
  if (registratie.stop && registratie.rank > 0) {
    await werkRegistratieBij(ip, { blocked: true });
    return antwoord(200, { success: false });
  }

  if (!registratie.start) {
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

  // Stap 4: bereken resultaten en sla op
  const stopTijd = new Date().toISOString();
  const tijd = new Date(stopTijd).getTime() - new Date(registratie.start).getTime();
  const rank = tijd + (10 - score) * 7000;

  await werkRegistratieBij(ip, {
    score,
    stop: stopTijd,
    rank,
    quizGedaan: true,
  });

  const plaats = await telBeterePlaatsen(rank);

  return antwoord(200, {
    success: true,
    naam: registratie.naam,
    score,
    tijd,
    plaats,
  });
});
