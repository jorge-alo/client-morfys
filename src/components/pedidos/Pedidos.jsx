import '../../styles/Pedidos.css';
import { useEffect, useState } from 'react';

export const Pedidos = ({ onSuccess, valueInput, setPrice, price, setContValue, contValue, setCheck, setPedidos, updateComida, setVariante }) => {

    const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState([]);
    const [cantidades, setCantidades] = useState({});

    useEffect(() => {
        setContValue(1);
        setOpcionesSeleccionadas([]);

        if (valueInput.variantes?.[0]?.opciones) {
            const nuevasCantidades = {};
            valueInput.variantes[0].opciones.forEach(opcion => {
                nuevasCantidades[opcion.id] = 1;
            });
            setCantidades(nuevasCantidades);
        }
    }, [valueInput.name]);

    useEffect(() => {
        if (valueInput.tamanio === 1 && opcionesSeleccionadas.length > 0) {
            calcularPrecio(opcionesSeleccionadas);
        } else {
            calcularPrecio(updateComida?.variantes || []);
        }
    }, [contValue, updateComida, opcionesSeleccionadas, valueInput.tamanio]);

    const calcularPrecio = (variantesSeleccionadas = []) => {
        const precioBase = Number(valueInput.price);
        let precioTotal = 0;

        if (valueInput.tamanio === 1) {
            variantesSeleccionadas.forEach(variante => {
                precioTotal += (variante.precioExtra * cantidades[variante.id]);
            });
            setPrice(precioTotal);
        } else {
            const precioExtras = variantesSeleccionadas.reduce((acc, variante) => acc + (variante.precioExtra || 0), 0);
            const totalUnitario = precioBase * contValue;
            setPrice(totalUnitario + precioExtras);
        }
    };

    const generarIdPedido = () => {
        if (valueInput.tamanio === 1 && opcionesSeleccionadas.length > 0) {
            const nombres = opcionesSeleccionadas.map(o => o.nombre).join('-');
            return `${valueInput.name}-${nombres}`;
        } else {
            const variantesSeleccionadas = updateComida?.variantes || [];
            const variantesNombres = variantesSeleccionadas.map(v => v.nombre).join('-');
            return `${valueInput.name}-${variantesNombres}`;
        }
    };

    const handleSumarCantidad = (opcion) => {
        setCantidades(prev => {
            const nuevasCantidades = { ...prev, [opcion.id]: prev[opcion.id] + 1 };
            calcularPrecio(opcionesSeleccionadas);
            return nuevasCantidades;
        });
    };

    const handleRestarCantidad = (opcion) => {
        setCantidades(prev => {
            if (prev[opcion.id] > 1) {
                const nuevasCantidades = { ...prev, [opcion.id]: prev[opcion.id] - 1 };
                calcularPrecio(opcionesSeleccionadas);
                return nuevasCantidades;
            }
            return prev;
        });
    };

    const handleCheckboxChange = (opcion) => {
        if (opcionesSeleccionadas.some(o => o.id === opcion.id)) {
            const nuevasOpciones = opcionesSeleccionadas.filter(o => o.id !== opcion.id);
            setOpcionesSeleccionadas(nuevasOpciones);
        } else {
            const nuevaVariante = {
                id: opcion.id,
                nombre: opcion.nombre,
                precioExtra: Number(opcion.precio_adicional),
                cantidad: cantidades[opcion.id]
            };
            setOpcionesSeleccionadas([...opcionesSeleccionadas, nuevaVariante]);
        }
    };

    const handleAdd = () => {
        setCheck(true);

        const idPedidoActual = generarIdPedido();

        setPedidos((prevPedidos) => {
            const pedidoExistenteIndex = prevPedidos.findIndex(
                (pedido) => pedido.id === idPedidoActual
            );

            const variantesFinal = valueInput.tamanio === 1
                ? opcionesSeleccionadas.map(opcion => ({
                    ...opcion,
                    cantidad: cantidades[opcion.id]
                }))
                : updateComida?.variantes || [];

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

    const handleClickSeleccionar = () => {
        const priceValue = Number(valueInput.price);
        window.history.pushState({ varianteOpen: true }, '');
        setVariante({ open: true, cantidad: contValue });
    };

    const handleSumar = () => {
        const newValue = contValue + 1;
        setContValue(newValue);
        if (valueInput.tamanio === 1 && opcionesSeleccionadas.length > 0) {
            calcularPrecio(opcionesSeleccionadas);
        } else {
            calcularPrecio(updateComida?.variantes || []);
        }
    };

    const handleRestar = () => {
        if (contValue > 1) {
            const newValue = contValue - 1;
            setContValue(newValue);
            if (valueInput.tamanio === 1 && opcionesSeleccionadas.length > 0) {
                calcularPrecio(opcionesSeleccionadas);
            } else {
                calcularPrecio(updateComida?.variantes || []);
            }
        }
    };

    return (
        <div className="container-pedidos">
            {valueInput.variantes?.length > 0 && valueInput.tamanio === 1 && (
                <div className='container-pedidos__eleccion tamanios'>
                    <p>{valueInput?.variantes[0].nombre}</p>
                    {valueInput.variantes[0].opciones?.map(opcion => (
                        <div key={opcion.id} className='opcion-tamanio'>
                            <input
                                type="checkbox"
                                name="tamanio"
                                value={opcion.nombre}
                                id={`opcion-${opcion.id}`}
                                checked={opcionesSeleccionadas.some(o => o.id === opcion.id)}
                                onChange={() => handleCheckboxChange(opcion)}
                            />
                            <label htmlFor={`opcion-${opcion.id}`}>{opcion.nombre} - ${opcion.precio_adicional}</label>

                            {opcionesSeleccionadas.some(o => o.id === opcion.id) && (
                                <div className='agregar'>
                                    <span onClick={() => handleRestarCantidad(opcion)} className='simbolo-cant'>-</span>
                                    <span>{cantidades[opcion.id] || 1}</span>
                                    <span onClick={() => handleSumarCantidad(opcion)} className='simbolo-cant'>+</span>
                                </div>
                            )}
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

            {!valueInput.controlunidad && (
                <div className='container-pedidos__eleccion unidades'>
                    <p>Unidades</p>
                    <div className='agregar'>
                        <span onClick={handleRestar} className='simbolo-cant'>-</span>
                        <span>{contValue}</span>
                        <span onClick={handleSumar} className='simbolo-cant'>+</span>
                    </div>
                </div>
            )}

            <button className='buton-agregar-pedido' onClick={handleAdd}>
                <span>{contValue}</span> Agregar a mi pedido {price === 0 ? <span>0</span> : <span>${price}</span>}
            </button>
        </div>
    );
};

//--------------------------------------------------------------------------------------------------------------------
