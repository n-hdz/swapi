//Creates home XMLHttp Request
var request = new XMLHttpRequest();
const app = document.getElementById('root');
const banner = document.createElement('div');
banner.setAttribute('class', 'banner');
const message = document.createElement('h1');
const home = document.createElement('div');
home.setAttribute('class', 'home');
home.setAttribute('id', 'canvas');
// Set Default Section
const defaultSection = 'https://swapi.co/api/films/';

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
  e.preventDefault();
  // Clears previous Home content
  clearHome();
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
          break;
        case 'films':
          renderFilms(data);
          break;
        default:
          renderPlaceholder(origin);
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
function renderFilms(data) {
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
}

function renderBigFilm(card) {
  var bigCard = document.createElement('div');
  bigCard.setAttribute('class', 'big');

  //Close button
  var close = document.createElement('button');
  close.textContent = 'X';
  close.setAttribute('class', 'btn-close')
  close.onclick = closeCard;

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
  index.appendChild(people);
  //Planet filter
  var planets = document.createElement('a');
  planets.textContent = 'Related planets'
  index.appendChild(planets);
  //Starships filter
  var starships = document.createElement('a');
  starships.textContent = 'Related starships'
  index.appendChild(starships);
  //Vehicles filter
  var vehicles = document.createElement('a');
  vehicles.textContent = 'Related vehicles'
  index.appendChild(vehicles);
  //Species filter
  var species = document.createElement('a');
  species.textContent = 'Related species'
  index.appendChild(species);

  //Render
  bigCard.appendChild(close);

  leftColumn.appendChild(title);
  leftColumn.appendChild(filmId);
  leftColumn.appendChild(director);
  leftColumn.appendChild(producer);
  leftColumn.appendChild(dateOfRelease);

  rightColumn.appendChild(crawl);

  bigCard.appendChild(leftColumn);
  bigCard.appendChild(rightColumn);
  bigCard.appendChild(index);

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
    if(speciesCode == 1){
      card.dataset.species = 'Human';
    } else if(speciesCode == 2){
      card.dataset.species = 'Droid';
    }

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
}

function renderBigPerson(card) {
  var bigCard = document.createElement('div');
  bigCard.setAttribute('class', 'big');

  //Close button
  var close = document.createElement('button');
  close.textContent = 'X';
  close.setAttribute('class', 'btn-close')
  close.onclick = closeCard;

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
  index.appendChild(films);
  //Planet filter
  var planets = document.createElement('a');
  planets.textContent = 'Related planets'
  index.appendChild(planets);
  //Starships filter
  var starships = document.createElement('a');
  starships.textContent = 'Related starships'
  index.appendChild(starships);
  //Vehicles filter
  var vehicles = document.createElement('a');
  vehicles.textContent = 'Related vehicles'
  index.appendChild(vehicles);
  //Species filter
  var speciesF = document.createElement('a');
  species.textContent = 'Related species'
  index.appendChild(speciesF);

  //Render
  bigCard.appendChild(close);

  leftColumn.appendChild(name);
  leftColumn.appendChild(species);
  leftColumn.appendChild(height);
  leftColumn.appendChild(eyeColor);
  leftColumn.appendChild(hairColor);
  leftColumn.appendChild(gender);
  leftColumn.appendChild(dob);

  bigCard.appendChild(leftColumn);
  bigCard.appendChild(index);
  home.appendChild(bigCard);
}

//Placeholder renderer //
function renderPlaceholder(origin) {
  var placeHolder = document.createElement('h2');
  placeHolder.textContent = 'Very soon you will see the data of ' + origin;
  home.appendChild(placeHolder);
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

//Clears big card
function closeCard() {
  var bigCard = document.getElementsByClassName('big')[0];
  home.removeChild(bigCard);
  var cards = document.getElementsByClassName('card');
  for(var i = 0; i < cards.length; i++){
    cards[i].classList.value = 'card';
  }
}

//Clears Home node children
function clearHome() {
  while(home.firstChild){
    home.removeChild(home.firstChild);
  }
}
