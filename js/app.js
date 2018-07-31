//Creates XMLHttp Request
var request = new XMLHttpRequest();
//GET new connection
request.open('GET', 'https://swapi.co/api/', true);

request.onload = function() {
  //JSON response parse
  var data = JSON.parse(this.response);
  //GET on SUCCESS
  if(request.status >= 200 && request.status < 400) {
    //JSON data handling
  //ON ERROR
} else if(request.status >= 400) {
    console.log('El recurso no existe o no se encuentra disponible.');
  }
}

request.send();
