import { registreerRoute, antwoord } from './router.mjs';
import { haalTopTienOp } from '../db/registraties.mjs';

// GET /api/top
// Geeft de top 10 deelnemers terug gesorteerd op rank (laagste eerst).
registreerRoute('GET', '/api/top', async () => {
  const items = await haalTopTienOp();

  const top = items.map((item, index) => ({
    naam: item.naam,
    score: item.score,
    tijd: new Date(item.stop).getTime() - new Date(item.start).getTime(),
    plaats: index + 1,
  }));

  return antwoord(200, top);
});
