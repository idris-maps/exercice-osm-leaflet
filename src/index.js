// importer les fonctions leaflet dont nous avons besoin
import {
  map as initMap,
  tileLayer,
  icon,
  marker,
} from 'leaflet'
// importer les données geojson
import bars from './bars'

// initializer la carte
const map = initMap('map').setView([46.7785, 6.6412], 15)

// créer un fond de carte
const osmCH = tileLayer('https://tile.osm.ch/switzerland/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  bounds: [[45, 5], [48, 11]]
})

// créer une icone
const barIcon = icon({
  iconUrl: 'bar.png',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
})

// pour chaque "feature" de la collection geojson
const markers = bars.features
  .map(feature => {
    // extraire les coordonnées
    const [longitude, latitude] = feature.geometry.coordinates
    // créer un marqueur par "feature" avec l'icone
    return marker([latitude, longitude], { icon: barIcon })
      // attacher un pop up avec le nom du bar
      .bindPopup(feature.properties.name || 'NO NAME')
  })

// ajouter le fond de carte à la carte
osmCH.addTo(map)
// ajouter les markers
markers.forEach(marker => marker.addTo(map))