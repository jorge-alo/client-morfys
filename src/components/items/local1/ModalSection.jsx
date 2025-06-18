import React, { useEffect, useState } from 'react'
import { Pedidos } from '../../pedidos/Pedidos';

import { Guarnicion } from '../../pedidos/Guarnicion';
import { AddData } from './AddData';
import { AddBanner } from './AddBanner';
import { Variantes } from '../../pedidos/Variantes';

export const ModalSection = ({ idVaner, bannerValue, updateComida, setUpdateComida, pedidosGuarnicion, setPedidosGuarnicion, comidas, setComidas, login, modal, closeModal, valueInput, pedidos, setPedidos, setCheck, setPrice, price, setContValue, contValue, variante, setVariante}) => {


     useEffect(() => {
    if (!modal) return;

    window.history.pushState({ modalOpen: true }, '');

    const handlePopState = () => {
        if (variante) {
            setVariante(false);
        } else {
            closeModal();
        }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
        window.removeEventListener('popstate', handlePopState);
        window.history.back();
    };
}, [modal]);

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

