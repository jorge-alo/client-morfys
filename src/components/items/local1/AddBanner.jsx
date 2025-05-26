import { useContext } from "react";
import { DataContext } from "../../../context/DatoContext";
import { useForm } from "../../../context/FormProvider";

export const AddBanner = ({idVaner,comidas, onSuccess}) => {
    const { handleUpdateBanner, error, setError } = useContext(DataContext);
    const { handleChange,inputRef, file } = useForm();
    console.log("valor de idVaner en addBanner",idVaner);
     const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file);
        formData.append('user_id', idVaner.id);
        try {
            await handleUpdateBanner(formData); // handleUpdate ya está en el contexto
            if (onSuccess) onSuccess(); // Notifica el éxito y Cierra el modal primero
            setError(false);
        } catch (error) {
            console.error("Error al enviar:", error);
        }
    };
  return (
    <div>
        
         <form className="container-form modal-form" onSubmit={handleSubmit}>
                <h2>Actualice la imagen</h2>
                <input
                    ref={inputRef}
                    type="file"
                    name="file"
                    onChange={handleChange}
                />
                <button>Enviar</button>
                {error && <p className='error'>{error}</p>}
            </form> 
           
       
    </div>
  )
}
