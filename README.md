# swapi APP
Desarrollo de interfaz para el API Swapi. Muestra secciones home/ people/ films/ de acuerdo a especificaciones de maquetacion entregadas
---
## File Structure
Basic site rundown:
index of
/css directory for app styling
/js directory holds the logic of the app, described below:

## API app.js logic
app.js handles 'GET' XMLHttpRequest and parses data JSON per Swapi section.
The parsed object is passed to rendering DOM manipulating functions; this functions
take parameters for further filtering and discerning url /section/ origin

The main menu handles calls to a "router" function, which prevents href default behavior and sets calls depending on <section> origin.

Cards are rendered with front-facing datasets and store furter data in inward-facing datasets; this are passed as rendered data into "Big" renders.

"Big" renders, in turn, hold the subindex filter, which makes a call to the main Router with filtered parameters (ie. Related<section>) to display relevant data
---
[Swapi Docs](https://swapi.co/documentation "Swapi")
