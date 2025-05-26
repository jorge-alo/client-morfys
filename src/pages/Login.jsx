import { useContext, useEffect, useState } from "react";
import { useForm } from "../context/FormProvider";
import { AuthContext } from "../context/AuthContext";



export const Login = () => {
    const { handleLoginSubmit, handleForgotPassword, error, setError, showForgotPassword, setShowForgotPassword, emailForReset, setEmailForReset } = useContext(AuthContext);
    const { handleChange, valueInput, resetForm } = useForm()

    useEffect(() => {
        setError(null);
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await handleLoginSubmit(valueInput);
        console.log("resultado de handleSubmit:", result);
        resetForm();
    }

   const handleSubmitForgotPassword = async (e) => {
    e.preventDefault();
    try {
        const response = await handleForgotPassword(); // Añade await aquí
        console.log("valor de response en login", response);
        alert(response.data.message);
        setShowForgotPassword(false);
    } catch (error) {
        // El error ya fue manejado en handleForgotPassword
        console.error("Error en handleSubmitForgotPassword:", error);
    }
};

    return (
          <div className="container-addData">
            <form className="container-form" onSubmit={showForgotPassword ? handleSubmitForgotPassword : handleSubmit}>
                <h2>{showForgotPassword ? "Recuperar Contraseña" : "Login"}</h2>

                {showForgotPassword ? (
                    <>
                        <input
                            type="email"
                            name="email"
                            placeholder="Ingrese su email registrado"
                            value={emailForReset}
                            onChange={(e) => setEmailForReset(e.target.value)}
                            required
                        />
                        <button type="submit">Enviar enlace</button>
                        <button 
                            type="button" 
                            onClick={() => setShowForgotPassword(false)}
                            className="secondary-btn"
                        >
                            Volver a Login
                        </button>
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            name="name"
                            placeholder="Ingrese nombre"
                            value={valueInput.name}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Ingrese email"
                            value={valueInput.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Ingrese password"
                            value={valueInput.password}
                            onChange={handleChange}
                        />
                        <button type="submit">Enviar</button>
                        <p 
                            className="forgot-password-link"
                            onClick={() => setShowForgotPassword(true)}
                        >
                            ¿Olvidaste tu contraseña?
                        </p>
                    </>
                )}
                {error && <p className='error'>{error}</p>}
            </form>
        </div>
    )
}
