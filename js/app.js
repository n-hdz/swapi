//Creates home XMLHttp Request
var request = new XMLHttpRequest();
const app = document.getElementById('root');
const banner = document.createElement('h1');

//GET new connection
request.open('GET', 'https://swapi.co/api/', true);
app.appendChild(banner);
request.onload = function() {
  //JSON response parse
  var data = JSON.parse(this.response);
  //GET on SUCCESS
  if(request.status >= 200 && request.status < 400) {
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

  //ON ERROR
  } else if(request.status >= 400) {
      // Error status banner render
      banner.textContent = "This is not the page you are looking for!(404)";
      console.log('El recurso no existe o no se encuentra disponible.');
    }
}
//On Home load
request.send();

//Handles Section API Calls
function callerEvent(e){
  e.preventDefault();
  var call = new XMLHttpRequest();
  call.open('GET', this.href, true);
  call.onload = function() {
    //JSON response parse
    var innerData = JSON.parse(this.response);
    //GET on SUCCESS
    if(request.status >= 200 && request.status < 400) {
      //JSON data handling
      console.log(innerData);
    //ON ERROR
    } else if(request.status >= 400) {
        console.log('El recurso no existe o no se encuentra disponible.');
      }
  }
  //On menu click call
  call.send();
}
