import { useContext, useEffect, useState } from 'react'
import '../styles/Local1.css'
import { useParams } from 'react-router-dom'
import { useForm } from '../context/FormProvider'
import { AuthContext } from '../context/AuthContext'
import { MiPedido } from '../components/items/MiPedido'
import { SectionBaner } from '../components/items/local1/SectionBaner.jsx'
import { CardSection } from '../components/items/local1/CardSection.jsx'
import { ModalSection } from '../components/items/local1/ModalSection.jsx'
import { CategorySection } from '../components/items/local1/CategorySection.jsx'
import { DataContext } from '../context/DatoContext.jsx'

export const Local1 = () => {
  const { setValueInput, valueInput } = useForm();
  const { login, setLogin } = useContext(AuthContext);
  const { handleGetData } = useContext(DataContext);
  const { name } = useParams();

  const [comidas, setComidas] = useState([])
  const [vaner, setVaner] = useState([])
  const [modal, setModal] = useState(false)
  const [check, setCheck] = useState(false);
  const [contValue, setContValue] = useState(1)
  const [price, setPrice] = useState(valueInput.price)
  const [pedidosGuarnicion, setPedidosGuarnicion] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [subtotalValue, setSubtotalValue] = useState(0);
  const [checkMobile, setCheckMobile] = useState(false)
  const [cel, setCel] = useState(null);
  const [variante, setVariante] = useState({ open: false, cantidad: 0 });
  const [updateComida, setUpdateComida] = useState("");
  const [bannerValue, setBannerValue] = useState(false);
  const [idVaner, setIdVaner] = useState("");
  
  const forGetPage = async () => {
    try {
      const arrayLocals = await handleGetData(name);
      if (arrayLocals && arrayLocals.data) {
        console.log("valor del arraylocals en local1:", arrayLocals);
        setComidas(arrayLocals.data.comidas);
        setIdVaner(arrayLocals.data.idVaner[0]);
        setCel(arrayLocals.data.idVaner[0].cel);
        setLogin(arrayLocals.login);
        if (arrayLocals.data.idVaner?.[0]?.img_vaner) {
          setVaner(arrayLocals.data.idVaner[0].img_vaner);
        }
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  }

  useEffect(() => {
    forGetPage();
  }, [name])

  const handleClickCard = ({ id, user_id, name, description, price, categoria, image, variantes, tipoControl }) => {
    const newValueInput = { ...valueInput, comida_id: id, user_id, name, description, price, categoria, tipoControl, image, variantes: variantes || [] }
    setValueInput(newValueInput);
    setModal(true);
    const precioBase = Number(newValueInput.price);
    setPrice(precioBase);
    console.log("valor de valueinput en handleClickCard:", valueInput);
  };

  const handleClickBaner = () => {
    setModal(true);
    setBannerValue(true);
  }

  const closeModal = () => {
    const newValueInput = { ...valueInput, comida_id: "", user_id: "", name: "", description: "", price: "", categoria: "", image: "", variantes: [] }
    setValueInput(newValueInput);
    setUpdateComida("");
    setModal(false);
    setVariante({ open: false, cantidad: 0 });
    setBannerValue(false);
  }

  const handleClickSubtotalPedido = () => {
    setCheckMobile(true);
  }


  return (
    <div className="container-local">
      <SectionBaner bannerValue={bannerValue} idVaner={idVaner} vaner={vaner} name={name} login={login} handleClickBaner={handleClickBaner} />
      <section className='container-local__flex' >
        <CategorySection comidas={comidas} />
        <CardSection idVaner={idVaner} comidas={comidas} handleClickCard={handleClickCard} />
        <MiPedido idVaner={idVaner} price={price} check={check} checkMobile={checkMobile} setCheckMobile={setCheckMobile} pedidosGuarnicion={pedidosGuarnicion} setPedidosGuarnicion={setPedidosGuarnicion} pedidos={pedidos} setPedidos={setPedidos} setSubtotalValue={setSubtotalValue} setCheck={setCheck} cel={cel} />
        <div className={check ? `container-boton-enviar` : "container-boton-enviar-none"}>
          {check ? <button onClick={handleClickSubtotalPedido}> Ver mi pedido {subtotalValue} </button> : ""}
        </div>
      </section>
      <ModalSection idVaner={idVaner} bannerValue={bannerValue} setUpdateComida={setUpdateComida} updateComida={updateComida} pedidosGuarnicion={pedidosGuarnicion} setPedidosGuarnicion={setPedidosGuarnicion} setComidas={setComidas} comidas={comidas} login={login} modal={modal} closeModal={closeModal} valueInput={valueInput} pedidos={pedidos} setPedidos={setPedidos} setCheck={setCheck} setPrice={setPrice} price={price} setContValue={setContValue} contValue={contValue} variante={variante} setVariante={setVariante} onSuccess />
    </div>
  )
}
