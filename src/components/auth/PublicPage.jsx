import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


export const PublicPage = ( {children} ) => {
  
    const { login, local, checkAuth} = useContext(AuthContext);
    checkAuth();
    console.log( "este es el valor de login:", login);
    console.log( "este es el valor de local:", local);
  return !login ? children : <Navigate to={`/locales/${local}`}/>
}
