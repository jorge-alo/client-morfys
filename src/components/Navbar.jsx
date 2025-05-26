import { Link } from "react-router-dom";
import '../styles/navbar.css';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const{login, handleLogOut} = useContext(AuthContext);
  console.log("valor de login en navbar:", login);
  return (
    <div className="container-navbar">
        <nav className="nav">
            <Link to='/'>Morfis</Link>
            {login && <Link to='/form'>Cargar datos</Link>}
            {login && <Link to='/ajustes'>Ajustes</Link>}
            {!login && <Link to='/login'>Login</Link>}
            
            {login && <button className="cerrar" onClick={handleLogOut}>Logout</button> }
        </nav>
    </div>
  )
}
