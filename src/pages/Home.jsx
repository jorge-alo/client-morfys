
import { Local1View } from "../components/items/Local1View";
import '../styles/Home.css';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MapView } from "../components/map/MapView";
import { DataContext } from "../context/DatoContext";


export const Home = () => {
  const [localsFilter, setLocalsFilter] = useState([]);
  const [valorBuscar, setValorBuscar] = useState("");
  const [allLocals, setAllLocals] = useState([]);
  const [validar, setValidar] = useState(false);
  const { handleLoadPage } = useContext(DataContext);
  const { setAdmin, setLogin, setLocal } = useContext(AuthContext);
  const navigate = useNavigate();

  const forLoadPage = async () => {
    let arrayLocals = await handleLoadPage();
    console.log("valor de arrayLocals:", arrayLocals);
    if (arrayLocals.auth) {
      setAdmin(arrayLocals.auth);
      return navigate("/register");
    }
    if (!arrayLocals.login) {
      setLogin(arrayLocals.login);
    }


    console.log(arrayLocals.locales);


    const localesValidos = arrayLocals.locales.filter(local => local.local !== "");
    setAllLocals(localesValidos);       // guardamos todos
    setLocalsFilter(localesValidos);    // mostramos todos por defecto
  }
  useEffect(() => {

    forLoadPage();

  }, [])

  const handleChangeBuscar = (e) => {
    setValorBuscar(e.target.value);

  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const filtro = allLocals.filter(local =>
      local.local.toLowerCase().includes(valorBuscar.toLowerCase())
    );
    setLocalsFilter(filtro);
    setValorBuscar("");
    setValidar(true);
  };

  const handleClickVolver = () => {
    forLoadPage();
    setValidar(false);
  }

  return (
    <div className="container-home" >
      <div className="container-home__container-form">
        {validar && <span onClick={handleClickVolver}>⬅️</span> }
        <form className="container-home__form" onSubmit={handleSubmitForm}>
          <input
            type="text"
            name="buscar"
            placeholder="Buscar..."
            value={valorBuscar}
            onChange={handleChangeBuscar}
          />
          <button>Buscar</button>
        </form>
      </div>

      <div className="container-home__items">
        <MapView localsFilter={localsFilter} />
        <div className="container-home__local1view">
          {localsFilter.map((local, index) => {
            return < Local1View key={index} local={local} />
          })}
        </div>

      </div>
    </div>
  )
}
