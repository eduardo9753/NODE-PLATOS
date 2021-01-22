window.addEventListener('DOMContentLoaded' , () => {

//INICIAMOS SOCKET IO
const socket = io();    


//COORD DE MAPA AL INICIO
const map = L.map('map').setView([-11.1920888 , -77.3314638,8.25] , 8);
const mapURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
L.tileLayer(mapURL).addTo(map);


//MI UBICACION
const myCoords = () => {
  map.locate({ enableHigthAcurracy : true});//PEDIR UBICACION AL CLIENTE
  map.on('locationfound' , (e) => {
      console.log('TU COORDENADA: ', e); //IMPRIMOS TU UBICACION
      const coords = [ e.latlng.lat , e.latlng.lng];
      const newMarker = L.marker(coords);
      newMarker.bindPopup('You are Here');
      map.addLayer(newMarker);
      socket.emit('userCoordinates' , e.latlng);//EMITIENDO(1)
  });
};

//UBICAION DEL OTRO CLIENTE
const coordsNewUser = () =>{
    socket.on('newUserCoordinates' , (coords) => {//ESCUCHA(2)
        console.log('NEW USER IS CONNECTED' , coords);//EN CONSOLA WEB
        const newCoords = [coords.lat , coords.lng];//LOCALIZACION DEL NEW USER 
        const newUserMaker = L.marker(newCoords);
        newUserMaker.bindPopup('HELLO HERE');
        map.addLayer(newUserMaker);
    });
}

 //EJECUTANDO EVENTOS
 window.addEventListener('load' , myCoords);
 window.addEventListener('load' , coordsNewUser);
})