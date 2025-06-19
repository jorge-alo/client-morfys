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

    const comidaActual = comidas.find(comida => comida.name === valueInput.name);
    const variantes = comidaActual?.variantes || [];

    const getCantidadTotalVariante = (variante) =>
        variante.opciones.reduce((acc, op) => acc + (cantidades[op.id] || 0), 0);

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
                setCantidades(prev => ({
                    ...prev,
                    [opcion.id]: 1
                }));
                return [...prev, opcion];
            }
        });
    };

    const handleSumar = (opcionId, variante) => {
        const totalActual = getCantidadTotalVariante(variante);
        const limite = variante.limite ?? Infinity;

        if (totalActual >= limite) return;

        const opcion = variante.opciones.find(o => o.id === opcionId);
        if (!seleccionadas.some(s => s.id === opcionId)) {
            handleSelect(opcion);
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

    return (
        <div className="container-guarnicion">
            <div className='eligeTuGuarnicion'>
                <span onClick={handleClickVolver} className='container-guarnicion__volver'>⬅️</span>
                <h4>Elige tu variante para {valueInput?.name}</h4>
            </div>

            <h3>Opciones disponibles</h3>
            <div className='container-guarnicion__items'>
                {variantes.map((variante, index) => {
                    const totalActual = getCantidadTotalVariante(variante);
                    const limite = variante.limite ?? Infinity;

                    return (
                        <div key={index}>
                            <h4>{variante.nombre} {Number.isFinite(limite) && `(máx: ${limite})`}</h4>

                            {variante.opciones.map((opcion, opcIndex) => (
                                <div
                                    key={opcIndex}
                                    className={`item-guarnicion ${seleccionadas.some(s => s.id === opcion.id) ? 'selected' : ""}`}
                                    onClick={() => handleSelect(opcion)}
                                >
                                    <div>
                                        <p>{opcion.nombre} {seleccionadas.some(s => s.id === opcion.id) && '✔️'}</p>
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
                                                color: totalActual >= limite ? 'gray' : 'inherit',
                                                pointerEvents: totalActual >= limite ? 'none' : 'auto'
                                            }}
                                        >+</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>

            <button
                className='buton-aceptar-guarnicion'
                onClick={handleAdd}
                disabled={seleccionadas.length === 0}
            >
                Aceptar
            </button>
        </div>
    );
};