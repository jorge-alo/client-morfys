import { MapContainer, TileLayer, Marker, Popup, useMap, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import '../../styles/MapView.css'
import { MarkerView } from './Marker';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Configura los iconos para producción
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Icono personalizado para el usuario
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


// Componente para centrar el mapa en la ubicación del usuario
function CenterMap({ userLocation, defaultCenter }) {
  const map = useMap();
  useEffect(() => {
    if (userLocation) {
      map.flyTo(userLocation, 15); // Zoom más cercano para ubicación precisa
    } else {
      map.flyTo(defaultCenter, 13); // Zoom por defecto para vista general
    }
  }, [userLocation, defaultCenter, map]);
  return null;
}

export const MapView = ({ localsFilter }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const defaultCenter = { lat: -34.597212, lng: -58.938351 };
  
  const coordenadas = localsFilter.map(coordenada => {
    return { local: coordenada.local, lat: coordenada.latitud, lng: coordenada.longitud };
  });

  // Obtener ubicación del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoading(false);
        },
        (error) => {
          console.warn("Error obteniendo ubicación:", error.message);
          setLoading(false);
        },
        { timeout: 10000 } // Timeout después de 10 segundos
      );
    } else {
      console.warn("Geolocalización no soportada por el navegador");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="loading-map">Cargando mapa...</div>;
  }

  return (
    <MapContainer 
      center={userLocation || defaultCenter} 
      zoom={userLocation ? 15 : 13}
      className="map-container"
    >
      <CenterMap userLocation={userLocation} defaultCenter={defaultCenter} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
        className='tilelayer'
      />
      
      {/* Marcador de la ubicación del usuario */}
      {userLocation && (
        <Marker position={userLocation} icon={userIcon}>
          <Popup>¡Estás aquí!</Popup>
          <Tooltip permanent>Tu ubicación</Tooltip>
        </Marker>
      )}
      
      {/* Marcadores de los locales */}
      <MarkerView coordenadas={coordenadas} />
    </MapContainer>
  );
};
