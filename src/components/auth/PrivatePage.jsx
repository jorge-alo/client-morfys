
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


export const PrivatePage = ( {children} ) => {
    const { login} = useContext(AuthContext); 
    console.log("valor de login en privatePage:", login);
  return login ? children : <Navigate to='/'></Navigate>
}
