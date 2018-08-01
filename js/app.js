//Creates home XMLHttp Request
var request = new XMLHttpRequest();

//App Front-End declaration
const app = document.getElementById('root');
const banner = document.createElement('div');
banner.setAttribute('class', 'banner');
const breadcrumb = document.createElement('div');
breadcrumb.setAttribute('id', 'breadcrumb');
breadcrumb.setAttribute('class', 'breadcrumb');
const message = document.createElement('h1');
const home = document.createElement('div');
home.setAttribute('class', 'home');
home.setAttribute('id', 'canvas');

//Pagination declaration
var pagination = document.createElement('div');
pagination.setAttribute('class', 'paginator');
var prev = document.createElement('a');
prev.setAttribute('class', 'pag-control');
prev.setAttribute('id', 'prev');
prev.textContent = '<<';
prev.setAttribute('href', 'https://swapi.co/api/people/?page=1');
prev.onclick = callerEvent;
var next = document.createElement('a');
next.setAttribute('class', 'pag-control');
next.setAttribute('id', 'next');
next.textContent = '>>';
next.setAttribute('href', 'https://swapi.co/api/people/?page=2');
next.onclick = callerEvent;
pagination.appendChild(prev);
pagination.appendChild(next);

// Set Default Section
const defaultSection = 'https://swapi.co/api/films/';
var current = '';
//GET new connection
request.open('GET', 'https://swapi.co/api/', true);
banner.appendChild(message);

/// Sets Main Menu and Default Section
request.onload = function() {
  //GET on SUCCESS
  if(this.readyState == 4 && this.status == 200) {
    //JSON response parse
    var data = JSON.parse(this.response);
    // OK status banner render
    message.textContent = "Star Wars Data";
    //Breadcrumb setter
    setBreadcrumb();
    //JSON data handling

    // Main navigation Menu Render
    const mainMenu = document.createElement('div');
    mainMenu.setAttribute('class', 'menu');
    for(var section in data){
      var link = document.createElement('a');
      link.setAttribute('class', 'caller');
      link.textContent = section;
      link.setAttribute('href', data[section]);
      link.onclick = callerEvent;
      mainMenu.appendChild(link);
    }
    banner.appendChild(mainMenu);
    // Render Default Section
    renderDefault();
  //ON ERROR
  } else if(request.status >= 400) {
      // Error status banner render
      message.textContent = "This is not the page you are looking for!(404)";
      console.log('El recurso no existe o no se encuentra disponible.');
    }
}
 //// On Home load ////
request.send();
app.appendChild(banner);
app.appendChild(breadcrumb);

//Breadcrumb control
function setBreadcrumb() {
  var mainCrumb = document.createElement('a');
  mainCrumb.setAttribute('id', 'mainCrumb');
  mainCrumb.setAttribute('class', 'crumb');
  mainCrumb.onclick = callerEvent;
  var url = defaultSection.split('/');
  var section = url[url.length - 2];
  mainCrumb.textContent = section;
  mainCrumb.setAttribute('href', 'https://swapi.co/api/' + section + '/');
  breadcrumb.appendChild(mainCrumb);
}

function changeBreadcrumb(origin) {
  var mainCrumb = document.getElementById("mainCrumb");
  mainCrumb.textContent = origin;
  mainCrumb.setAttribute('href', 'https://swapi.co/api/' + origin + '/');
}

function appendBreadCrumb(content) {
  var sectionCrumb = document.createElement('a');
  sectionCrumb.setAttribute('class', 'crumb');
  sectionCrumb.textContent = content;
  var separator = document.createElement('p');
  separator.textContent = '>';
  breadcrumb.appendChild(separator);
  breadcrumb.appendChild(sectionCrumb);
}

//Renders onLoad first Section; Can be configured to any section
function renderDefault(){
  //GETS Default section (Films)
  const defaultRender = new XMLHttpRequest();
  defaultRender.open('GET', defaultSection, true);
  defaultRender.onload = function() {
    //GET on SUCCESS
    if(this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.response);
      //Change if default changes
      renderFilms(data);
    //ON ERROR
    } else if(request.status >= 400) {
        // Error status
        console.log('El recurso no existe o no se encuentra disponible.');
      }
  }
  defaultRender.send();

  app.appendChild(home);
}

//Handles Section API Calls
function callerEvent(e){
  if(this.href.includes('?')){
    var current = parseInt(this.href[this.href.length - 1]);
    var next = document.getElementById('next');
    var previous = document.getElementById('prev');
    if (current > 1 && current <= 8) {
      var prev = current - 1
      previous.href = 'https://swapi.co/api/people/?page=' + prev;
      var plus = current + 1
      next.href = 'https://swapi.co/api/people/?page=' + plus;
    }

  }
  e.preventDefault();
  // Clears previous Home content
  clearHome();
  // Clears breadcrumbs
  var breadcrumb = document.getElementById('breadcrumb');
  while(breadcrumb.childNodes.length > 1) {
    breadcrumb.removeChild(breadcrumb.lastChild);
  }
  //Creates 'section' XMLHttp Request
  var data = new XMLHttpRequest();
  request.open('GET', this.href, true);
  //Stores origin of JSON data to 'route' correct info to render
  var uri = this.href.split('/');
  var origin = uri[uri.length - 2];

  request.onload = function() {
    //GET on SUCCESS
    if(this.readyState == 4 && this.status == 200) {
      //JSON response parse
      var data = JSON.parse(this.response);
      //'Router' to each section JSON response
      switch (origin) {
        case 'people':
          renderPeople(data);
          changeBreadcrumb(origin);
          break;
        case 'films':
          renderFilms(data);
          changeBreadcrumb(origin);
          break;
        default:
          renderPlaceholder(origin);
          changeBreadcrumb(origin);
      }
    //ON ERROR
    } else if(request.status >= 400) {
        console.log('El recurso no existe o no se encuentra disponible.');
      }
  }
  //On menu click call
  request.send();
}

//// Section Renderer ////
function renderFilms(data, current) {
  /*
    Renders content for 'Films' Section;
    Data is stored in data-sets to enable use across functions
    without requiring aditional API calls nor scope errors.
    Since none of the data is sensitive, all is forward-facing.
  */
  for(var film in data.results) {
    //Creates each individual card
    var card = document.createElement('div');
    card.setAttribute('class', 'card');
    card.setAttribute('id', data.results[film].episode_id);
    //Filter data-binding
    var relatedChars = [];
    for(var character in data.results[film].characters){
      var url = data.results[film].characters[character].split('/');
      var id = url[5];
      relatedChars.push(id);
    }
    card.dataset.characters = relatedChars;
    //Datasets
    card.dataset.title = data.results[film].title;
    card.dataset.episode = data.results[film].episode_id;
    card.dataset.releaseDate = data.results[film].release_date;
    card.dataset.crawl = data.results[film].opening_crawl;
    card.dataset.director = data.results[film].director;
    card.dataset.producer = data.results[film].producer;
    //OnLoad Content set
    //Title content
    var title = document.createElement('h3');
    title.textContent = card.dataset.title;
    //Film Id Content
    var filmId = document.createElement('h4');
    filmId.textContent = card.dataset.episode;
    //Realse Date Info
    var dateOfRelease = document.createElement('p');
    dateOfRelease.setAttribute('class', 'italic');
    dateOfRelease.textContent = card.dataset.releaseDate;
    //Render
    card.appendChild(title);
    card.appendChild(filmId);
    card.appendChild(dateOfRelease);
    //Click Event Handler
    card.onclick = infoEvent;
    home.appendChild(card);
  }
    //Remove pagination
    app.removeChild(pagination);
}

function renderBigFilm(card) {
  var bigCard = document.createElement('div');
  bigCard.setAttribute('class', 'big');
  bigCard.dataset.characters = card.dataset.characters;
  //Left column
  var leftColumn = document.createElement('div');
  leftColumn.setAttribute('class', 'left');
  //Title content
  var title = document.createElement('h3');
  title.textContent = card.dataset.title;
  //Film Id Content
  var filmId = document.createElement('h4');
  filmId.textContent = card.dataset.episode;
  //Director
  var director = document.createElement('h4');
  director.textContent = card.dataset.director;
  //Producer
  var producer = document.createElement('h4');
  producer.textContent = card.dataset.producer;
  //Relase Date Info
  var dateOfRelease = document.createElement('p');
  dateOfRelease.setAttribute('class', 'italic');
  dateOfRelease.textContent = card.dataset.releaseDate;

  //Right column
  var rightColumn = document.createElement('div');
  rightColumn.setAttribute('class', 'right');
  //Text crawl content
  var crawl = document.createElement('p');
  crawl.textContent = card.dataset.crawl;

  //Sub index
  var index = document.createElement('div');
  index.setAttribute('class', 'menu');
  //People filter
  var people = document.createElement('a');
  people.textContent = 'Related characters'
  people.dataset.section = 'people';
  people.onclick = renderFilterPersons;
  index.appendChild(people);
  //Planet filter
  var planets = document.createElement('a');
  planets.textContent = 'Related planets'
  //Placeholder href
  planets.setAttribute('href', 'https://swapi.co/api/planets/');
  planets.onclick = callerEvent;
  index.appendChild(planets);
  //Starships filter
  var starships = document.createElement('a');
  starships.textContent = 'Related starships'
  //Placeholder href
  starships.setAttribute('href', 'https://swapi.co/api/starships/');
  starships.onclick = callerEvent;
  index.appendChild(starships);
  //Vehicles filter
  var vehicles = document.createElement('a');
  vehicles.textContent = 'Related vehicles'
  //Placeholder href
  vehicles.setAttribute('href', 'https://swapi.co/api/vehicles/');
  vehicles.onclick = callerEvent;
  index.appendChild(vehicles);
  //Species filter
  var species = document.createElement('a');
  species.textContent = 'Related species'
  //Placeholder href
  species.setAttribute('href', 'https://swapi.co/api/species/');
  species.onclick = callerEvent;
  index.appendChild(species);

  //Render
  leftColumn.appendChild(title);
  leftColumn.appendChild(filmId);
  leftColumn.appendChild(director);
  leftColumn.appendChild(producer);
  leftColumn.appendChild(dateOfRelease);

  rightColumn.appendChild(crawl);

  bigCard.appendChild(leftColumn);
  bigCard.appendChild(rightColumn);
  bigCard.appendChild(index);
  appendBreadCrumb(card.dataset.title);
  home.appendChild(bigCard);
}

function renderPeople(data) {
  /*
    Renders content for 'People' Section;
    Data is stored in data-sets to enable use across functions
    without requiring aditional API calls nor scope errors.
    Since none of the data is sensitive, all is forward-facing.
  */
  for(var people in data.results){
    //Creates each individual card
    var card = document.createElement('div');
    card.setAttribute('class', 'card');
    var url = data.results[people].url.split('/');
    var id = url[url.length - 2];
    card.setAttribute('id', id);
    //Filter data-binding
    var relatedFilms = [];
    for(var film in data.results[people].films){
      var url = data.results[people].films[film].split('/');
      var id = url[5];
      relatedFilms.push(id);
    }
    card.dataset.films = relatedFilms;
    //Datasets
    card.dataset.name = data.results[people].name;
    card.dataset.height = data.results[people].height;
    card.dataset.eyeColor = data.results[people].eye_color;
    card.dataset.hairColor = data.results[people].hair_color;
    card.dataset.gender = data.results[people].gender;
    card.dataset.dob = data.results[people].birth_year;
    //Species JSON Workaround
    var species = data.results[people].species[0].split('/');
    var speciesCode = species[species.length - 2];
    var speciesCatalogue = {
      1:'Human',
      2:'Droid',
      3:'Wookie',
      4:'Rodian',
      5:'Hutt',
      6:'Yoda\'s species',
      7:'Trandoshan',
      8:'Mon Calamari',
      9:'Ewok',
      10:'Sullustan',
      11:'Neimodian',
      12:'Gungan',
      13:'Toydarian',
      14:'Dug',
      15:'Twi\'Lek',
      16:'Aleena',
      17:'Vulptereen',
      18:'Xexto',
      19:'Toong',
      20:'Cerean',
      21:'Nautolan',
      22:'Zabrak',
      23:'Tholotian',
      24:'Iktotchi',
      25:'Quermian',
      26:'Kel Dor',
      27:'Chagrian',
      28:'Geonosian',
      29:'Mirialan',
      30:'Clawdite',
      31:'Besalisk',
      32:'Kaminoan',
      33:'Skakoan',
      34:'Muun',
      35:'Togruta',
      36:'Kaleesh',
      37:'Pau\'an'
    };
    card.dataset.species = speciesCatalogue[speciesCode];

    //OnLoad Content set
    //Name content
    var name = document.createElement('h3');
    name.textContent = card.dataset.name;
    //Render
    card.appendChild(name);
    //Click Event Handler
    card.onclick = infoEvent;
    home.appendChild(card);
  }
  //Set pagination
  app.appendChild(pagination);
}

function renderBigPerson(card) {
  var bigCard = document.createElement('div');
  bigCard.setAttribute('class', 'big');
  bigCard.dataset.films = card.dataset.films;
  //Left column
  var leftColumn = document.createElement('div');
  leftColumn.setAttribute('class', 'left');
  //content
  //Name
  var name = document.createElement('h3');
  name.textContent = "Name: " + card.dataset.name;
  //Species
  var species = document.createElement('h4');
  species.textContent = "Species: " + card.dataset.species;
  //Height
  var height = document.createElement('h4');
  height.textContent = "Height: " + card.dataset.height;
  //Eye color
  var eyeColor = document.createElement('h4');
  eyeColor.textContent = "Eye color: " + card.dataset.eyeColor;
  //Hair color
  var hairColor = document.createElement('h4');
  hairColor.textContent = "Hair color: " + card.dataset.hairColor;
  //Gender
  var gender = document.createElement('h4');
  gender.textContent = "Gender: " + card.dataset.gender;
  //DOB
  var dob = document.createElement('h4');
  dob.textContent = "Birth year: " + card.dataset.dob;

  //Sub index
  var index = document.createElement('div');
  index.setAttribute('class', 'menu');
  //People filter
  var films = document.createElement('a');
  films.textContent = 'Related films'
  films.dataset.section = 'films';
  films.onclick = renderFilterFilms;
  index.appendChild(films);
  //Planet filter
  var planets = document.createElement('a');
  planets.textContent = 'Related planets'
  //Placeholder href
  planets.setAttribute('href', 'https://swapi.co/api/planets/');
  planets.onclick = callerEvent;
  index.appendChild(planets);
  //Starships filter
  var starships = document.createElement('a');
  starships.textContent = 'Related starships'
  //Placeholder href
  starships.setAttribute('href', 'https://swapi.co/api/starships/');
  starships.onclick = callerEvent;
  index.appendChild(starships);
  //Vehicles filter
  var vehicles = document.createElement('a');
  vehicles.textContent = 'Related vehicles'
  //Placeholder href
  vehicles.setAttribute('href', 'https://swapi.co/api/vehicles/');
  vehicles.onclick = callerEvent;
  index.appendChild(vehicles);
  //Species filter
  var speciesF = document.createElement('a');
  speciesF.textContent = 'Related species'
  //Placeholder href
  species.setAttribute('href', 'https://swapi.co/api/species/');
  species.onclick = callerEvent;
  index.appendChild(speciesF);

  leftColumn.appendChild(name);
  leftColumn.appendChild(species);
  leftColumn.appendChild(height);
  leftColumn.appendChild(eyeColor);
  leftColumn.appendChild(hairColor);
  leftColumn.appendChild(gender);
  leftColumn.appendChild(dob);

  bigCard.appendChild(leftColumn);
  bigCard.appendChild(index);
  appendBreadCrumb(card.dataset.name);
  home.appendChild(bigCard);
}

//Placeholder renderer //
function renderPlaceholder(origin) {
  var placeHolder = document.createElement('h2');
  placeHolder.textContent = 'Very soon you will see the data of ' + origin;
  home.appendChild(placeHolder);
  //Remove pagination
  app.removeChild(pagination);
}

//Section Extra Info Switcher
function infoEvent(){
  event.preventDefault();
  var cards = document.getElementsByClassName('card');
  for(var i = 0; i < cards.length; i++){
    if(cards[i].id != this.id) {
      cards[i].classList.add('hidden');
    } else {
      var target = cards[i];
      cards[i].classList.add('hidden');
    }
  }
  renderSelected(target, target.id);
}

//Renders extra data within selected div
function renderSelected(card, id){
  if(card.hasAttribute('data-title')){
    //Render Big Film
    renderBigFilm(card);
  }
  else if(card.hasAttribute('data-name')) {
    renderBigPerson(card);
  }
}

//Filtered Renders
function renderFilterPersons(){
  event.preventDefault();
  var characters = this.parentNode.parentNode.dataset.characters.split(",");
  var origin = this.dataset.section;
  filterEvent(origin, characters)
}

function renderFilterFilms(){
  event.preventDefault();
  var films = this.parentNode.parentNode.dataset.films.split(",");
  var origin = this.dataset.section;
  filterEvent(origin, films)
}

//Handles Section API Calls
function filterEvent(origin, params){
  event.preventDefault();
  // Clears previous Home content
  clearHome();
  // Clears breadcrumbs
  var breadcrumb = document.getElementById('breadcrumb');
  while(breadcrumb.childNodes.length > 1) {
    breadcrumb.removeChild(breadcrumb.lastChild);
  }
  //Creates 'section' XMLHttp Request
  var data = new XMLHttpRequest();
  request.open('GET', 'https://swapi.co/api/' + origin + '/', true);
  //Stores origin of JSON data to 'route' correct info to render
  request.onload = function() {
    //GET on SUCCESS
    if(this.readyState == 4 && this.status == 200) {
      //JSON response parse
      var results = [];
      var data = JSON.parse(this.response);
      //'Filtered Router' to each section JSON response
      switch (origin) {
        case 'people':
          for(character in params){
            for(var res in data.results){
              var url = data.results[res].url.split('/');
              var marker = url[url.length - 2];
              if(marker == params[character]){
                results.push(data.results[res]);
              }
            }
          }
          var filteredData = {
            results: results
          };
          renderPeople(filteredData);
          changeBreadcrumb(origin);
          break;
        case 'films':
          for(film in params){
            for(var res in data.results){
              var url = data.results[res].url.split('/');
              var marker = url[url.length - 2];
              if(marker == params[film]){
                results.push(data.results[res]);
              }
            }
          }
          var filteredData = {
            results: results
          };
          renderFilms(filteredData);
          changeBreadcrumb(origin);
          break;
        default:
          renderPlaceholder(origin);
          changeBreadcrumb(origin);
      }
    //ON ERROR
    } else if(request.status >= 400) {
        console.log('El recurso no existe o no se encuentra disponible.');
      }
  }
  //On menu click call
  request.send();
}
//Clears Home node children
function clearHome() {
  while(home.firstChild){
    home.removeChild(home.firstChild);
  }
}
