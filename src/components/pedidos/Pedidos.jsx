import '../../styles/Pedidos.css';
import { useEffect, useState } from 'react';

export const Pedidos = ({ onSuccess, valueInput, setPrice, price, setContValue, contValue, setCheck, setPedidos, updateComida, setVariante }) => {

    const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

    useEffect(() => {
        if (valueInput.tamanio === 1 && opcionSeleccionada) {
            calcularPrecio(contValue, [opcionSeleccionada]);
        } else {
            calcularPrecio(contValue, updateComida?.variantes || []);
        }
    }, [contValue, updateComida, opcionSeleccionada, valueInput.tamanio]);

    useEffect(() => {
        setContValue(1);
        setOpcionSeleccionada(null);
    }, [valueInput]);

    console.log("valor de valueInput.image", valueInput.image);
    console.log("valor de valueInput", valueInput);
    console.log("ValueInput en Pedidos:", {
        ...valueInput,
        variantes: valueInput.variantes
    });

    // ✅ Generador de ID único por combinación de producto + variantes
    const generarIdPedido = () => {
        if (valueInput.tamanio === 1 && opcionSeleccionada) {
            return `${valueInput.name}-${opcionSeleccionada.nombre}`;
        } else {
            const variantesSeleccionadas = updateComida?.variantes || [];
            const variantesNombres = variantesSeleccionadas.map(v => v.nombre).join('-');
            return `${valueInput.name}-${variantesNombres}`;
        }
    };

    const calcularPrecio = (cantidadPlatos, variantesSeleccionadas = []) => {
        const precioBase = Number(valueInput.price);
        const precioExtraTotal = variantesSeleccionadas.reduce(
            (acc, variante) => acc + (variante.precioExtra || 0),
            0
        );
        if (valueInput.tamanio == 0) {
            const totalUnitario = precioBase * cantidadPlatos;
            const totalFinal = totalUnitario + precioExtraTotal;
            setPrice(totalFinal);
        } else {
            const totalFinal = cantidadPlatos * precioExtraTotal;
            setPrice(totalFinal);
        }

        console.log("valor de updateComida en pedidos", updateComida);
    };

    const handleSumar = () => {
        const newValue = contValue + 1;
        setContValue(newValue);
        if (valueInput.tamanio === 1 && opcionSeleccionada) {
            calcularPrecio(newValue, [opcionSeleccionada]);
        } else {
            calcularPrecio(newValue, updateComida?.variantes || []);
        }
    };

    const handleRestar = () => {
        if (contValue > 1) {
            const newValue = contValue - 1;
            setContValue(newValue);
            if (valueInput.tamanio === 1 && opcionSeleccionada) {
                calcularPrecio(newValue, [opcionSeleccionada]);
            } else {
                calcularPrecio(newValue, updateComida?.variantes || []);
            }
        }
    };

    const handleAdd = () => {
         if (valueInput.tamanio !== 1 && (!updateComida || !updateComida.variantes || updateComida.variantes.length === 0)) {
        alert("Por favor, seleccioná las variantes antes de agregar al pedido.");
        return;
    }

    if (price <= 0) {
        alert("El precio no puede ser cero.");
        return;
    }
        setCheck(true);

        // ✅ Generamos el ID único para este pedido
        const idPedidoActual = generarIdPedido();

        setPedidos((prevPedidos) => {
            const pedidoExistenteIndex = prevPedidos.findIndex(
                (pedido) => pedido.id === idPedidoActual
            );

            const variantesFinal = valueInput.tamanio === 1
                ? (opcionSeleccionada ? [opcionSeleccionada] : [])
                : updateComida?.variantes || [];

            if (pedidoExistenteIndex >= 0) {
                return prevPedidos.map((pedido, index) =>
                    index === pedidoExistenteIndex
                        ? {
                            ...pedido,
                            cont: contValue,
                            price: valueInput.price,
                            priceTotal: price,
                            category: valueInput.categoria,
                            variantes: variantesFinal
                        }
                        : pedido
                );
            } else {
                return [
                    ...prevPedidos,
                    {
                        id: idPedidoActual, // ✅ Agregamos el ID único al pedido
                        cont: contValue,
                        name: valueInput.name,
                        price: valueInput.price,
                        priceTotal: price,
                        category: valueInput.categoria,
                        variantes: variantesFinal
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
        window.history.pushState({ varianteOpen: true }, '');
        setVariante({ open: true, cantidad: contValue });
    };

    const handleSeleccionarTamanio = (opcion) => {
        const nuevaVariante = {
            nombre: opcion.nombre,
            precioExtra: Number(opcion.precio_adicional),
            cont: contValue
        };

        setOpcionSeleccionada(nuevaVariante);
        calcularPrecio(contValue, [nuevaVariante]);
    };

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
                            {price == 0 ? "" : <p>${price}</p>}                           
                        </div>

                        <h5>{valueInput.description}</h5>
                        {(valueInput.tamanio === 1 && opcionSeleccionada) && (
                            <div className='container-pedidos__guarnicion'>
                                <div>
                                    <h6>{opcionSeleccionada.cont}x</h6>
                                    <h6>{opcionSeleccionada.nombre}</h6>
                                </div>
                                <h6 className='guarnicion-price'>${opcionSeleccionada.precioExtra}</h6>
                            </div>
                        )}

                        {(valueInput.tamanio !== 1) && updateComida?.variantes?.map((variante, index) => (
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

            {valueInput.variantes?.length > 0 && valueInput.tamanio === 1 && (
                <div className='container-pedidos__eleccion tamanios'>
                    <p>{valueInput?.variantes[0].nombre}</p>
                    {valueInput.variantes[0].opciones?.map(opcion => (
                        <div key={opcion.id} className='opcion-tamanio'>
                            <input
                                type="radio"
                                name="tamanio"
                                value={opcion.nombre}
                                id={`opcion-${opcion.id}`}
                                checked={opcionSeleccionada?.nombre === opcion.nombre}
                                onChange={() => handleSeleccionarTamanio(opcion)}
                            />
                            <label htmlFor={`opcion-${opcion.id}`}>{opcion.nombre} - ${opcion.precio_adicional}</label>
                        </div>
                    ))}
                </div>
            )}

            {valueInput.variantes?.length > 0 && valueInput.tamanio !== 1 && (
                <div className='container-pedidos__eleccion unidades'>
                    <p>{valueInput?.variantes[0].nombre}</p>
                    <div className='seleccionar'><span onClick={handleClickSeleccionar}>Seleccionar</span></div>
                </div>
            )}

            <div className='container-pedidos__eleccion unidades'>
                <p>Unidades</p>
                <div className='agregar'>
                    <span onClick={handleRestar} className='simbolo-cant'>-</span>
                    <span>{contValue}</span>
                    <span onClick={handleSumar} className='simbolo-cant'>+</span>
                </div>
            </div>

            <button className='buton-agregar-pedido' onClick={handleAdd}>
                <span>{contValue}</span> Agregar a mi pedido <span>${price}</span>
            </button>
        </div>
    );
};