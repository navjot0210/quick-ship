'use strict';

function listen(event, selector, callback) {
    return selector.addEventListener(event, callback);
}
   
function select(selector) {
    return document.querySelector(selector);
}
  
const trackButton = select('.primary-icon-btn');

mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VybGlua2F1ciIsImEiOiJjbHExYjM4cHUwNzE3MnBud25qNDlmc2VjIn0.Jeu9BD0h1vILAwXce8dQqw';

function getLocation(position) {
    let { latitude, longitude } = position.coords;
  
    setupMap([longitude, latitude], longitude, latitude);
}

const options = {
    enableHighAccuracy: true
};

function errorHandler() {
    return 'Unable to retrieve your location';
}

function setupMap(center, longitude, latitude) {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 15
    });

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);

    const marker1 = new mapboxgl.Marker({color: '#ff7342'})
    .setLngLat([longitude, latitude])
    .addTo(map);
}

listen('click', trackButton, function() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          getLocation, errorHandler, options
        );
      } else {
        console.log('Geolocation is not supported by your browser');
      }
});