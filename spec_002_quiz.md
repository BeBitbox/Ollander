# Spec 002: quiz

## Doel
De website moet nu een leuke quiz bevatten voor de Nederlander die wil integreren in Vlaanderen (en België).
Voor de quiz start moet er een naam ingevuld worden waarna de quiz start. 
Iedere gebruiker kan maar éénmaal de quiz doen: op basis van zijn IP-adres controleren we dit.
De gebruiker moet vervolgens 10 ludieke vragen beantwoorden: wanneer hij op een vraag beantwoordt, opent de volgende vraag direct. 
Wanneer alle vragen beantwoord zijn, volgt er een overzicht van alle vragen en antwoorden. 
Een score van 10 op 10 resulteert in 'Volwaardige Vlaming' status, van 7 tot 9 is een status van "bijna geïntegreerd", etc..
De website zelf bevat nu ook een overzichtsbord met alle top 10 de kandidaten.

## Taken

### Taak 1
Maak een nieuwe map `ollander-back` die de code van een AWS Lambda methode bevat:
* Laatste Node versie
* Ondersteun REST endpoints
* Kan connecteren met DynamoDB in AWS
  * Tabel "ollander_registraties"
  * Data model:
    * IP: String
    * Naam: String
    * QuizGedaan: Boolean
    * Challenge: String
    * Start: String
    * Stop: String
    * Score: Number
    * Rank: Number
    * Blocked: Boolean

### Taak 2
Maak een AWS Lambda backend in Node in `ollander-back` die de nodige backend endpoints zal voorzien voor:
* URL: `/api/ìnit`
* Methode: GET-call
* Parameters: geen
* Return: 
  * String "naam"
  * Boolean "quizGedaan"
  * String "challenge"
* Logica: 
  * Stap 1: zoek inkomend IP-adres in Dynamo tabel
  * Stap 2: vergelijk IP-adres
    * Stap 2.a: IP-adres bestaat niet: voeg IP-adres toe in de tabel en return: lege naam, quiz is nog niet gedaan en maak een challenge: dit is een uniek gegenereerde code string met laatste 4 characters van het IP-adres
    * Stap 2.b: IP-adres bestaat: geef de String "naam", Boolean "quizGedaan" en String "challenge" terug maar zonder de 4 laatste characters

### Taak 3
Maak een AWS Lambda backend in Node in `ollander-back` die de nodige backend endpoints zal voorzien voor:
* URL: `/api/start`
* Methode: POST-call
* Parameters: 
  * String "challenge"
  * String "naam"
* Return: 
  * Boolean "success"
* Logica: 
  * Stap 1: zoek inkomend IP-adres in Dynamo tabel
  * Stap 2: vergelijk IP-adres
    * Stap 2.a: IP-adres bestaat niet: return success is false
    * Stap 2.b: IP-adres bestaat: ga verder
  * Stap 3: vergelijk andere waardes voor dat IP-adres:
    * als start, stop, score en rank reeds ingevuld is in Dynamo: zet blocked op true, bewaar en return success is false
    * als challenge code niet gelijk is aan challenge code in Dynamo: zet blocked op true, bewaar en return success is false
    * als blocked op true staat, return success is false
  * Stap 4: 
    * neem de naam over
    * genereer start waarde: dit is de huidige timestamp
    * return success is true
* Voeg een voorbeeld API-call toe in `ollander-back/scripts/api.http`

### Taak 4
Maak een AWS Lambda backend in Node in `ollander-back` die de nodige backend endpoints zal voorzien voor:
* URL: `/api/stop`
* Methode: POST-call
* Parameters:
    * String "challenge"
    * Number "score"
* Return:
    * Boolean "success"
    * String naam
    * Number score
    * Number tijd
    * Number plaats
* Logica:
    * Stap 1: zoek inkomend IP-adres in Dynamo tabel
    * Stap 2: vergelijk IP-adres
        * Stap 2.a: IP-adres bestaat niet: return success is false
        * Stap 2.b: IP-adres bestaat: ga verder
    * Stap 3: vergelijk andere waardes voor dat IP-adres:
        * als stop, score en rank reeds ingevuld is in Dynamo: zet blocked op true, bewaar en return success is false
        * als start niet ingevuld is in Dynamo: zet blocked op true, bewaar en return success is false
        * als challenge code niet gelijk is aan challenge code in Dynamo: zet blocked op true, bewaar en return success is false
        * als blocked op true staat, return success is false
    * Stap 4:
        * neem de score over
        * genereer stop waarde: dit is de huidige timestamp
        * genereer rank: dit is "het aantal milli-seconden tussen stop en start" + ((10 - score) * 7000)
        * bewaar in dynamo
        * return 
          * success is true
          * naam
          * score
          * tijd: dit wordt berekend door het aantal milli-seconden tussen stop en start
          * plaats: de plaats in dynamoDB gesorteerd volgens rank met de laagste rank eerst

### Taak 5
Maak een AWS Lambda backend in Node in `ollander-back` die de nodige backend endpoints zal voorzien voor:
* URL: `/api/top`
* Methode: GET-call
* Parameters: geen
* Return:
    * Lijst van top 10 gebruikers
      * naam
      * score
      * tijd: dit wordt berekend door het aantal milli-seconden tussen stop en start
      * plaats
* Logica:
    * Stap 1: Geef de eerste 10 records terug van dynamoDB gesorteerd volgens rank met de laagste rank eerst

### Taak 6
Pas de frontend aan in `ollander-front` om te intrigeren met de backend in `ollander-back`

* Wanneer de pagina voor het eerst laadt, roep de API aan uit Taak 2: `/api/ìnit`. Bewaar de waardes die terug komen in globale variabelen. De waarde "challenge" is speciaal: voeg hieraan toe de laatste 4 tekens van het huidige IP-adres
* Voeg toe op de pagina: een formulier met naam (mogelijks ingevuld van vorige API-call), de verborgen challenge en een knop waar als je op klikt, de API-call `/api/start` gebeurt. Wanneer de variable "quizGedaan" op true staat, disable de knop. Geef ook korte uitleg over de quiz en zeg dat de tijd belangrijk is voor een goede score te halen.
* Wanneer de API-call `/api/start` success true aangaf, dan start de quiz:
  * 10 grappige Nederbelgische vragen in multiple choice waarbij een score wordt bijgehouden: 1 punt per juist antwoord
  * Op het einde van de quiz gebeurt een API call `/api/stop` om de quiz te beëindigen en de resultaten op te halen. Toon enkel resultaten wanneer success is true
  * Op basis van de score en rank kunt u de gebruiker een naam geven: van "Oervlaams" tot "Ollandse toerist met caravan"
* Op de pagina staat er in de sectie van een quiz, een overzicht met de top 10 deelnemers 

### Taak 7
* Vul de automatisch test in `ollander-qa` aan die de website bezoekt en controle doet date de website zichtbaar is in de belangrijkste mobiele formaten, maar voor het quiz stukje
* Doe een volautomatische test die de quiz in vult.
