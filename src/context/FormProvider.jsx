import { createContext, useContext, useRef, useState } from "react"

const formContext = createContext();

export const FormProvider = ({ children }) => {

  const [file, setFile] = useState("");
  const [valueInput, setValueInput] = useState({
    comida_id: "",
    user_id: "",
    user_name: "",
    name: "",
    description: "",
    price: "",
    categoria: "",
    tipoControl: "",
    tamanio: "",
    controlunidad: "",
    email: "",
    password: "",
    local: "",
    latitud: "",
    longitud: "",
    cel: "",
    domicilio: "",
    variantes: [],
    envio: "",
    envioMinimo: "" ,
    diaMañanaEntrada: "",
    diaMañanaSalida: "",
    horarioMañanaEntrada: "",
    horarioMañanaSalida: "",
    diaTardeEntrada: "",
    diaTardeSalida: "",
    horarioTardeEntrada: "",
    horarioTardeSalida: "",
    diaDifMañanaEntrada: "",
    horarioDifMañanaEntrada: "",
    horarioDifMañanaSalida: "",
    diaDifTardeEntrada: "",
    horarioDifTardeEntrada: "",
    horarioDiftardeSalida: ""
  });

  const inputRef = useRef(null);

  const handleChange = (e) => {
    if (e.target.type == 'file') {
      setFile(e.target.files[0]);
    } else {
      setValueInput({ ...valueInput, [e.target.name]: e.target.value });
    }
    console.log(valueInput);
  }

  const resetForm = () => {
    setValueInput({
      comida_id: "",
      user_id: "",
      user_name: "",
      name: "",
      description: "",
      price: "",
      categoria: "",
      tipoControl: "",
      tamanio: "",
      controlunidad: "",
      email: "",
      password: "",
      local: "",
      latitud: "",
      longitud: "",
      cel: "",
      domicilio: "",
      variantes: [],
        envio: "",
         envioMinimo: "" ,
    diaMañanaEntrada: "",
    diaMañanaSalida: "",
    horarioMañanaEntrada: "",
    horarioMañanaSalida: "",
    diaTardeEntrada: "",
    diaTardeSalida: "",
    horarioTardeEntrada: "",
    horarioTardeSalida: "",
    diaDifMañanaEntrada: "",
    horarioDifMañanaEntrada: "",
    horarioDifMañanaSalida: "",
    diaDifTardeEntrada: "",
    horarioDifTardeEntrada: "",
    horarioDiftardeSalida: ""
    });
    if (inputRef.current) inputRef.current.value = "";
    setFile(null);
  };

  return (
    <formContext.Provider value={{ inputRef, file, valueInput, setValueInput, handleChange, resetForm }}>
      {children}
    </formContext.Provider>
  )
}

export const useForm = () => useContext(formContext);
