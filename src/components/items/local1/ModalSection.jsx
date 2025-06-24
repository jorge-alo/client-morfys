import React, { useEffect, useState } from 'react'
import { Pedidos } from '../../pedidos/Pedidos';

import { Guarnicion } from '../../pedidos/Guarnicion';
import { AddData } from './AddData';
import { AddBanner } from './AddBanner';
import { Variantes } from '../../pedidos/Variantes';

export const ModalSection = ({ idVaner, bannerValue, updateComida, setUpdateComida, pedidosGuarnicion, setPedidosGuarnicion, comidas, setComidas, login, modal, closeModal, valueInput, pedidos, setPedidos, setCheck, setPrice, price, setContValue, contValue, variante, setVariante}) => {


    useEffect(() => {
    if (!modal) return;

    const handleBackButton = (event) => {
        if (variante) {
            // Si estamos en variantes, solo retrocedemos a pedidos
            event.preventDefault();
            setVariante(false);
            // Reemplazamos el estado para que el siguiente "atrás" cierre el modal
            window.history.replaceState({ modalOpen: true }, '');
        } else {
            // Si estamos en pedidos, cerramos el modal
            closeModal();
            window.history.back(); // Limpiamos el estado extra que pusimos
        }
    };

    window.addEventListener('popstate', handleBackButton);

    // Configuramos el estado inicial
    if (!window.history.state?.modalOpen) {
        window.history.pushState({ modalOpen: true }, '');
    }

    return () => {
        window.removeEventListener('popstate', handleBackButton);
        
        // Limpiamos el estado si el modal se cierra por otro medio (no por el botón atrás)
        if (!modal && window.history.state?.modalOpen) {
            window.history.back();
        }
    };
}, [modal, variante]); // Ahora depende de ambos

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
                    cantidadSeleccionada={variante.cantidad}
                    pedidosGuarnicion={pedidosGuarnicion}
                    setPedidosGuarnicion={setPedidosGuarnicion}
                    onSuccess={() => {
                        closeModal();
                    }} />
            </div>
        </div>
    )
}

