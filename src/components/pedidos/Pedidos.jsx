
import '../../styles/Pedidos.css';
import { useEffect, useState } from 'react';

export const Pedidos = ({ onSuccess, valueInput, setPrice, price, setContValue, contValue, setCheck, setPedidos, updateComida, setVariante }) => {

    useEffect(() => {
        calcularPrecio(contValue, updateComida?.variantes || []);
    }, [contValue, updateComida]);


    console.log("valor de valueInput.image", valueInput.image);
    console.log("valor de valueInput", valueInput);
    console.log("ValueInput en Pedidos:", {
        ...valueInput,
        variantes: valueInput.variantes
    });

    const calcularPrecio = (cantidadPlatos, variantesSeleccionadas = []) => {
        const precioBase = Number(valueInput.price);
        const precioExtraTotal = variantesSeleccionadas.reduce(
            (acc, variante) => acc + (variante.precioExtra || 0),
            0
        );

        const totalUnitario = precioBase * cantidadPlatos;
        const totalFinal = totalUnitario + precioExtraTotal;

        setPrice(totalFinal);
    };

    const handleSumar = () => {
        const newValue = contValue + 1;
        setContValue(newValue);
        calcularPrecio(newValue, updateComida?.variantes || []);
    };

    const handleRestar = () => {
        if (contValue > 1) {
            const newValue = contValue - 1;
            setContValue(newValue);
            calcularPrecio(newValue, updateComida?.variantes || []);
        }
    };

    const handleAdd = () => {
        setCheck(true);

        setPedidos((prevPedidos) => {
            // Se compara por nombre + variantes para detectar si es el mismo pedido exacto
            const pedidoExistenteIndex = prevPedidos.findIndex(
                (pedido) =>
                    pedido.name === valueInput.name
            );

            if (pedidoExistenteIndex >= 0) {
                return prevPedidos.map((pedido, index) =>
                    index === pedidoExistenteIndex
                        ? {
                            ...pedido,
                            cont: contValue,
                            price: valueInput.price,
                            priceTotal: price,
                            variantes: updateComida?.variantes
                        }
                        : pedido
                );
            } else {
                return [
                    ...prevPedidos,
                    {
                        cont: contValue,
                        name: valueInput.name,
                        price: valueInput.price,
                        priceTotal: price,
                        variantes: updateComida?.variantes
                    },
                ];
            }
        });

        if (onSuccess) {
            onSuccess();
        }
    };
    const handleClickSeleccionar = () => {
        const priceValue = Number(valueInput.price);
        setPrice(priceValue);
        // Agregar nueva entrada en el historial para manejar el botón "atrás"
        window.history.pushState({ varianteOpen: true }, '');
        setVariante(true);
    }

    const totalExtras = Array.isArray(updateComida?.variantes)
        ? updateComida.variantes.reduce((acc, v) => acc + (v?.precioExtra || 0), 0)
        : 0;
    return (

        <div className="container-pedidos">
            <div className='container-pedidos__data'>

                <div className="container-pedidos__img">
                    <h3> {valueInput.name} </h3>
                    <img src={valueInput.image} alt={valueInput.name} />
                </div>

                <div className='container-pedidos__description'>
                    <div>
                        <div>
                            <div>
                                <h4>{contValue}x</h4>
                                <h3>{valueInput.name}</h3>
                            </div>
                            <p>${(Number(valueInput.price) * contValue)}</p>
                        </div>

                        <h5>{valueInput.description}</h5>
                        {updateComida?.variantes?.map((variante, index) => (
                            variante ? (
                                <div key={index} className='container-pedidos__guarnicion'>
                                    <div>
                                        <h6>{variante.cantidad}x</h6>
                                        <h6>{variante.nombre}</h6>
                                    </div>
                                    <h6 className='guarnicion-price'>${variante.precioExtra}</h6>
                                </div>
                            ) : null
                        ))}

                    </div>
                </div>
            </div>
            {valueInput.variantes?.length > 0 ? <div className='container-pedidos__eleccion unidades'>
                <p>{valueInput?.variantes[0].nombre}</p>
                <div className='seleccionar'><span onClick={handleClickSeleccionar}>Seleccionar</span></div>
            </div> : null}

            <div className='container-pedidos__eleccion unidades'>
                <p>Unidades</p>
                <div className='agregar'> <span onClick={handleRestar} className='simbolo-cant' >-</span>  <span>{contValue}</span> <span onClick={handleSumar} className='simbolo-cant'>+</span>   </div>
            </div>
            <button className='buton-agregar-pedido' onClick={handleAdd}> <span> {contValue} </span> Agregar a mi pedido <span> ${price} </span> </button>
        </div>

    )
}
