import { useContext } from 'react';
import '../../styles/card.css';
import { AuthContext } from '../../context/AuthContext';

export const Card = ({ id, name, description, image, price, onClick }) => {
  const { login } = useContext(AuthContext);


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
          <img src={`${import.meta.env.VITE_IMAGE_URL}/${image}`} alt={name} />
        </div> 
        : ""
        }
        
        <div className='container-card__info'>
          <h3>{name}</h3>
          <p>{description}</p>
          <h3>${price}</h3>
        </div>
      </div>
  );
}
