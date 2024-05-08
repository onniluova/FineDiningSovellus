var map = L.map('map').setView([60.1666052, 24.9430558], 16);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let circle = L.circle([60.166666, 24.945596], {
  color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 10
}).addTo(map);
circle.bindPopup("Olet täällä!");

async function addMarkersToMap(){
  try{
    let locationLat = 60.166666;
    let locationLon = 24.945596;

  }catch(error){
    console.error('There was a problem with the fetch operation: ', error);
  }

}


async function getBikeStations() {
  try {
    const response = await fetch('http://127.0.0.1:3000/reititys');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const bikeStations = await response.json();
    console.log("Bikestations",bikeStations);
    return bikeStations
  } catch (error) {
    console.error('There was a problem with the fetch operation: ', error);
  }
}

async function getBikeStationById(id) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/reititys/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const bikeStation = await response.json();
    console.log("Bikestation by id", bikeStation);
    return bikeStation;
  } catch (error) {
    console.error('There was a problem with the fetch operation: ', error);
  }
}

window.onload = function() {
  getBikeStations();
  getBikeStationById("070");

}
