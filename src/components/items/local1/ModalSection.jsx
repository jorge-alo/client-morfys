import React, { useState } from 'react'
import { Pedidos } from '../../pedidos/Pedidos';

import { Guarnicion } from '../../pedidos/Guarnicion';
import { AddData } from './AddData';
import { AddBanner } from './AddBanner';
import { Variantes } from '../../pedidos/Variantes';

export const ModalSection = ({ idVaner, bannerValue, updateComida, setUpdateComida, pedidosGuarnicion, setPedidosGuarnicion, comidas, setComidas, login, modal, closeModal, valueInput, pedidos, setPedidos, setCheck, setPrice, price, setContValue, contValue, variante, setVariante}) => {


     useEffect(() => {
        if (modal) {
            // Cuando se abre el modal, agregamos un nuevo estado al historial
            window.history.pushState({ modalOpen: true }, '');

            const handlePopState = (event) => {
                if (variante) {
                    setVariante(false); // Si está abierta la variante, la cerramos primero
                } else {
                    closeModal(); // Si no hay variante, cerramos el modal
                }
            };

            window.addEventListener('popstate', handlePopState);

            return () => {
                window.removeEventListener('popstate', handlePopState);
                // Volvemos al estado anterior del historial
                if (modal) window.history.back();
            };
        }
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

