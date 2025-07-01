import '../../styles/Pedidos.css';
import { useEffect, useState } from 'react';

export const Pedidos = ({ onSuccess, valueInput, setPrice, price, setContValue, contValue, setCheck, setPedidos, updateComida, setVariante }) => {

    const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
    const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState([]);
    const [cantidades, setCantidades] = useState({});
    useEffect(() => {
        setContValue(1);
        setOpcionSeleccionada(null);

        // Inicializar cantidades de cada opción en 1
        if (valueInput.variantes?.[0]?.opciones) {
            const nuevasCantidades = {};
            valueInput.variantes[0].opciones.forEach(opcion => {
                nuevasCantidades[opcion.id] = 1;
            });
            setCantidades(nuevasCantidades);
        }
    }, [valueInput.name]);
    useEffect(() => {
        if (valueInput.tamanio === 1 && opcionSeleccionada) {
            calcularPrecio(contValue, [opcionSeleccionada]);
        } else {
            calcularPrecio(updateComida?.cont || contValue, updateComida?.variantes || []);
        }
    }, [contValue, updateComida, opcionSeleccionada, valueInput.tamanio]);

    useEffect(() => {
        setContValue(1);
        setOpcionSeleccionada(null);
    }, [valueInput.name]);

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

    const recalcularPrecio = (opciones) => {
        const total = opciones.reduce((acc, opcion) => acc + (opcion.precioExtra * opcion.cantidad), 0);
        setPrice(total);
    };

    const handleToggleSeleccion = (opcion) => {
        const existe = opcionesSeleccionadas.some(op => op.id === opcion.id);

        if (existe) {
            const nuevasOpciones = opcionesSeleccionadas.filter(op => op.id !== opcion.id);
            setOpcionesSeleccionadas(nuevasOpciones);
            recalcularPrecio(nuevasOpciones);
        } else {
            const nuevaOpcion = {
                id: opcion.id,
                nombre: opcion.nombre,
                precioExtra: Number(opcion.precio_adicional),
                cantidad: cantidades[opcion.id],
                nombreGrupo: opcion.nombre
            };
            const nuevasOpciones = [...opcionesSeleccionadas, nuevaOpcion];
            setOpcionesSeleccionadas(nuevasOpciones);
            recalcularPrecio(nuevasOpciones);
        }
    };

    const handleSumarCantidad = (opcion) => {
        setCantidades(prev => {
            const nuevasCantidades = { ...prev, [opcion.id]: prev[opcion.id] + 1 };

            if (opcionesSeleccionadas.some(op => op.id === opcion.id)) {
                const nuevasOpciones = opcionesSeleccionadas.map(op =>
                    op.id === opcion.id ? { ...op, cantidad: nuevasCantidades[opcion.id] } : op
                );
                setOpcionesSeleccionadas(nuevasOpciones);
                recalcularPrecio(nuevasOpciones);
            }

            return nuevasCantidades;
        });
    };

    const handleRestarCantidad = (opcion) => {
        setCantidades(prev => {
            if (prev[opcion.id] > 1) {
                const nuevasCantidades = { ...prev, [opcion.id]: prev[opcion.id] - 1 };

                if (opcionesSeleccionadas.some(op => op.id === opcion.id)) {
                    const nuevasOpciones = opcionesSeleccionadas.map(op =>
                        op.id === opcion.id ? { ...op, cantidad: nuevasCantidades[opcion.id] } : op
                    );
                    setOpcionesSeleccionadas(nuevasOpciones);
                    recalcularPrecio(nuevasOpciones);
                }

                return nuevasCantidades;
            }
            return prev;
        });
    };
    const handleAdd = () => {
        setCheck(true);

        let variantesFinal = [];
        let cantidadFinal = 1; // Por defecto

        if (valueInput.tamanio === 1 && opcionesSeleccionadas.length > 0) {
            variantesFinal = opcionesSeleccionadas;
            cantidadFinal = opcionesSeleccionadas.reduce((acc, opcion) => acc + opcion.cantidad, 0);
        } else if (valueInput.tamanio === 1 && opcionSeleccionada) {
            variantesFinal = [opcionSeleccionada];
            cantidadFinal = contValue;
        } else {
            variantesFinal = updateComida?.variantes || [];
            cantidadFinal = updateComida?.cont || contValue;
        }

        // ✅ Generamos el ID único para este pedido
        const idPedidoActual = `${valueInput.name}-${variantesFinal.map(op => `${op.nombre}-${op.cantidad}`).join('-')}`;

        setPedidos((prevPedidos) => {
            const pedidoExistenteIndex = prevPedidos.findIndex(
                (pedido) => pedido.id === idPedidoActual
            );

            if (pedidoExistenteIndex >= 0) {
                // Si ya existe, actualizo la cantidad y el precio total
                return prevPedidos.map((pedido, index) =>
                    index === pedidoExistenteIndex
                        ? {
                            ...pedido,
                            cont: cantidadFinal,
                            price: valueInput.price,
                            priceTotal: price,
                            category: valueInput.categoria,
                            variantes: variantesFinal
                        }
                        : pedido
                );
            } else {
                // Si no existe, lo agrego como nuevo
                return [
                    ...prevPedidos,
                    {
                        id: idPedidoActual,
                        cont: cantidadFinal,
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
            id: opcion.id, // Agregamos el id
            nombre: opcion.nombre,
            precioExtra: Number(opcion.precio_adicional),
            cantidad: cantidades[opcion.id],
            nombreGrupo: opcion.nombre
        };

        setOpcionSeleccionada(nuevaVariante);
        setContValue(cantidades[opcion.id]);
        calcularPrecio(cantidades[opcion.id], [nuevaVariante]);
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
                            <div className='datosenimagen'>
                                {valueInput.price == 0 ? "" : <h4>{updateComida?.cont || contValue}x</h4>}
                                <h3>{valueInput.name}</h3>
                            </div>
                            {price == 0 ? "" : (valueInput.tamanio ? <p>${price}</p> : (valueInput.price == 0 ? "" : <p>${valueInput.price}</p>))}
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
                                type="checkbox"
                                name="tamanio"
                                value={opcion.nombre}
                                id={`opcion-${opcion.id}`}
                                checked={opcionesSeleccionadas.some(op => op.id === opcion.id)}
                                onChange={() => handleToggleSeleccion(opcion)}
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

            {valueInput.variantes?.length > 0 && valueInput.tamanio !== 1 && (
                <div className='container-pedidos__eleccion unidades'>
                    <p>{valueInput?.variantes[0].nombre}</p>
                    <div className='seleccionar'><span onClick={handleClickSeleccionar}>Seleccionar</span></div>
                </div>
            )}

            {
                valueInput.controlunidad ? ""
                    :
                    <div className='container-pedidos__eleccion unidades'>
                        <p>Unidades</p>
                        <div className='agregar'>
                            <span onClick={handleRestar} className='simbolo-cant'>-</span>
                            <span>{contValue}</span>
                            <span onClick={handleSumar} className='simbolo-cant'>+</span>
                        </div>
                    </div>
            }


            <button className='buton-agregar-pedido' onClick={handleAdd}>
                <span>{contValue}</span> Agregar a mi pedido {price == 0 ? <span>0</span> : <span>${price}</span>}
            </button>
        </div>
    );
};