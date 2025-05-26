import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { newPasswordApi, updateForgotApi, updateLoginApi, verifyTokenApi } from '../api/request.api';
import { AuthContext } from './AuthContext';
import { useForm } from './FormProvider';



export const AuthProvider = ({ children }) => {
    const { resetForm } = useForm()
    const [login, setLogin] = useState(false);
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null)
    const [admin, setAdmin] = useState(0);
    const [local, setLocal] = useState(null);
    const [showForgotPassword, setShowForgotPassword] = useState(false); // Nuevo estado
    const [emailForReset, setEmailForReset] = useState(""); // Email para recuperación
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const checkAuth = async () => {
        try {
            const response = await verifyTokenApi();
            console.log("Respuesta de verificación:", response.data);
            if(response.data.auth){
                return null
            }
            if (response.data.login) {
                setLogin(true);
                setUserId(response.data.userId);
                setLocal(response.data.local);
                if(response.data.local){
                    navigate(`/locales/${response.data.local}`);
                }
                
            }
        } catch (err) {
            console.log("Usuario no autenticado.");
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);


    const handleLoginSubmit = async (credentials) => {      
        setError(false);
        console.log(credentials);
        try {
            const response = await updateLoginApi(credentials);
            console.log("response:", response);
            if (!response.data.status) {
                return setError(response.data.message);
            }

            if (response.data.auth) {
                setAdmin(response.data.auth);
                resetForm();
                return navigate('/register');
            } else {
                setLogin(response.data.login);
                return navigate(`/locales/${response.data.local}`)
            }


        } catch (error) {
            console.error("Error:", error);
            setError(error.response?.data?.message);
        }
    }

       const handleForgotPassword = async (e) => {
       
        try {
            const response = await updateForgotApi(emailForReset);
             console.log("valor de response en auth", response);
        return response; // Devuelve la respuesta completa
        } catch (error) {
            setError(error.response?.data?.message || "Error al solicitar recuperación");
            throw error; // Propaga el error para manejarlo en el componente
        }
    };
const handleResetPassword = async (token, newPassword) => {
    try {
         const response = newPasswordApi(token, newPassword);
    setSuccess("Contraseña actualizada correctamente");
    } catch (error) {
        setError(error.response?.data?.message || "Error al actualizar la contraseña");
         throw error;
    }
   
}
    const handleLogOut = (e) => {
        e.preventDefault();
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setAdmin(0);
        setLogin(false);
        navigate("/");
    }

    return (
        <AuthContext.Provider value={{handleResetPassword, success, setSuccess, showForgotPassword, setShowForgotPassword, emailForReset, setEmailForReset, handleForgotPassword, setAdmin, local, setLocal, error, setError, admin, handleLoginSubmit, handleLogOut, login, setLogin, userId, checkAuth}}>
            {children}
        </AuthContext.Provider>
    )
}


