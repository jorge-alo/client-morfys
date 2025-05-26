import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const Admin = ({ children }) => {
  const { admin } = useContext(AuthContext);
  console.log( "valor de admin", admin);
  return admin ? children : <Navigate to='/'></Navigate>;
}
