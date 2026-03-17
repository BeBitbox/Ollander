# AWS Static Hosting Setup

Deze handleiding beschrijft hoe je de Ollander frontend als statische website host op AWS via S3 + CloudFront.

## Benodigde AWS-resources

### 1. S3-bucket aanmaken

1. Ga naar de [S3-console](https://s3.console.aws.amazon.com/)
2. Klik op **Create bucket**
3. Kies een naam, bijv. `ollander-front`
4. Regio: `eu-west-3` (Parijs, zelfde als Lambda)
5. **Block all public access**: laat **uitgeschakeld** voor publieke hosting
6. Bevestig de waarschuwing en klik op **Create bucket**

#### Bucket-beleid voor publieke leestoegang

Ga naar **Permissions → Bucket policy** en voeg in:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PubliekeLeestoegang",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::ollander-front/*"
    }
  ]
}
```

#### Static website hosting inschakelen

Ga naar **Properties → Static website hosting**:

- Hosting type: **Host a static website**
- Index document: `index.html`
- Error document: `index.html` _(voor client-side routing)_

### 2. CloudFront-distributie aanmaken

1. Ga naar de [CloudFront-console](https://console.aws.amazon.com/cloudfront/)
2. Klik op **Create distribution**
3. Origin domain: kies je S3-bucket (als website-endpoint, niet REST)
4. Viewer protocol policy: **Redirect HTTP to HTTPS**
5. Allowed HTTP methods: **GET, HEAD**
6. Cache policy: **CachingOptimized**
7. Alternate domain names (CNAME): voeg je eigen domein toe indien gewenst
8. Default root object: `index.html`
9. Klik op **Create distribution**

> Noteer de **Distribution ID** — die heb je nodig als GitHub Secret.

### 3. IAM-gebruiker voor GitHub Actions

1. Ga naar **IAM → Users → Create user**
2. Naam: `github-actions-ollander-front`
3. Voeg de volgende inline policy toe:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::ollander-front",
        "arn:aws:s3:::ollander-front/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": "cloudfront:CreateInvalidation",
      "Resource": "arn:aws:cloudfront::*:distribution/*"
    }
  ]
}
```

4. Ga naar **Security credentials → Create access key** (type: _Other_)
5. Sla de **Access Key ID** en **Secret Access Key** op

## GitHub Secrets instellen

Ga naar je GitHub-repository → **Settings → Secrets and variables → Actions** en voeg toe:

| Secret                             | Waarde                                        |
|------------------------------------|-----------------------------------------------|
| `FRONT_AWS_ACCESS_KEY_ID`          | Access Key ID van de IAM-gebruiker            |
| `FRONT_AWS_SECRET_ACCESS_KEY`      | Secret Access Key van de IAM-gebruiker        |
| `FRONT_AWS_REGION`                 | `eu-west-3`                                   |
| `FRONT_S3_BUCKET_NAME`             | Naam van de S3-bucket, bijv. `ollander-front` |
| `FRONT_CLOUDFRONT_DISTRIBUTION_ID` | ID van de CloudFront-distributie              |

> De secrets `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` en `AWS_REGION` zijn gedeeld met de Lambda-deploy pipeline en hoeven maar één keer ingesteld te worden.

## Lokaal genereren en testen

```bash
cd ollander-front
npm install
npm run generate      # Genereert statische bestanden in .output/public/
npm run preview       # Preview de gegenereerde site lokaal
```

## Deployment

De GitHub Actions pipeline ([`.github/workflows/deploy-frontend.yml`](../.github/workflows/deploy-frontend.yml)) deployt automatisch bij elke push naar `master` die bestanden in `ollander-front/`
raakt.
