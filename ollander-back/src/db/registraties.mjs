import {
  GetCommand,
  PutCommand,
  UpdateCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';
import { docClient } from './client.mjs';

const TABEL = 'ollander_registraties';

/**
 * Data model ollander_registraties:
 * - IP:          String  (primary key)
 * - Naam:        String
 * - QuizGedaan:  Boolean
 * - Challenge:   String
 * - Start:       String  (ISO 8601 timestamp)
 * - Stop:        String  (ISO 8601 timestamp)
 * - Score:       Number
 * - Rank:        Number
 * - Blocked:     Boolean
 */

export async function zoekOpIp(ip) {
  const resultaat = await docClient.send(
    new GetCommand({
      TableName: TABEL,
      Key: { IP: ip },
    })
  );
  return resultaat.Item ?? null;
}

export async function voegRegistratieToe(ip) {
  const item = {
    IP: ip,
    Naam: '',
    QuizGedaan: false,
    Challenge: '',
    Start: '',
    Stop: '',
    Score: 0,
    Rank: 0,
    Blocked: false,
  };
  await docClient.send(
    new PutCommand({
      TableName: TABEL,
      ConditionExpression: 'attribute_not_exists(IP)',
      Item: item,
    })
  );
  return item;
}

export async function werkRegistratieBij(ip, velden) {
  const sleutels = Object.keys(velden);
  const updateExpressie =
    'SET ' + sleutels.map((k) => `#${k} = :${k}`).join(', ');
  const expressieNamen = Object.fromEntries(sleutels.map((k) => [`#${k}`, k]));
  const expressieWaarden = Object.fromEntries(
    sleutels.map((k) => [`:${k}`, velden[k]])
  );

  const resultaat = await docClient.send(
    new UpdateCommand({
      TableName: TABEL,
      Key: { IP: ip },
      UpdateExpression: updateExpressie,
      ExpressionAttributeNames: expressieNamen,
      ExpressionAttributeValues: expressieWaarden,
      ReturnValues: 'ALL_NEW',
    })
  );
  return resultaat.Attributes;
}

export async function haalTopTienOp() {
  const resultaat = await docClient.send(
    new ScanCommand({
      TableName: TABEL,
      FilterExpression: 'QuizGedaan = :gedaan AND Blocked = :geblokkeerd',
      ExpressionAttributeValues: {
        ':gedaan': true,
        ':geblokkeerd': false,
      },
      ProjectionExpression: 'Naam, Score, #Rank, Stop',
      ExpressionAttributeNames: { '#Rank': 'Rank' },
    })
  );
  return (resultaat.Items ?? [])
    .sort((a, b) => b.Score - a.Score || a.Stop.localeCompare(b.Stop))
    .slice(0, 10);
}
