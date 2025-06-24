
import '../styles/AddData.css';
import { useForm } from '../context/FormProvider';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/DatoContext';

export const CargarDatos = () => {
    const { handleCargarDatos, error, setError } = useContext(DataContext);
    const { resetForm, file, valueInput, setValueInput, inputRef, handleChange } = useForm();

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
        formData.append('tipoControl', valueInput.tipoControl);
        formData.append('tamano', valueInput.tamanio);
        formData.append('variantes', JSON.stringify(valueInput.variantes));
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
                    <option value="empanadas">Empanadas</option>
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

                <select name="tipoControl" onChange={handleChange} value={valueInput.tipoControl || ""}>
                    <option value="">Seleccione tipo de control</option>
                    <option value="porciones">Porciones individuales</option>
                    <option value="promo">Promoción/Menu</option>
                </select>
                <label>
                    ¿Este producto tiene tamaños?
                    <input
                        type="checkbox"
                        checked={valueInput.tamanio || false}
                        onChange={(e) => setValueInput({ ...valueInput, tamanio: e.target.checked })}
                    />
                </label>
                <h3>Variantes</h3>
                {valueInput.variantes.map((variante, i) => (
                    <div key={i} className="variante-item">
                        <input
                            type="text"
                            placeholder="Nombre de la variante (ej: Tamaño, Salsa, etc)"
                            value={variante.nombre}
                            onChange={(e) => {
                                const nuevas = [...valueInput.variantes];
                                nuevas[i].nombre = e.target.value;
                                setValueInput({ ...valueInput, variantes: nuevas });
                            }}
                        />

                        {/* 🔽 Nuevo campo para ingresar el límite de selección */}
                        <input
                            type="number"
                            placeholder="Cantidad máxima que puede elegir"
                            value={variante.limite || ""}
                            onChange={(e) => {
                                const nuevas = [...valueInput.variantes];
                                nuevas[i].limite = Number(e.target.value);
                                setValueInput({ ...valueInput, variantes: nuevas });
                            }}
                        />

                        {variante.opciones.map((op, j) => (
                            <div key={j}>
                                <input
                                    type="text"
                                    placeholder="Nombre opción"
                                    value={op.nombre}
                                    onChange={(e) => {
                                        const nuevas = [...valueInput.variantes];
                                        nuevas[i].opciones[j].nombre = e.target.value;
                                        setValueInput({ ...valueInput, variantes: nuevas });
                                    }}
                                />
                                <input
                                    type="number"
                                    placeholder="Precio extra"
                                    value={op.precio_adicional}
                                    onChange={(e) => {
                                        const nuevas = [...valueInput.variantes];
                                        nuevas[i].opciones[j].precio_adicional = Number(e.target.value);
                                        setValueInput({ ...valueInput, variantes: nuevas });
                                    }}
                                />
                            </div>
                        ))}
                        <button type="button" onClick={() => {
                            const nuevas = [...valueInput.variantes];
                            nuevas[i].opciones.push({ nombre: "", precio_adicional: 0 });
                            setValueInput({ ...valueInput, variantes: nuevas });
                        }}>+ Opción</button>
                    </div>
                ))}

                <button type="button" onClick={() => {
                    setValueInput({
                        ...valueInput,
                        variantes: [...valueInput.variantes, { tipo: "", opciones: [{ nombre: "", precio_adicional: 0 }] }]
                    });
                }}>+ Añadir Variante</button>
                <button>Enviar</button>
                {error && <p className='error'>{error}</p>}

            </form>

        </div>
    )
}
