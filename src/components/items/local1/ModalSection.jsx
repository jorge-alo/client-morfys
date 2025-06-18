import React, { useEffect, useState } from 'react'
import { Pedidos } from '../../pedidos/Pedidos';

import { Guarnicion } from '../../pedidos/Guarnicion';
import { AddData } from './AddData';
import { AddBanner } from './AddBanner';
import { Variantes } from '../../pedidos/Variantes';

export const ModalSection = ({ idVaner, bannerValue, updateComida, setUpdateComida, pedidosGuarnicion, setPedidosGuarnicion, comidas, setComidas, login, modal, closeModal, valueInput, pedidos, setPedidos, setCheck, setPrice, price, setContValue, contValue, variante, setVariante}) => {


    useEffect(() => {
    if (!modal) return;

    // Agregamos una entrada clara al historial
    window.history.pushState({ modalOpen: true }, '', window.location.pathname);

    const handleBackButton = (event) => {
        event.preventDefault(); // Evita que el navegador navegue atrás

        if (variante) {
            setVariante(false); // Solo cierra la variante si está activa
        } else {
            closeModal(); // Si no, cierra el modal
            window.history.replaceState({}, '', window.location.pathname); // Limpieza de URL
        }
    };

    window.addEventListener('popstate', handleBackButton);

    // Bloquear recarga de página con el modal abierto (opcional pero recomendado)
    window.onbeforeunload = (e) => {
        e.preventDefault();
        e.returnValue = '';
    };

    return () => {
        window.removeEventListener('popstate', handleBackButton);
        window.onbeforeunload = null;

        if (window.history.state?.modalOpen) {
            window.history.back(); // Volvemos atrás solo si es necesario
        }
    };
}, [modal, variante]);

    if (!modal) return null;
    const addbanerORAddData = bannerValue ? AddBanner : AddData
    const ContentComponent = login ? addbanerORAddData : variante ? Variantes : Pedidos

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={closeModal}>X</button>
                <ContentComponent
                    idVaner={idVaner}
                    bannerValue={bannerValue}
                    updateComida={updateComida}
                    setUpdateComida={setUpdateComida}
                    comidas={comidas}
                    setComidas={setComidas}
                    valueInput={valueInput}
                    pedidos={pedidos}
                    setPedidos={setPedidos}
                    setCheck={setCheck}
                    setPrice={setPrice}
                    price={price}
                    setContValue={setContValue}
                    contValue={contValue}
                    variante={variante}
                    setVariante={setVariante}
                    pedidosGuarnicion={pedidosGuarnicion}
                    setPedidosGuarnicion={setPedidosGuarnicion}
                    onSuccess={() => {
                        closeModal();
                    }} />
            </div>
        </div>
    )
}

