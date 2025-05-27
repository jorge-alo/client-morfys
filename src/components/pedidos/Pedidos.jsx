
import '../../styles/Pedidos.css';
import { useEffect, useState } from 'react';

export const Pedidos = ({ onSuccess, valueInput, setPrice, price, setContValue, contValue, setCheck, setPedidos, updateComida, guarnicion, setGuarnicion }) => {

    useEffect(() => {
        setContValue(1);
        calcularPrecio(1);
    }, [])


    console.log("valor de valueInput.image", valueInput.image);

    const obtenerPreciosGuarniciones = () => {
        return (updateComida?.guarnicionesSeleccionadas || []).reduce(
            (acc, g) => acc + g.price,
            0
        );
    };

    const calcularPrecio = (cantidad) => {
        const precioBase = valueInput.price;
        const precioGuarniciones = obtenerPreciosGuarniciones();
        const totalUnitario = precioBase * cantidad;
        const totalFinal = totalUnitario + precioGuarniciones;
        setPrice(totalFinal);
    }
    const handleSumar = () => {
        const newValue = contValue + 1;
        setContValue(newValue);
        calcularPrecio(newValue);
    }

    const handleRestar = () => {
        if (contValue > 1) {
            const newValue = contValue - 1;
            setContValue(newValue);
            calcularPrecio(newValue);
        }
    }

    const handleAdd = () => {
        if (valueInput.guarnicion && !guarnicion && updateComida?.guarnicionesSeleccionadas?.length === 0) {
            return setGuarnicion(true);
        }
        setCheck(true);
        setPedidos(prevPedidos => {
            const pedidoExistenteIndex = prevPedidos.findIndex(pedido =>
                pedido.name == valueInput.name
            )

            if (pedidoExistenteIndex >= 0) {
                return prevPedidos.map((pedido, index) =>
                    index == pedidoExistenteIndex
                        ? { ...pedido, cont: contValue,price: valueInput.price, priceTotal: price }
                        : pedido
                )
            } else {
                return [...prevPedidos, { cont: contValue, name: valueInput.name, price: valueInput.price, priceTotal: price }]
            }
        })
        if (onSuccess) {

            onSuccess();
        }
    }

    const handleClickSeleccionar = () => {
        const priceValue = Number(valueInput.price);
        setPrice(priceValue);
        setGuarnicion(true);
    }
    return (

        <div className="container-pedidos">
            <div className='container-pedidos__data'>

                <div className="container-pedidos__img">
                    <h3> {valueInput.name} </h3>
                    <img src={`${import.meta.env.VITE_IMAGE_URL}/${valueInput.image}`} />
                </div>

                <div className='container-pedidos__description'>
                    <div>
                        <div>
                            <div>
                                <h4>{contValue}x</h4>
                                <h3>{valueInput.name}</h3>
                            </div>
                            
                            
                            <p>${valueInput.price * contValue}</p>
                        </div>
                        
                        <h5>{valueInput.description}</h5>

                        {updateComida?.guarnicionesSeleccionadas?.map((guarnicion, index) => (
                            <div key={index} className='container-pedidos__guarnicion'>
                                <div>
                                    <h6>{guarnicion.cont}x </h6>
                                    <h6>{guarnicion.name}</h6>
                                </div>

                                <h6 className='guarnicion-price'>${guarnicion.price}</h6>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {valueInput.guarnicion ? <div className='container-pedidos__eleccion unidades'>
                <p>Guarniciones</p>
                <div className='seleccionar'><span onClick={handleClickSeleccionar}>Seleccionar</span></div>
            </div> : ""}

            <div className='container-pedidos__eleccion unidades'>
                <p>Unidades</p>
                <div className='agregar'> <span onClick={handleRestar} className='simbolo-cant' >-</span>  <span>{contValue}</span> <span onClick={handleSumar} className='simbolo-cant'>+</span>   </div>
            </div>
            <button className='buton-agregar-pedido' onClick={handleAdd}> <span> {contValue} </span> Agregar a mi pedido <span> {price} </span> </button>
        </div>

    )
}
