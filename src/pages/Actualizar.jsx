import { useContext, useEffect } from "react";
import { useForm } from "../context/FormProvider";
import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DatoContext";


export const Actualizar = () => {
    const { handleLoginRegisterUpdate, error, setError } = useContext(DataContext);
    const { handleLogOut } = useContext(AuthContext)
    const { valueInput, inputRef, file, resetForm, handleChange } = useForm();

    useEffect(() => {
        setError(null);
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('name', valueInput.user_name);
        formData.append('email', valueInput.email);
        formData.append('local', valueInput.local);
        formData.append('lat', valueInput.latitud);
        formData.append('lng', valueInput.longitud);
        formData.append('cel', valueInput.cel);
        formData.append('direccion', valueInput.direccion);
        formData.append('password', valueInput.password);
        console.log("formData:", formData);
        const result = await handleLoginRegisterUpdate(formData);
        resetForm();
        
    }
    return (
        <div className="container-addData">
            <div className="container-register" >
                <form className="container-form" onSubmit={handleSubmit}>
                    <h2>Actualizar Datos</h2>

                    <input

                        type="text"
                        name="user_name"
                        placeholder='Ingrese nombre de usuario'
                        value={valueInput.user_name}
                        onChange={handleChange}
                    />
                    <input

                        type="email"
                        name="email"
                        placeholder='Ingrese email'
                        value={valueInput.email}
                        onChange={handleChange}
                    />
                    <input

                        type="text"
                        name="cel"
                        placeholder='Ingrese numero de celular'
                        value={valueInput.cel}
                        onChange={handleChange}
                    />
                     <input
                        type="text"
                        name="direccion"
                        placeholder='Ingrese direccion'
                        value={valueInput.direccion}
                        onChange={handleChange}
                    />
                    <input

                        type="password"
                        name="password"
                        placeholder='Ingrese password'
                        value={valueInput.password}
                        onChange={handleChange}
                    />
                    <input

                        type="text"
                        name="local"
                        placeholder='Ingrese nombre del local'
                        value={valueInput.local}
                        onChange={handleChange}
                    />
                    <input

                        type="text"
                        name="latitud"
                        placeholder='Ingrese latitud'
                        value={valueInput.latitud}
                        onChange={handleChange}
                    />
                    <input

                        type="text"
                        name="longitud"
                        placeholder='Ingrese longitud'
                        value={valueInput.longitud}
                        onChange={handleChange}
                    />
                    <input
                        ref={inputRef}
                        type="file"
                        name="file"
                        onChange={handleChange}
                    />
                    <button>Enviar</button>
                    {error && <p className='error'>{error}</p>}
                </form>
                <button onClick={handleLogOut} className="cerrar">Cerrar</button>
            </div>

        </div>
    )
}

