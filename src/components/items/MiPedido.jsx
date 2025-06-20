import '../../styles/MiPedido.css';
import useWhatsApp from '../../hook/useWhatsApp';
import { useEffect, useRef, useState } from 'react';
import { PlaceAutocomplete } from '../../utils/PlaceAutocomplete';
import { loadGoogleMapsApi } from '../../utils/LoadGoogleMaps';


export const MiPedido = ({ idVaner, price, check, pedidos, setPedidos, setCheck, cel, setSubtotalValue, checkMobile, setCheckMobile }) => {
    const { enviarPedido } = useWhatsApp();
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [formaEntrega, setFormaEntrega] = useState('retiro'); // 'retiro' o 'envio'
    const [metodoPago, setMetodoPago] = useState('efectivo'); // 'efectivo' o 'transferencia'
    const [ubicacion, setUbicacion] = useState('');


    console.log("valor de pedidos en mipedido", pedidos);
    useEffect(() => {
        if (checkMobile) {
            // Agregamos una entrada al historial cuando se abre el modal
            window.history.pushState({ modalOpen: true }, '', window.location.pathname);

            const handleBackButton = (event) => {
                if (checkMobile) {
                    event.preventDefault();
                    setCheckMobile(false);
                    // Reemplazamos la entrada actual para mantener la URL consistente
                    window.history.replaceState({}, '', window.location.pathname);
                }
            };

            window.addEventListener('popstate', handleBackButton);

            return () => {
                window.removeEventListener('popstate', handleBackButton);
                // Si el modal estaba abierto cuando el componente se desmonta
                if (window.history.state?.modalOpen) {
                    // Simulamos un "back" para limpiar el estado
                    window.history.back();
                }
            };
        }
    }, [checkMobile]);

    console.log("valor de priceBase en mipedido:", price);
    useEffect(() => {
        loadGoogleMapsApi();
    }, []);
    useEffect(() => {
        const subTotal = pedidos.reduce((total, pedido) => {
            return total + Number(pedido.priceTotal);
        }, 0);
        setSubtotalValue(subTotal);
    }, [pedidos])

    const subTotal = pedidos.reduce((total, pedido) => {
        return total + Number(pedido.priceTotal);
    }, 0);

    console.log("valor de subtotal:", subTotal);

    const handleClickDelete = (name) => {

        const newOrder = pedidos.filter(pedido => (pedido.name !== name));
        setPedidos(newOrder);
        if (pedidos.length <= 1) {
            setCheck(false)
            setCheckMobile(false);
        }
    }
    const estaDentroDelHorario = () => {
        const {
            diaManianaEntrada,
            diaManianaSalida,
            diaTardeEntrada,
            diaTardeSalida,
            horarioManianaEntrada,
            horarioManianaSalida,
            horarioTardeEntrada,
            horarioTardeSalida
        } = idVaner;

        const diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
        const ahora = new Date();

        const diaActual = diasSemana[ahora.getDay()];
        const horaActual = ahora.getHours() + ahora.getMinutes() / 60; // convierte minutos en decimal

        const estaEnRangoDeDias = (diaInicio, diaFin) => {

            if (!diaInicio || !diaFin) {
                return true; // Si alguno es null, no estamos en el rango
            }

            const indexInicio = diasSemana.indexOf(diaInicio.toLowerCase());
            const indexFin = diasSemana.indexOf(diaFin.toLowerCase());
            const indexActual = diasSemana.indexOf(diaActual.toLowerCase());

            if (indexInicio <= indexFin) {
                return indexActual >= indexInicio && indexActual <= indexFin;
            } else {
                // Caso especial: rango cruzado, ej: de viernes a lunes
                return indexActual >= indexInicio || indexActual <= indexFin;
            }
        };

        const estaEnHorario = (horaInicioStr, horaFinStr) => {

            if (
                typeof horaInicioStr !== 'string' || horaInicioStr.trim() === '' ||
                typeof horaFinStr !== 'string' || horaFinStr.trim() === ''
            ) {
                return true; // Si no hay horario configurado, permitir el pedido
            }
            
            const [hInicio, mInicio] = horaInicioStr.split(':').map(Number);
            const [hFin, mFin] = horaFinStr.split(':').map(Number);

            const horaInicio = hInicio + mInicio / 60;
            const horaFin = hFin + mFin / 60;
            console.log("valor de horaInicio", horaInicio);
            return horaActual >= horaInicio && horaActual <= horaFin;
        };

        const dentroHorarioManiana = estaEnRangoDeDias(diaManianaEntrada, diaManianaSalida) &&
            estaEnHorario(horarioManianaEntrada, horarioManianaSalida);

        const dentroHorarioTarde = estaEnRangoDeDias(diaTardeEntrada, diaTardeSalida) &&
            estaEnHorario(horarioTardeEntrada, horarioTardeSalida);

        return dentroHorarioManiana || dentroHorarioTarde;
    };
    const handleClickEnviarPedido = () => {
        if (estaDentroDelHorario()) {
            setMostrarFormulario(true); // Mostrar el formulario primero
        } else {
            alert("Lo sentimos, no estamos atendiendo en este horario.");
        }

    }

    const handleConfirmarEnvio = () => {
        enviarPedido(pedidos, cel, formaEntrega, metodoPago, ubicacion);
        setPedidos([]);
        setCheck(false);
        setCheckMobile(false);
        setMostrarFormulario(false);
    }

    const handleClickVolver = () => {
        setCheckMobile(false);
        // Simulamos un "back" para mantener consistencia con el botón físico
        window.history.replaceState({}, '', window.location.pathname);
    }

       const renderPedidoItem = (pedido, index) => (
        <div key={index} className='data-order'>
            <span>{pedido.cont}x</span>
            <div>
                <div>
                    <h4>{pedido.name}</h4>
                    <h6>(${pedido.price})</h6>
                </div>
                {pedido.variantes?.map((variante, idx) => (
                    <div key={`${index}-${idx}`} className='data-order__guarnicion'>
                        <h6>{variante.cantidad}</h6>
                        <h6>{variante.nombre}</h6>
                        <h6>(${variante.precioExtra || 0})</h6>
                    </div>
                ))}
            </div>
            <h4>${pedido.priceTotal}</h4>
            <span onClick={() => handleClickDelete(pedido.name)} className='eliminar'>❌</span>
        </div>
    );

    const renderPedidos = () => (
        <div className='carrito__container-data-order'>
            {pedidos.map((pedido, index) => renderPedidoItem(pedido, index))}
        </div>
    );

    const renderMobilePedidos = () => (
        <div className='carrito__container-data-order'>
            <h4>Estas llevando:</h4>
            <div className='container-data-order'>
                {pedidos.map((pedido, index) => renderPedidoItem(pedido, index))}
            </div>
        </div>
    );
    return (
        <>
            {!check ? <div className='carrito'>
                <h4>Mi pedido</h4>
                <div className='carrito__container'>
                    <div className='carrito__container-img'>
                        <img src="/images/lupa.jpg" />
                        <p>Tu pedido esta vacío</p>
                    </div>
                </div>
            </div> :
                <div className='carrito'>
                    <h4>Mi pedido</h4>
                    <div className='carrito__container'>
                        {renderPedidos()}
                        <div className='container-enviar'>
                            <div className='subtotal'>
                                <h4>Subtotal</h4>
                                <h4>${subTotal}</h4>
                            </div>
                        </div>
                        <button
                            onClick={handleClickEnviarPedido}
                            disabled={subTotal < idVaner.envioMinimo}
                            className={subTotal < idVaner.envioMinimo ? 'boton-disabled' : ''}
                        >
                            {subTotal < idVaner.envioMinimo
                                ? `Te faltan $${idVaner.envioMinimo - subTotal} para hacer el pedido`
                                : 'Enviar pedido'}
                        </button>
                    </div>
                </div>}

            {checkMobile && (
                <div className='mobile'>
                    <div className='mobile-header'>
                        <span onClick={handleClickVolver}>⬅️</span>
                        <h4>Mi pedido</h4>
                    </div>
                    <div className='carrito__container'>
                        {renderMobilePedidos()}
                        <div className='container-enviar'>
                            <div className='subtotal'>
                                <h4>Subtotal</h4>
                                <h4>${subTotal}</h4>
                            </div>
                        </div>
                        <button
                            onClick={handleClickEnviarPedido}
                            disabled={subTotal < idVaner.envioMinimo}
                            className={subTotal < idVaner.envioMinimo ? 'boton-disabled' : ''}
                        >
                            {subTotal < idVaner.envioMinimo
                                ? `Te faltan $${idVaner.envioMinimo - subTotal} para hacer el pedido`
                                : 'Enviar pedido'}
                        </button>
                    </div>
                </div>
            )}

            {mostrarFormulario && (
                <div className="modal-overlay">
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="container-confirmarPedido">

                            <h4>Confirma tu pedido</h4>
                            <div>
                                <label htmlFor='recibir'>¿Cómo desea recibir el pedido?</label>
                                <select value={formaEntrega} id='recibir' onChange={(e) => setFormaEntrega(e.target.value)}>
                                    <option value="retiro">Voy al local</option>
                                    <option value="envio">Envíenmelo</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor='pagar'>¿Cómo desea pagar? </label>
                                <select value={metodoPago} id='pagar' onChange={(e) => setMetodoPago(e.target.value)}>
                                    <option value="efectivo">Efectivo</option>
                                    <option value="transferencia">Transferencia</option>
                                </select>
                            </div>

                            {formaEntrega === 'envio' && (
                                <div style={{ marginTop: '10px' }}>
                                    <label>Dirección:</label>
                                    <PlaceAutocomplete onPlaceSelected={setUbicacion} />
                                </div>
                            )}


                            <button className='container-confirmarPedido__confirmar' onClick={handleConfirmarEnvio}>Confirmar y enviar pedido</button>
                            <button className='container-confirmarPedido__cancelar' onClick={() => setMostrarFormulario(false)}>Cancelar</button>

                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
