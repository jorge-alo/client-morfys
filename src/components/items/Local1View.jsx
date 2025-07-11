
import '../../styles/Local1View.css';
import { Link } from 'react-router-dom';

export const Local1View = ({ local }) => {

  console.log("valor del local en local1view:", local);
  return (
    <Link to={`/locales/${local.local}`}>
      <div className="container-item">
        <div className="container-img">
          <img className={!local.logo && "container-img__img"} src={local.logo ? local.logo : "/banner/fondoBaner2.jpg"} />
        </div>
        <div className="container-data">
          <h2>{local.local}</h2>
          {local.domicilio ? <h3>{local.domicilio}</h3> : ""}
        </div>
      </div>
    </Link>

  )
}
