import React, { useEffect, useState } from 'react'
import { Pedidos } from '../../pedidos/Pedidos';

import { Guarnicion } from '../../pedidos/Guarnicion';
import { AddData } from './AddData';
import { AddBanner } from './AddBanner';
import { Variantes } from '../../pedidos/Variantes';

export const ModalSection = ({ idVaner, bannerValue, updateComida, setUpdateComida, pedidosGuarnicion, setPedidosGuarnicion, comidas, setComidas, login, modal, closeModal, valueInput, pedidos, setPedidos, setCheck, setPrice, price, setContValue, contValue, variante, setVariante}) => {


    useEffect(() => {
    if (!modal) return;

    // Solo agregamos un estado si no existe uno previo
    if (!window.history.state?.modalOpen) {
        window.history.pushState({ modalOpen: true }, '', window.location.pathname);
    }

   const handleBackButton = (event) => {
    event.preventDefault();

    if (variante && window.history.state?.varianteOpen) {
        setVariante(false);
        window.history.replaceState({ modalOpen: true }, '', window.location.pathname);
    } else {
        closeModal();
        window.history.replaceState({}, '', window.location.pathname);
    }
};

    window.addEventListener('popstate', handleBackButton);

    // Previene recarga de página con modal abierto
    window.onbeforeunload = (e) => {
        e.preventDefault();
        e.returnValue = '';
    };

    return () => {
        window.removeEventListener('popstate', handleBackButton);
        window.onbeforeunload = null;

        // ⚠️ Evitar hacer `history.back()` acá. Deja que el usuario use el botón atrás naturalmente.
        // Esto evita el "rebote" entre variantes y pedidos
    };
}, [modal]); // 👈 Solo depende de modal, no de `variante`

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

