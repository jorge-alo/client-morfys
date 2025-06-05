import { useState } from "react"
import { cargarDatosApi, cargarHorariosApi, destroyApi, getDataApi, loadApiCategory, loadPage, updateBannerApi, updateDataApi, updateRegisterActualizarApi, updateRegisterApi } from "../api/request.api";
import { DataContext } from "./DatoContext";

export const DataProvider = ( {children}) => {
  const [error, setError] = useState(null);


  const handleUpdate = async (formData) => {
    try {
      const response = await updateDataApi(formData);
      return response;
     
    } catch (error) {
      console.error("Error:", error);
      setError(error.response.data.message);
    }
  }

  const handleUpdateBanner = async (formData) => {
    try {
      const response = await updateBannerApi(formData);
      return response;
     
    } catch (error) {
      console.error("Error:", error);
      setError(error.response.data.message);
    }
  }
 const handleCargarDatos = async (formData) => {
  try {
    const response = await cargarDatosApi(formData);
    setError(false);
    return response
    
  } catch (error) {
    console.error("Error:", error);
      setError(error.response?.data?.message);
  }
}

const handleCargarHorario = async (formData) => {
   try {
    const response = await cargarHorariosApi(formData);
    return response
  } catch (error) {
    console.error("Error:", error);
      setError(error.response?.data?.message);
  }
}


 
  const handleLoginRegister = async (formData) => {
    try {
      const response = await updateRegisterApi(formData);
      return response
    } catch (error) {
      console.error("Error:", error);
      setError(error.response?.data?.message);
    }
  }

   const handleLoginRegisterUpdate = async (formData) => {
    try {
      const response = await updateRegisterActualizarApi(formData);
      return response
    } catch (error) {
      console.error("Error:", error);
      setError(error.response?.data?.message);
    }
  }

  

  const handleLoadPage = async () => {
    try {
      const response = await loadPage();
      return response.data;
    } catch (error) {
      console.error(error);
      setError(error.message);
    }

  }

  const handleGetData = async (name) => {
    try {
      const response = await getDataApi(name);
      console.log("valor de response en dataprovider:", response);
      return response.data;
    } catch (error) {
      console.error(error);
      setError(error.message);
    }

  }

  const handleDestroy = async (id) => {
    if (!window.confirm('¿Está seguro que quiere eliminar esta comida?')) {
      return false; // Salir si el usuario cancela
  }
   
    try {
        const response = await destroyApi(id);
        if (response.data?.status === "success") {
          return true;
        }

        throw new Error(response.data?.message || "Error al eliminar");
    } catch (error) {
        console.error("Error al eliminar:", error);
        throw error; // Re-lanzar para manejo en el componente
    }
}

 const loadCategory = async ({category}) => {
  const response = await loadApiCategory({category});
  return response
 }
  return (
   <DataContext.Provider value= {{handleLoginRegisterUpdate, handleCargarHorario, handleUpdateBanner, handleDestroy, loadCategory, error, setError, handleGetData, handleLoadPage, handleLoginRegister, handleCargarDatos, handleUpdate}}>
    {children}
   </DataContext.Provider>
  )
}

