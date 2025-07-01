import '../../styles/Pedidos.css';
import { useEffect, useState } from 'react';

export const Pedidos = ({ onSuccess, valueInput, setPrice, price, setContValue, contValue, setCheck, setPedidos, updateComida, setVariante }) => {

    const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState([]); // Ahora es array para múltiples opciones
    const [cantidades, setCantidades] = useState({});

    useEffect(() => {
        setContValue(1);
        setOpcionesSeleccionadas([]);

        // Inicializamos todas las cantidades en 1
        if (valueInput.variantes?.[0]?.opciones) {
            const nuevasCantidades = {};
            valueInput.variantes[0].opciones.forEach(opcion => {
                nuevasCantidades[opcion.id] = 1;
            });
            setCantidades(nuevasCantidades);
        }
    }, [valueInput.name]);

    useEffect(() => {
        if (valueInput.tamanio === 1) {
            calcularPrecio(1, opcionesSeleccionadas);
        } else {
            calcularPrecio(updateComida?.cont || contValue, updateComida?.variantes || []);
        }
    }, [contValue, updateComida, opcionesSeleccionadas, valueInput.tamanio]);

    const calcularPrecio = (cantidadPlatos, variantesSeleccionadas = []) => {
        const precioBase = Number(valueInput.price);
        const precioExtraTotal = variantesSeleccionadas.reduce(
            (acc, variante) => acc + (variante.precioExtra * variante.cantidad || 0),
            0
        );
        if (valueInput.tamanio == 0) {
            const totalUnitario = precioBase * cantidadPlatos;
            const totalFinal = totalUnitario + precioExtraTotal;
            setPrice(totalFinal);
        } else {
            const totalFinal = precioExtraTotal;
            setPrice(totalFinal);
        }
    };

    const handleSumarCantidad = (opcion) => {
        setCantidades(prev => {
            const nuevasCantidades = { ...prev, [opcion.id]: prev[opcion.id] + 1 };

            const nuevaVariante = {
                id: opcion.id,
                nombre: opcion.nombre,
                precioExtra: Number(opcion.precio_adicional),
                cantidad: nuevasCantidades[opcion.id],
                nombreGrupo: opcion.nombre
            };

            setOpcionesSeleccionadas(prevSeleccionadas => {
                const existe = prevSeleccionadas.find(item => item.id === opcion.id);
                if (existe) {
                    return prevSeleccionadas.map(item => item.id === opcion.id ? nuevaVariante : item);
                } else {
                    return [...prevSeleccionadas, nuevaVariante];
                }
            });

            return nuevasCantidades;
        });
    };

    const handleRestarCantidad = (opcion) => {
        setCantidades(prev => {
            if (prev[opcion.id] > 1) {
                const nuevasCantidades = { ...prev, [opcion.id]: prev[opcion.id] - 1 };

                const nuevaVariante = {
                    id: opcion.id,
                    nombre: opcion.nombre,
                    precioExtra: Number(opcion.precio_adicional),
                    cantidad: nuevasCantidades[opcion.id],
                    nombreGrupo: opcion.nombre
                };

                setOpcionesSeleccionadas(prevSeleccionadas =>
                    prevSeleccionadas.map(item => item.id === opcion.id ? nuevaVariante : item)
                );

                return nuevasCantidades;
            } else {
                // Si llega a 1 y restamos, eliminamos la opción seleccionada
                const nuevasCantidades = { ...prev };
                delete nuevasCantidades[opcion.id];

                setOpcionesSeleccionadas(prevSeleccionadas =>
                    prevSeleccionadas.filter(item => item.id !== opcion.id)
                );

                return nuevasCantidades;
            }
        });
    };

    const generarIdPedido = () => {
        if (valueInput.tamanio === 1 && opcionesSeleccionadas.length > 0) {
            const nombres = opcionesSeleccionadas.map(v => v.nombre).join('-');
            return `${valueInput.name}-${nombres}`;
        } else {
            const variantesSeleccionadas = updateComida?.variantes || [];
            const nombres = variantesSeleccionadas.map(v => v.nombre).join('-');
            return `${valueInput.name}-${nombres}`;
        }
    };

    const handleAdd = () => {
        setCheck(true);

        const idPedidoActual = generarIdPedido();

        const variantesFinal = valueInput.tamanio === 1
            ? opcionesSeleccionadas
            : updateComida?.variantes || [];

        setPedidos((prevPedidos) => {
            const pedidoExistenteIndex = prevPedidos.findIndex(
                (pedido) => pedido.id === idPedidoActual
            );

            if (pedidoExistenteIndex >= 0) {
                return prevPedidos.map((pedido, index) =>
                    index === pedidoExistenteIndex
                        ? {
                            ...pedido,
                            cont: updateComida?.cont || contValue,
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
                        id: idPedidoActual,
                        cont: updateComida?.cont || contValue,
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
                            <div className='datosenimagen'>
                                {valueInput.price == 0 ? "" : <h4>{updateComida?.cont || contValue}x</h4>}
                                <h3>{valueInput.name}</h3>
                            </div>
                            {price == 0 ? "" : (valueInput.tamanio ? <p>${price}</p> : (valueInput.price == 0 ? "" : <p>${valueInput.price}</p>))}
                        </div>

                        <h5>{valueInput.description}</h5>
                        {(valueInput.tamanio === 1 && opcionesSeleccionadas.length > 0) && (
                            opcionesSeleccionadas.map((variante, index) => (
                                <div key={index} className='container-pedidos__guarnicion'>
                                    <div>
                                        <h6>{variante.cantidad}x</h6>
                                        <h6>{variante.nombre}</h6>
                                    </div>
                                    <h6 className='guarnicion-price'>${variante.precioExtra}</h6>
                                </div>
                            ))
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
                                type="checkbox"
                                name={`tamanio-${opcion.id}`}
                                id={`opcion-${opcion.id}`}
                                checked={opcionesSeleccionadas.some(item => item.id === opcion.id)}
                                readOnly
                            />
                            <label htmlFor={`opcion-${opcion.id}`}>{opcion.nombre} - ${opcion.precio_adicional}</label>

                            <div className='agregar'>
                                <span onClick={() => handleRestarCantidad(opcion)} className='simbolo-cant'>-</span>
                                <span>{cantidades[opcion.id] || 1}</span>
                                <span onClick={() => handleSumarCantidad(opcion)} className='simbolo-cant'>+</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <button className='buton-agregar-pedido' onClick={handleAdd}>
                <span>{contValue}</span> Agregar a mi pedido {price == 0 ? <span>0</span> : <span>${price}</span>}
            </button>
        </div>
    );
};
