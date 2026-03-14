import { verwerkVerzoek, registreerRoute, antwoord } from './routes/router.mjs';

// Routes worden hier geregistreerd bij het laden van de Lambda
// Elke route-module registreert zichzelf
import './routes/init.mjs';

export const handler = async (event) => {
  console.log('Inkomend verzoek:', JSON.stringify(event));

  // CORS preflight afhandelen
  if (event.httpMethod === 'OPTIONS' || event.requestContext?.http?.method === 'OPTIONS') {
    return antwoord(200, {});
  }

  return verwerkVerzoek(event);
};
