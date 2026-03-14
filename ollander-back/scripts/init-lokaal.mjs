/**
 * Maakt de DynamoDB-tabel aan in de lokale instantie.
 * Éénmalig uitvoeren na `docker compose up -d`.
 *
 * Gebruik:
 *   DYNAMODB_ENDPOINT=http://localhost:8000 node scripts/init-lokaal.mjs
 */

import { DynamoDBClient, CreateTableCommand, ListTablesCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({
  region: 'eu-west-3',
  endpoint: process.env.DYNAMODB_ENDPOINT ?? 'http://localhost:8000',
});

const { TableNames } = await client.send(new ListTablesCommand({}));

if (TableNames.includes('ollander_registraties')) {
  console.log('Tabel bestaat al, niets te doen.');
  process.exit(0);
}

await client.send(new CreateTableCommand({
  TableName: 'ollander_registraties',
  AttributeDefinitions: [{ AttributeName: 'ip', AttributeType: 'S' }],
  KeySchema: [{ AttributeName: 'ip', KeyType: 'HASH' }],
  BillingMode: 'PAY_PER_REQUEST',
}));

console.log('Tabel ollander_registraties aangemaakt.');