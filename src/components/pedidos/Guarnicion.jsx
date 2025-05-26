import { useEffect, useState } from 'react';
import '../../styles/Guarnicion.css';


export const Guarnicion = ({
  comidas,
  pedidos,
  setPedidos,
  setGuarnicion,
  valueInput,
  setUpdateComida,
}) => {
  const [cantidades, setCantidades] = useState({});
  const [seleccionadas, setSeleccionadas] = useState([]);
  

  const handleSumar = (comida) => {
    if (!seleccionadas.includes(comida.name)) {
      setSeleccionadas(prev => [...prev, comida.name]);
    }
    setCantidades(prev => ({
      ...prev,
      [comida.name]: (prev[comida.name] || 1) + 1
    }));
  };

  const handleRestar = (comida) => {
    setCantidades(prev => {
      const current = prev[comida.name] || 1;
      if (current <= 1) return prev;
      return {
        ...prev,
        [comida.name]: current - 1
      };
    });
  };

  const handleSelect = (comida) => {
    setSeleccionadas(prev => {
      if (prev.includes(comida.name)) {
        setCantidades(prevCant => {
          const newCant = { ...prevCant };
          delete newCant[comida.name]; // ❗ eliminamos del objeto cantidades
          return newCant;
        });
        // Si ya estaba seleccionada, la quitamos
        return prev.filter(name => name !== comida.name);
      } else {
        setCantidades(prev => ({
          ...prev,
          [comida.name]: prev[comida.name] || 1
        }));
        // Si no estaba seleccionada, la agregamos
        return [...prev, comida.name];
      }
    });



  };

  const handleAdd = () => {
    setUpdateComida("");
    const guarnicionesSeleccionadas = comidas
      .filter(comida => comida.categoria === 'guarnicion')
      .filter(comida => cantidades[comida.name])
      .map(comida => ({
        name: comida.name,
        cont: cantidades[comida.name],
        price: comida.price * cantidades[comida.name]
      }));

    console.log("estas son las guarnicionesSeleccionadas", guarnicionesSeleccionadas);
    const nuevaComida = comidas.find(comida => comida.name === valueInput.name);

    if (!nuevaComida) return; // por si no se encuentra

    const nuevaComidaConGuarniciones = {
      ...nuevaComida,
      guarnicionesSeleccionadas
    };
    setUpdateComida(nuevaComidaConGuarniciones);
   
    // Verificar si ya existe en pedidos
    const yaExiste = pedidos.some(p => p.name === valueInput.name);

    setPedidos(prev => {
      if (yaExiste) {
        return prev.map(p =>
          p.name === valueInput.name ? nuevaComidaConGuarniciones : p
        );
      } else {
        // Si no está, lo agregamos
        return [...prev, nuevaComidaConGuarniciones];
      }
    });
    setGuarnicion(false); // volver a la pantalla anterior
  };

  const handleClickVolver = () => {
    setGuarnicion(false);
  };
  return (
    <div className="container-guarnicion">
      <div className='eligeTuGuarnicion'>
        <span onClick={handleClickVolver} className='container-guarnicion__volver'>⬅️</span>
        <h4>Elige tu guarnicion</h4>
      </div>

      <h3>Elige</h3>
      <div className='container-guarnicion__items'>
        {comidas.map((comida, index) => {
          if (comida.categoria === 'guarnicion') {
            const count = cantidades[comida.name] || 1;
            return (
              <div
                key={index}
                className={`item-guarnicion ${seleccionadas.includes(comida.name) ? 'selected' : ""}`}
                onClick={() => handleSelect(comida)}
              >
                <div>
                  <p>{comida.name} {seleccionadas.includes(comida.name) && '✔️'}</p>
                  <h5>+ ${comida.price} </h5>
                </div>
                <div className='agregar'>
                  <span onClick={(e) => { e.stopPropagation(); handleRestar(comida); }} className='simbolo-cant'>-</span>
                  <span>{count}</span>
                  <span onClick={(e) => { e.stopPropagation(); handleSumar(comida); }} className='simbolo-cant'>+</span>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      <button
        className='buton-aceptar-guarnicion'
        onClick={handleAdd}
        disabled={Object.keys(cantidades).length === 0}
      >
        Aceptar
      </button>
    </div>
  );
}
