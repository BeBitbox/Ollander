import { registreerRoute, antwoord } from './router.mjs';
import { zoekOpIp, voegRegistratieToe } from '../db/registraties.mjs';

// GET /api/init
// Controleert of het IP-adres al bekend is en retourneert naam + quizstatus.
registreerRoute('GET', '/api/init', async (event) => {
  const ip =
    event.requestContext?.identity?.sourceIp ??
    event.requestContext?.http?.sourceIp ??
    event.headers?.['x-forwarded-for']?.split(',')[0].trim() ??
    'onbekend';

  let registratie = await zoekOpIp(ip);

  if (!registratie) {
    registratie = await voegRegistratieToe(ip);
  }

  return antwoord(200, {
    naam: registratie.naam,
    quizGedaan: registratie.quizGedaan,
    challenge: registratie.challenge.slice(0, -4),
  });
});
