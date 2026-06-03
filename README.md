
# Enhanced website
Ontwerp en maak een interactieve website die snel laadt en prettig te gebruiken is.

De instructie vind je in: [INSTRUCTIONS.md](https://github.com/fdnd-task/enhanced-website/blob/main/docs/INSTRUCTIONS.md)


## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
<!-- Bij Beschrijving staat kort beschreven wat voor project het is en wat je hebt gemaakt -->
<!-- Voeg een mooie poster visual toe 📸 -->
<!-- Voeg een link toe naar je live site 🌐-->

De Buurtcampuskrant is een digitale krant waarop nieuwsartikelen van de Buurtcampus worden weergegeven. Bezoekers kunnen via de navigatie tussen verschillende districten navigeren en artikelen filteren op doelgroep. Daarnaast kan een gebruiker een individueel artikel openen, lezen en reageren onder het artikel.

De website heeft een simpel en duidelijk ontwerp zodat gebruikers snel begrijpen hoe de website werkt. De interface is mobile first opgebouwd en bevat duidelijke navigatie en interactieve feedback voor de gebruiker.

## Gebruik
<!-- Bij Gebruik staat de user story, hoe het werkt en wat je er mee kan. -->
### User story

Als gebruiker wil ik een reactie kunnen plaatsen onder een artikel, zodat ik mijn mening of feedback kan delen.

### Wat kan de gebruiker doen?

Op de website kan een gebruiker:

- tussen verschillende pagina’s navigeren
- artikelen bekijken en lezen
- artikelen filteren op district
- artikelen filteren op doelgroep
- reacties bekijken onder een artikel
- zelf een reactie plaatsen onder een artikel

Voor mobiele schermen is een hamburger menu toegevoegd. De website is opgebouwd volgens het mobile first principe zodat de content goed leesbaar blijft op kleinere schermen.

### Hoe werkt de comment functionaliteit?

Onder een artikel staat een formulier waarmee een gebruiker een reactie kan plaatsen. Wanneer het formulier wordt verzonden, wordt de reactie opgeslagen en direct weergegeven onder het artikel.

## User Experience

Voor de comment functionaliteit heb ik verschillende states toegevoegd om duidelijk feedback aan de gebruiker te geven tijdens het posten van een reactie.

### Post interactie

Een gebruiker kan onder een artikel een reactie plaatsen via een formulier. Na het versturen wordt de reactie opgeslagen en weergegeven onder het artikel.

https://github.com/user-attachments/assets/c10584b2-e5f9-4788-b9cf-f715d07c7866

### Loading state

Tijdens het plaatsen van een reactie wordt een loading animatie weergegeven met drie bewegende bolletjes. Hierdoor ziet de gebruiker dat de reactie nog wordt verwerkt.

<img width="165" height="62" alt="image" src="https://github.com/user-attachments/assets/77680566-a566-40ad-a612-29712adc7ced" />

### Success state

Wanneer een reactie succesvol is geplaatst, verschijnt een succesmelding op de pagina. Hierdoor krijgt de gebruiker direct feedback dat de actie gelukt is.

<img width="165" height="55" alt="image" src="https://github.com/user-attachments/assets/b8909f67-a40d-4683-88cf-773ddb7d6531" />

### Error state

Wanneer er iets fout gaat tijdens het plaatsen van een reactie, wordt een foutmelding weergegeven zodat de gebruiker weet dat de reactie niet is geplaatst.

<img width="578" height="267" alt="image" src="https://github.com/user-attachments/assets/bff40ded-a642-4903-87d5-e4ab385b0fd6" />

### Filter interactie

Voor het filteren op doelgroepen heb ik client-side JavaScript gebruikt. Hierdoor hoeft de pagina niet opnieuw te laden wanneer een gebruiker een filter selecteert. Dit zorgt voor een snellere en soepelere gebruikerservaring.

## Frontend Performance

Uit de Lighthouse Performance audit kwam naar voren dat afbeeldingen geoptimaliseerd konden worden en layout shift verminderd kon worden.

Om de performance te verbeteren heb ik:

- responsive images toegevoegd met het `<picture>` element
- moderne afbeeldingsformaten gebruikt zoals AVIF en WebP
- width en height toegevoegd aan afbeeldingen om layout shift te verminderen
- een loading animatie toegevoegd voor betere perceived performance
- een blur effect toegevoegd aan afbeeldingen tijdens het laden zodat het laden minder opvallend is voor de gebruiker

## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? Misschien heb je iets met NodeJS gedaan, of heb je een framwork of library gebruikt? -->
In deze applicatie heb ik gebruik gemaakt van:

- Node.js
- Express
- Liquid
- Directus
- CSS
- Client-side JavaScript

## Installatie
<!-- Bij Installatie staat hoe een andere developer aan jouw repo kan werken -->

## Bronnen

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
