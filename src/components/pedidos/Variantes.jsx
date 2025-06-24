import { useState } from "react";
import '../../styles/Guarnicion.css';

export const Variantes = ({
    comidas,
    pedidos,
    setPedidos,
    setVariante,
    valueInput,
    setUpdateComida
}) => {
    const [seleccionadas, setSeleccionadas] = useState([]);
    const [cantidades, setCantidades] = useState({});
    console.log("valor de comidas en variantes", comidas);
    console.log("valor de pedidos en variantes", pedidos);
    const comidaActual = comidas.find(comida => comida.name === valueInput.name);
    const variantes = comidaActual?.variantes || [];
    const tipoControl = comidaActual?.tipoControl || 'promo';

    const getCantidadTotalGlobal = () =>
        Object.values(cantidades).reduce((acc, cant) => acc + cant, 0);

    const getLimiteGlobal = () => {
        if (tipoControl === 'porciones') {
            const pedidoActual = pedidos.find(p => p.name === valueInput.name);
            return pedidoActual?.cont || 0;
        }
        return variantes.reduce((acc, v) => acc + (v.limite ?? 0), 0);
    };

    const handleClickVolver = () => {
        setVariante(false);
    };

    const handleSelect = (opcion) => {
        setSeleccionadas(prev => {
            const yaSeleccionada = prev.find(o => o.id === opcion.id);

            if (yaSeleccionada) {
                setCantidades(prevCant => {
                    const newCant = { ...prevCant };
                    delete newCant[opcion.id];
                    return newCant;
                });
                return prev.filter(o => o.id !== opcion.id);
            } else {
                // Bloquear si al seleccionar superamos el límite
                if (getCantidadTotalGlobal() >= getLimiteGlobal()) return prev;

                setCantidades(prev => ({
                    ...prev,
                    [opcion.id]: 1
                }));
                return [...prev, opcion];
            }
        });
    };

    const handleSumar = (opcionId, variante) => {
        if (getCantidadTotalGlobal() >= getLimiteGlobal()) return;

        const opcion = variante.opciones.find(o => o.id === opcionId);
        if (!seleccionadas.some(s => s.id === opcionId)) {
            handleSelect(opcion);
            return;
        }

        setCantidades(prev => ({
            ...prev,
            [opcionId]: (prev[opcionId] || 1) + 1
        }));
    };

    const handleRestar = (opcionId, variante) => {
        const opcion = variante.opciones.find(o => o.id === opcionId);
        if (!seleccionadas.some(s => s.id === opcionId)) {
            handleSelect(opcion);
            return;
        }

        setCantidades(prev => ({
            ...prev,
            [opcionId]: Math.max((prev[opcionId] || 1) - 1, 1)
        }));
    };

    const handleAdd = () => {
        if (seleccionadas.length === 0) return;

        const variantesSeleccionadas = seleccionadas.map(opcion => {
            const grupoVariante = variantes.find(v => v.opciones.some(op => op.id === opcion.id));
            const cantidad = cantidades[opcion.id] || 1;
            return {
                id: opcion.id,
                nombre: opcion.nombre,
                cantidad,
                precioExtra: Number(opcion.precio_adicional) * cantidad,
                nombreGrupo: grupoVariante?.nombre || "Variante"
            };
        });

        const comidaActualizada = {
            ...valueInput,
            variantes: variantesSeleccionadas
        };

        setUpdateComida(comidaActualizada);

        const yaExiste = pedidos.some(p => p.name === valueInput.name);

        setPedidos(prev =>
            yaExiste
                ? prev.map(p => p.name === valueInput.name ? comidaActualizada : p)
                : [...prev, comidaActualizada]
        );

        setVariante(false);
    };

    const cantidadSeleccionada = getCantidadTotalGlobal();
    const limiteGlobal = getLimiteGlobal();
    const limiteCumplido = cantidadSeleccionada === limiteGlobal;

    return (
        <div className="container-guarnicion">
            <div className='eligeTuGuarnicion'>
                <span onClick={handleClickVolver} className='container-guarnicion__volver'>⬅️</span>
                <h4>Elige tu variante para {valueInput?.name}</h4>
            </div>

            <h3>Opciones disponibles</h3>
            {cantidadSeleccionada >= limiteGlobal && (
                <p style={{ color: "red", fontSize: "0.9rem" }}>Límite alcanzado</p>
            )}
            <div className='container-guarnicion__items'>
                {variantes.map((variante, index) => (
                    <div key={index}>
                        <h4>{variante.nombre}</h4>

                        {variante.opciones.map((opcion, opcIndex) => {
                            const yaSeleccionada = seleccionadas.some(s => s.id === opcion.id);
                            const seAlcanzoLimite = cantidadSeleccionada >= limiteGlobal;

                            return (
                                <div
                                    key={opcIndex}
                                    className={`item-guarnicion ${yaSeleccionada ? 'selected' : ""} ${!yaSeleccionada && seAlcanzoLimite ? 'disabled' : ""}`}
                                    onClick={() => {
                                        if (!yaSeleccionada && seAlcanzoLimite) return;
                                        handleSelect(opcion);
                                    }}
                                >
                                    <div>
                                        <p>{opcion.nombre} {yaSeleccionada && '✔️'}</p>
                                        <h5>+ ${opcion.precio_adicional}</h5>
                                    </div>
                                    <div className='agregar'>
                                        <span
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRestar(opcion.id, variante);
                                            }}
                                            className='simbolo-cant'
                                        >-</span>
                                        <span>{cantidades[opcion.id] || 1}</span>
                                        <span
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSumar(opcion.id, variante);
                                            }}
                                            className='simbolo-cant'
                                            style={{
                                                color: seAlcanzoLimite && !yaSeleccionada ? 'gray' : 'inherit',
                                                pointerEvents: seAlcanzoLimite && !yaSeleccionada ? 'none' : 'auto'
                                            }}
                                        >+</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <button
                className='buton-aceptar-guarnicion'
                onClick={handleAdd}
                disabled={!limiteCumplido}
            >
                {limiteCumplido ? 'Aceptar' : `Debe seleccionar ${limiteGlobal} variante(s)`}
            </button>
        </div>
    );
};