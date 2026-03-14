const routes = new Map();

export function registreerRoute(methode, pad, handler) {
  routes.set(`${methode.toUpperCase()}:${pad}`, handler);
}

export async function verwerkVerzoek(event) {
  const methode = event.httpMethod ?? event.requestContext?.http?.method ?? 'GET';
  const pad = event.path ?? event.rawPath ?? '/';
  const sleutel = `${methode}:${pad}`;

  const handler = routes.get(sleutel);
  if (!handler) {
    return antwoord(404, { fout: `Route niet gevonden: ${methode} ${pad}` });
  }

  try {
    return await handler(event);
  } catch (fout) {
    console.error('Fout bij verwerken verzoek:', fout);
    return antwoord(500, { fout: 'Interne serverfout' });
  }
}

export function antwoord(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    },
    body: JSON.stringify(body),
  };
}
