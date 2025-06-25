import { useContext } from 'react';
import '../../styles/card.css';
import { AuthContext } from '../../context/AuthContext';

export const Card = ({ id, name, description, image, price, tamanio, opciones, onClick }) => {
  const { login } = useContext(AuthContext);

  console.log("valor de opciones en card", opciones);
  console.log("valor de tamanio en card", tamanio);
  const handleClick = () => {
    onClick({ id, name, description, price });
  };
  return (

    <div
      className={`container-card ${login ? "container-card-button" : ""}`}
      onClick={handleClick}
    >
      {image
        ? <div className='container-card__img'>
          <img src={image} alt={name} />
        </div>
        : ""
      }

      <div className='container-card__info'>
        <h3>{name}</h3>
        <p>{description}</p>
        {tamanio
          ? (
            <div>
              {opciones && opciones.length > 0 ? (
                opciones.map(opcion => (
                  <div key={opcion.id} className='nombreOpciones'>
                    <h4>{opcion.nombre}</h4>
                    <p>${opcion.precio_adicional}</p>
                  </div>
                ))
              ) : (
                <p>No hay opciones disponibles</p>
              )}
            </div>
          )
          : <h3>${price}</h3>
        }


      </div>
    </div>
  );
}
