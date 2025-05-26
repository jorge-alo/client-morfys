
import '../styles/AddData.css';
import { useForm } from '../context/FormProvider';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/DatoContext';

export const CargarDatos = () => {
    const { handleCargarDatos, error, setError } = useContext(DataContext);
    const { resetForm, file, valueInput, inputRef, handleChange } = useForm();

    const [customCategory, setCustomCategory] = useState(false);
    const [newCategory, setNewCategory] = useState("");

    useEffect(() => {
        resetForm();
        setError(false);
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file);
        formData.append('name', valueInput.name);
        formData.append('description', valueInput.description);
        formData.append('price', valueInput.price);
        formData.append('categoria', valueInput.categoria);
        formData.append('guarnicion', valueInput.guarnicion);
        await handleCargarDatos(formData);
        resetForm();
        setCustomCategory(false);
        setNewCategory("");
    }


    return (
        <div className="container-addData container-cargar" >

            <form className="container-form modal-form" onSubmit={handleSubmit}>
                <h2>Cargue los datos de las comidas</h2>

                <input
                    ref={inputRef}
                    type="file"
                    name="file"
                    onChange={handleChange}
                />

                <input

                    type="text"
                    name="name"
                    placeholder='Ingrese nombre de la comida'
                    value={valueInput.name}
                    onChange={handleChange}
                />
                <textarea
                    rows='5'
                    name="description"
                    placeholder='Ingrese descripcion'
                    value={valueInput.description}
                    onChange={handleChange}
                ></textarea>
                <input

                    type="number"
                    name="price"
                    placeholder='Ingrese precio'
                    value={valueInput.price}
                    onChange={handleChange}
                />
                <label htmlFor="guarnicion">Guarnicion
                    <select
                        name="guarnicion"
                        id='guarnicion'
                        onChange={handleChange}
                        value={valueInput.guarnicion}
                    >
                        <option value="false">No</option>
                        <option value="true">Si</option>
                    </select>
                </label>
                <select
                    name="categoria"
                    onChange={(e) => {
                        if (e.target.value === "custom") {
                            setCustomCategory(true);
                            handleChange({ target: { name: "categoria", value: "" } }); // Limpia la categoría
                        } else {
                            setCustomCategory(false);
                            handleChange(e);
                        }
                    }}
                    value={customCategory ? "" : valueInput.categoria}
                >
                    <option value="">Seleccione una categoria</option>
                    <option value="empandas">Empandas</option>
                    <option value="pizzas">Pizzas</option>
                    <option value="pizzas especiales">Pizzas especiales</option>
                    <option value="sandguches">Sandguches</option>
                    <option value="hamburguesas">Hamburguesas</option>
                    <option value="choripanes">Choripanes</option>
                    <option value="bebidas">Bebidas</option>
                    <option value="menu">Menu</option>
                    <option value="promociones">Promociones</option>
                    <option value="promocion especial">Promocion especial</option>
                    <option value="menu del dia">Menu del dia</option>
                    <option value="guarnicion">Guarnicion</option>
                    <option value="custom">✏️ Escribir nueva categoría</option>
                </select>
                {customCategory && (
                    <input
                        type="text"
                        placeholder="Escribe la nueva categoría"
                        value={newCategory}
                        onChange={(e) => {
                            setNewCategory(e.target.value);
                            handleChange({ target: { name: "categoria", value: e.target.value } });
                        }}
                    />
                )}
                <button>Enviar</button>
                {error && <p className='error'>{error}</p>}

            </form>

        </div>
    )
}
