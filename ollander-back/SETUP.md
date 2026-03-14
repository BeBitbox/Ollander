# Ollander Backend — Opzetgids

Deze gids beschrijft hoe je de volledige infrastructuur opzet voor de AWS Lambda backend.

---

## Overzicht

De backend bestaat uit:
- **AWS Lambda** — Node.js 24 functie, handler: `src/index.mjs`
- **Amazon DynamoDB** — tabel `ollander_registraties`
- **Amazon API Gateway** — HTTP API als publiek eindpunt voor de Lambda
- **GitHub Actions** — automatische deploy bij elke push naar `master`

---

## 1. AWS IAM — Gebruiker voor GitHub Actions

Maak een dedicated IAM-gebruiker aan voor de CI/CD-pipeline.

### 1.1 Gebruiker aanmaken

1. Ga naar **IAM → Users → Create user**
2. Naam: bijv. `ollander-github-deploy`
3. Geen console-toegang nodig
4. Sla op en ga naar **Security credentials → Create access key**
5. Kies "Application running outside AWS", bevestig
6. Kopieer de **Access key ID** en **Secret access key** (je ziet ze maar één keer)

### 1.2 Permissies toekennen

Voeg een inline policy toe aan de gebruiker met minimale rechten:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "lambda:UpdateFunctionCode",
        "lambda:PublishVersion",
        "lambda:GetFunction"
      ],
      "Resource": "arn:aws:lambda:REGIO:ACCOUNT_ID:function:FUNCTIE_NAAM"
    }
  ]
}
```

Vervang `REGIO`, `ACCOUNT_ID` en `FUNCTIE_NAAM` door de juiste waarden.

---

## 2. DynamoDB — Tabel aanmaken

1. Ga naar **DynamoDB → Tables → Create table**
2. **Tabelnaam:** `ollander_registraties`
3. **Partition key:** `IP` (type: String)
4. Geen sort key
5. Instellingen: Standard class, On-demand capaciteit (goedkoop bij laag verkeer)
6. Klik **Create table**

### Datamodel

| Attribuut    | Type    | Omschrijving                         |
|-------------|---------|--------------------------------------|
| `IP`        | String  | Primary key — IP-adres van de bezoeker |
| `Naam`      | String  | Naam van de deelnemer                |
| `QuizGedaan`| Boolean | Of de quiz al voltooid is            |
| `Challenge` | String  | Toegewezen challenge-code            |
| `Start`     | String  | ISO 8601 starttijdstip               |
| `Stop`      | String  | ISO 8601 stoptijdstip                |
| `Score`     | Number  | Behaalde score                       |
| `Rank`      | Number  | Rangschikking                        |
| `Blocked`   | Boolean | Of het IP geblokkeerd is             |

---

## 3. Lambda — Functie aanmaken

### 3.1 Functie aanmaken

1. Ga naar **Lambda → Functions → Create function**
2. Kies **Author from scratch**
3. **Functienaam:** bijv. `ollander-backend` (onthoud deze naam)
4. **Runtime:** Node.js 24.x
5. **Architecture:** x86\_64
6. Klik **Create function**

### 3.2 Handler instellen

Ga naar **Configuration → General configuration → Edit**:
- **Handler:** `src/index.handler`

### 3.3 Execution role — DynamoDB toegang geven

De Lambda heeft een IAM-rol nodig om DynamoDB te mogen lezen/schrijven.

1. Ga naar **Configuration → Permissions → Execution role**
2. Klik op de rolnaam om die te openen in IAM
3. Klik **Add permissions → Attach policies**
4. Voeg toe: **AmazonDynamoDBFullAccess** (of maak een beperktere policy)

Of maak een inline policy op de rol:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:Scan"
      ],
      "Resource": "arn:aws:dynamodb:REGIO:ACCOUNT_ID:table/ollander_registraties"
    }
  ]
}
```

### 3.4 Omgevingsvariabele (optioneel)

De regio staat standaard op `eu-west-3` (Paris). Wil je een andere regio, stel dan in:
- **Configuration → Environment variables → Add:** `AWS_REGION` = bijv. `eu-west-1`

---

## 4. API Gateway — HTTP API

### 4.1 API aanmaken

1. Ga naar **API Gateway → Create API → HTTP API**
2. Voeg een integratie toe: **Lambda**, kies `ollander-backend`
3. **API name:** bijv. `ollander-api`
4. Klik door en kies **Create**

### 4.2 Routes configureren

Voeg de volgende route toe (of gebruik `$default` om alles door te sturen):

| Methode | Pad         |
|---------|-------------|
| GET     | /api/init   |
| ANY     | /{proxy+}   |

### 4.3 Stage en URL

Na aanmaken krijg je een **Invoke URL**, bijv.:
```
https://xxxxxxxxxx.execute-api.eu-west-3.amazonaws.com
```

Gebruik deze URL in de frontend als `NUXT_PUBLIC_API_BASE`.

---

## 5. GitHub Secrets instellen

Ga in je GitHub-repository naar **Settings → Secrets and variables → Actions → New repository secret** en voeg toe:

| Secret naam            | Waarde                                      |
|-----------------------|---------------------------------------------|
| `AWS_ACCESS_KEY_ID`   | Access key van de IAM-gebruiker (stap 1)    |
| `AWS_SECRET_ACCESS_KEY` | Secret key van de IAM-gebruiker (stap 1) |
| `AWS_REGION`          | bijv. `eu-west-3`                           |
| `LAMBDA_FUNCTION_NAME`| bijv. `ollander-backend`                    |

---

## 6. Eerste handmatige deploy

Voor de eerste keer moet je de code handmatig uploaden (de GitHub Action werkt pas na de eerste upload).

```bash
cd ollander-back
npm ci --omit=dev
zip -r ../function.zip src node_modules package.json

aws lambda update-function-code \
  --function-name ollander-backend \
  --zip-file fileb://../function.zip \
  --region eu-west-3
```

Vereist: AWS CLI geïnstalleerd en geconfigureerd met `aws configure`.

---

## 7. Automatische deploys via GitHub Actions

Na de setup wordt de Lambda automatisch bijgewerkt bij elke push naar `master` die bestanden in `ollander-back/` wijzigt.

De workflow (`.github/workflows/deploy-lambda.yml`):
1. Installeert alleen productie-afhankelijkheden (`npm ci --omit=dev`)
2. Maakt een ZIP-pakket van `src/`, `node_modules/` en `package.json`
3. Uploadt de ZIP naar de Lambda
4. Wacht tot de update klaar is
5. Publiceert een nieuwe Lambda-versie

Je kunt de workflow ook handmatig starten via **Actions → Deploy Lambda naar AWS → Run workflow**.

---

## 8. Lokaal testen

Je kunt de Lambda volledig lokaal draaien zonder een echte AWS-account, met behulp van **DynamoDB Local** via Docker.

### Vereisten

- Docker (of Docker Desktop)
- Node.js 24

### Stap-voor-stap

```bash
# 1. Start DynamoDB Local
cd ollander-back
docker compose up -d

# 2. Maak de tabel aan (eenmalig)
npm run lokaal:init

# 3. Roep de handler aan met testverzoeken
npm run lokaal:test
```

De uitvoer toont de HTTP-statuscode en body voor elk testverzoek.

### Hoe het werkt

- `docker-compose.yml` start `amazon/dynamodb-local` op poort 8000
- De omgevingsvariabele `DYNAMODB_ENDPOINT=http://localhost:8000` stuurt de AWS SDK naar de lokale instantie in plaats van naar AWS
- `scripts/init-lokaal.mjs` maakt de tabel `ollander_registraties` aan in de lokale instantie
- `scripts/test-lokaal.mjs` importeert de handler direct en roept die aan met nep Lambda-events

### Eigen testverzoeken

Voeg extra calls toe aan `scripts/test-lokaal.mjs`, of roep de handler rechtstreeks aan in een los scriptje:

```js
import { handler } from '../src/index.mjs';

const resultaat = await handler({
  httpMethod: 'GET',
  path: '/api/init',
  requestContext: { identity: { sourceIp: '1.2.3.4' } },
});
console.log(resultaat);
```

---

## Samenvatting checklist

- [ ] IAM-gebruiker aangemaakt met Lambda deploy-rechten
- [ ] Access keys gekopieerd en veilig opgeslagen
- [ ] DynamoDB tabel `ollander_registraties` aangemaakt (partition key: `IP`)
- [ ] Lambda functie `ollander-backend` aangemaakt (Node.js 24, handler: `src/index.handler`)
- [ ] Lambda execution role heeft DynamoDB-toegang
- [ ] API Gateway HTTP API aangemaakt en gekoppeld aan de Lambda
- [ ] Invoke URL genoteerd voor gebruik in de frontend
- [ ] Vier GitHub Secrets ingesteld
- [ ] Eerste deploy handmatig uitgevoerd