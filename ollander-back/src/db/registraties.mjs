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
 * - ip:          String  (primary key)
 * - naam:        String
 * - quizGedaan:  Boolean
 * - challenge:   String
 * - start:       String  (ISO 8601 timestamp)
 * - stop:        String  (ISO 8601 timestamp)
 * - score:       Number
 * - rank:        Number
 * - blocked:     Boolean
 */

export async function zoekOpIp(ip) {
  const resultaat = await docClient.send(
    new GetCommand({
      TableName: TABEL,
      Key: { ip },
    })
  );
  return resultaat.Item ?? null;
}

function genereerChallenge(ip) {
  const uniek = Math.random().toString(36).substring(2, 10).toUpperCase();
  const laatste4 = ip.replace(/\./g, '').slice(-4).padStart(4, '0');
  return uniek + laatste4;
}

export async function voegRegistratieToe(ip) {
  const item = {
    ip,
    naam: '',
    quizGedaan: false,
    challenge: genereerChallenge(ip),
    start: '',
    stop: '',
    score: 0,
    rank: 0,
    blocked: false,
  };
  await docClient.send(
    new PutCommand({
      TableName: TABEL,
      ConditionExpression: 'attribute_not_exists(ip)',
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
      Key: { ip },
      UpdateExpression: updateExpressie,
      ExpressionAttributeNames: expressieNamen,
      ExpressionAttributeValues: expressieWaarden,
      ReturnValues: 'ALL_NEW',
    })
  );
  return resultaat.Attributes;
}

export async function telBeterePlaatsen(rank) {
  const resultaat = await docClient.send(
    new ScanCommand({
      TableName: TABEL,
      FilterExpression: 'quizGedaan = :gedaan AND blocked = :geblokkeerd AND #rank < :rank',
      ExpressionAttributeValues: {
        ':gedaan': true,
        ':geblokkeerd': false,
        ':rank': rank,
      },
      ExpressionAttributeNames: { '#rank': 'rank' },
      Select: 'COUNT',
    })
  );
  return (resultaat.Count ?? 0) + 1;
}

export async function haalTopTienOp() {
  const resultaat = await docClient.send(
    new ScanCommand({
      TableName: TABEL,
      FilterExpression: 'quizGedaan = :gedaan AND blocked = :geblokkeerd',
      ExpressionAttributeValues: {
        ':gedaan': true,
        ':geblokkeerd': false,
      },
      ProjectionExpression: 'naam, score, #rank, start, stop',
      ExpressionAttributeNames: { '#rank': 'rank' },
    })
  );
  return (resultaat.Items ?? [])
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 10);
}
