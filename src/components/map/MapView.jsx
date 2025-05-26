import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import '../../styles/MapView.css'
import { MarkerView } from './Marker';


export const MapView = ({ localsFilter }) => {
    
    const coordenadas = localsFilter.map(coordenada => {
        return {local: coordenada.local, lat: coordenada.latitud, lng:coordenada.longitud}
    })
    console.log("estas son las coordenadas", coordenadas);
    return <MapContainer 
    center={{ lat: -34.597212, lng: -58.938351 }} 
    zoom={13}
    
     >
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
            className='tilelayer'
        />
        
        <MarkerView coordenadas={coordenadas} />
    </MapContainer>
}
