import React, { useState } from 'react'
import { Pedidos } from '../../pedidos/Pedidos';

import { Guarnicion } from '../../pedidos/Guarnicion';
import { AddData } from './AddData';
import { AddBanner } from './AddBanner';

export const ModalSection = ({ idVaner, bannerValue, updateComida, setUpdateComida, pedidosGuarnicion, setPedidosGuarnicion, comidas, setComidas, login, modal, closeModal, valueInput, pedidos, setPedidos, setCheck, setPrice, price, setContValue, contValue, guarnicion, setGuarnicion }) => {

    if (!modal) return null;
    const addbanerORAddData = bannerValue ? AddBanner : AddData
    const ContentComponent = login ? addbanerORAddData : guarnicion ? Guarnicion : Pedidos

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
                    guarnicion={guarnicion}
                    setGuarnicion={setGuarnicion}
                    pedidosGuarnicion={pedidosGuarnicion}
                    setPedidosGuarnicion={setPedidosGuarnicion}
                    onSuccess={() => {
                        closeModal();
                    }} />
            </div>
        </div>
    )
}

