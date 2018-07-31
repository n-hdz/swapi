//Creates home XMLHttp Request
var request = new XMLHttpRequest();
const app = document.getElementById('root');
const banner = document.createElement('h1');
const home = document.createElement('div');
// Set Default Section
const defaultSection = 'https://swapi.co/api/films/';

//GET new connection
request.open('GET', 'https://swapi.co/api/', true);
app.appendChild(banner);

/// Sets Main Menu and Default Section
request.onload = function() {
  //JSON response parse
  var data = JSON.parse(this.response);
  //GET on SUCCESS
  if(this.readyState == 4 && this.status == 200) {
    // OK status banner render
    banner.textContent = "Star Wars Data";
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
    app.appendChild(mainMenu);
    // Render Default Section
    renderDefault();
  //ON ERROR
  } else if(request.status >= 400) {
      // Error status banner render
      banner.textContent = "This is not the page you are looking for!(404)";
      console.log('El recurso no existe o no se encuentra disponible.');
    }
}
 //// On Home load ////
request.send();

//Renders onLoad first Section; Can be configured to any section
function renderDefault(){
  //GETS Default section (Films)
  const defaultRender = new XMLHttpRequest();
  defaultRender.open('GET', defaultSection, true);
  defaultRender.onload = function() {
    var data = JSON.parse(this.response);
    //GET on SUCCESS
    if(this.readyState == 4 && this.status == 200) {
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
  var data = new XMLHttpRequest();
  request.open('GET', this.href, true);
  request.onload = function() {
    //JSON response parse
    var data = JSON.parse(this.response);
    //GET on SUCCESS
    if(this.readyState == 4 && this.status == 200) {
      //JSON data handling
      console.log(data);
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
  for(var film in data.results){
    //Creates each individual card
    var card = document.createElement('div');
    card.setAttribute('class', 'card');
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

//Section Extra Info Switcher
function infoEvent(){
  console.log("Click!");
}
