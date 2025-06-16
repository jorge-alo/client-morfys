import { useState } from "react";
import '../../styles/Guarnicion.css'

export const Variantes = ({
    comidas,
    pedidos,
    setPedidos,
    setVariante,
    valueInput,
    setUpdateComida
}) => {
    const [seleccionadas, setSeleccionadas] = useState([]);
    const [cantidades, setCantidades] = useState({}); // Nuevo estado por opción

    const handleClickVolver = () => {
        setVariante(false);
    };

    const comidaActual = comidas.find(comida => comida.name === valueInput.name);
    const variantes = comidaActual?.variantes || [];

    const handleSumar = (opcionId) => {
        setCantidades(prev => ({
            ...prev,
            [opcionId]: (prev[opcionId] || 1) + 1
        }));
    };

    const handleRestar = (opcionId) => {
        setCantidades(prev => ({
            ...prev,
            [opcionId]: Math.max((prev[opcionId] || 1) - 1, 1)
        }));
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
                [opcion.id]: prev[opcion.id] || 1
            }));
            return [...prev, opcion];
        }
    });
};

    const handleAdd = () => {
    if (seleccionadas.length === 0) return;

    setUpdateComida(null);

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

    setPedidos(prev => {
        if (yaExiste) {
            return prev.map(p =>
                p.name === valueInput.name ? comidaActualizada : p
            );
        } else {
            return [...prev, comidaActualizada];
        }
    });

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
                {variantes.map((variante, index) => (
                    <div key={index}>
                        <h4>{variante.nombre}</h4>
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
                                    <span onClick={(e) => { e.stopPropagation(); handleRestar(opcion.id); }} className='simbolo-cant'>-</span>
                                    <span>{cantidades[opcion.id] || 1}</span>
                                    <span onClick={(e) => { e.stopPropagation(); handleSumar(opcion.id); }} className='simbolo-cant'>+</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
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