import { Marker, Popup, Tooltip} from 'react-leaflet';
import {  useNavigate } from 'react-router-dom';

export const MarkerView = ({ coordenadas }) => {
  const navigate = useNavigate();
  console.log("estas son las coordenadas en markerview:", coordenadas);
  const handleClickMarker = (local) => {
    console.log("este es el valor del local dentro del handleClickMarker:", local);
   navigate(`/locales/${local}`);
    
  }
  return (
    coordenadas.map((coordenada, index) => (
      <Marker 
      key={index} 
      position={{ lat: coordenada.lat, lng: coordenada.lng }}
      eventHandlers={{
        click: () => handleClickMarker(coordenada.local)
      }}
      >
        <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={coordenada.local} className='popup'>
          {coordenada.local}
        </Tooltip>
        <Popup > {coordenada.local}</Popup>
      </Marker >

    ))
  )

}
