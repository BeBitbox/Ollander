import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const regio = process.env.AWS_REGION ?? 'eu-west-3';
const lokaalEndpoint = process.env.DYNAMODB_ENDPOINT;

const dynamoClient = new DynamoDBClient({
  region: regio,
  ...(lokaalEndpoint ? { endpoint: lokaalEndpoint } : {}),
});

export const docClient = DynamoDBDocumentClient.from(dynamoClient, {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});