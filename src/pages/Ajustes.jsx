
import '../styles/Ajustes.css';
import { useForm } from '../context/FormProvider';
import { useContext, useEffect } from 'react';
import { DataContext } from '../context/DatoContext';

export const Ajustes = () => {
    const { error, setError, handleCargarHorario } = useContext(DataContext);
    const { resetForm, file, valueInput, inputRef, handleChange } = useForm();


    useEffect(() => {
        resetForm();
        setError(null);
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file);
        formData.append('envio', valueInput.envio);
        formData.append('cel', valueInput.cel);
        formData.append('envioMinimo', valueInput.envioMinimo);
        formData.append('diaManianaEntrada', valueInput.diaMañanaEntrada);
        formData.append('diaManianaSalida', valueInput.diaMañanaSalida);
        formData.append('horarioManianaEntrada', valueInput.horarioMañanaEntrada);
        formData.append('horarioManianaSalida', valueInput.horarioMañanaSalida);
        formData.append('diaTardeEntrada', valueInput.diaTardeEntrada);
        formData.append('diaTardeSalida', valueInput.diaTardeSalida);
        formData.append('horarioTardeEntrada', valueInput.horarioTardeEntrada);
        formData.append('horarioTardeSalida', valueInput.horarioTardeSalida);
        formData.append('diaDifManianaEntrada', valueInput.diaDifMañanaEntrada);
        formData.append('horarioDifManianaEntrada', valueInput.horarioDifMañanaEntrada);
        formData.append('horarioDifManianaSalida', valueInput.horarioDifMañanaSalida);
        formData.append('diaDifTardeEntrada', valueInput.diaDifTardeEntrada);
        formData.append('horarioDifTardeEntrada', valueInput.horarioDifTardeEntrada);
        formData.append('horarioDifTardeSalida', valueInput.horarioDiftardeSalida);

        const result = await handleCargarHorario(formData);
        console.log("valor result", result);
        resetForm();
        setError(false);
    }

    return (
        <div className="container-addData container-cargar" >

            <form className="container-form modal-form" onSubmit={handleSubmit}>
                <h2 className='h2-ajustes'>Ajustes</h2>
                <label className='logo' htmlFor="file"> Cargue su logo
                    <input
                        ref={inputRef}
                        type="file"
                        name="file"
                        id='file'
                        onChange={handleChange}
                         className="input-file"
                    />
                </label>

                <div className='container-horario'>
                    <div className='container-valor'>
                        <label htmlFor="envio"> Ingrese valor de envio
                            <input
                                type="number"
                                id='envio'
                                name='envio'
                                value={valueInput.envio}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                </div>
                <div className='container-horario'>
                    <div className='container-cel'>
                        <label htmlFor="cel"> Ingrese su celular
                            <input
                                type="text"
                                id='cel'
                                name='cel'
                                placeholder='Cod. Pais + num 541122334455'
                                value={valueInput.cel}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                </div>
                <div className='container-horario'>
                    <div className='container-envioMinimo'>
                        <label htmlFor="envioMinimo"> Ingrese valor minimo de envio
                            <input
                                type="number"
                                id='envio'
                                name='envioMinimo'
                                value={valueInput.envioMinimo}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                </div>

                <div className='container-horario'>
                    <h4>Ingrese el horario de la mañana</h4>
                    <div className='container-horario__data'>
                        <div className='container-horario__de'>
                            <label >De:
                                <select
                                    name="diaMañanaEntrada"
                                    onChange={handleChange}
                                    value={valueInput.diaMañanaEntrada}
                                >
                                    <option value="">Seleccione dia</option>
                                    <option value="lunes">Lunes</option>
                                    <option value="martes">Martes</option>
                                    <option value="miercoles">Miercoles</option>
                                    <option value="jueves">Jueves</option>
                                    <option value="viernes">Viernes</option>
                                    <option value="sabado">Sabado</option>
                                    <option value="domingo">Domingo</option>
                                </select>
                            </label>
                        </div>

                        <div className='container-horario__a'>
                            <label >A:
                                <select
                                    name="diaMañanaSalida"
                                    onChange={handleChange}
                                    value={valueInput.diaMañanaSalida}
                                >
                                    <option value="">Seleccione dia</option>
                                    <option value="lunes">Lunes</option>
                                    <option value="martes">Martes</option>
                                    <option value="miercoles">Miercoles</option>
                                    <option value="jueves">Jueves</option>
                                    <option value="viernes">Viernes</option>
                                    <option value="sabado">Sabado</option>
                                    <option value="domingo">Domingo</option>
                                </select>
                            </label>


                        </div>
                        <div className='container-horario__a'>
                            <label > De:
                                <select
                                    name="horarioMañanaEntrada"
                                    onChange={handleChange}
                                    value={valueInput.horarioMañanaEntrada}
                                >
                                    <option value="">Hora</option>
                                    <option value="6:00">6:00</option>
                                    <option value="6:30">6:30</option>
                                    <option value="7:00">7:00</option>
                                    <option value="7:30">7:30</option>
                                    <option value="8:00">8:00</option>
                                    <option value="8:30">8:30</option>
                                    <option value="9:00">9:00</option>
                                    <option value="9:30">9:30</option>
                                    <option value="10:00">10:00</option>
                                    <option value="10:30">10:30</option>
                                    <option value="11:00">11:00</option>
                                </select>
                            </label>
                        </div>
                        <div className='container-horario__a'>
                            <label > A:
                                <select
                                    name="horarioMañanaSalida"
                                    onChange={handleChange}
                                    value={valueInput.horarioMañanaSalida}
                                >
                                    <option value="">Hora</option>
                                    <option value="11:00">11:00</option>
                                    <option value="11:30">11:30</option>
                                    <option value="12:00">12:00</option>
                                    <option value="12:30">12:30</option>
                                    <option value="13:00">13:00</option>
                                    <option value="13:30">13:30</option>
                                    <option value="14:00">14:00</option>
                                    <option value="14:30">14:30</option>
                                    <option value="15:00">15:00</option>
                                    <option value="15:30">15:30</option>
                                    <option value="16:00">16:00</option>

                                </select>
                            </label>
                        </div>
                    </div>

                </div>

                <div className='container-horario'>
                    <h4>Ingrese el horario de la tarde</h4>
                    <div className='container-horario__data'>
                        <div className='container-horario__de'>
                            <label >De:
                                <select
                                    name="diaTardeEntrada"
                                    onChange={handleChange}
                                    value={valueInput.diaTardeEntrada}
                                >
                                    <option value="">Seleccione dia</option>
                                    <option value="lunes">Lunes</option>
                                    <option value="martes">Martes</option>
                                    <option value="miercoles">Miercoles</option>
                                    <option value="jueves">Jueves</option>
                                    <option value="viernes">Viernes</option>
                                    <option value="sabado">Sabado</option>
                                    <option value="domingo">Domingo</option>
                                </select>
                            </label>
                        </div>

                        <div className='container-horario__a'>
                            <label >A:
                                <select
                                    name="diaTardeSalida"
                                    onChange={handleChange}
                                    value={valueInput.diaTardeSalida}
                                >
                                    <option value="">Seleccione dia</option>
                                    <option value="lunes">Lunes</option>
                                    <option value="martes">Martes</option>
                                    <option value="miercoles">Miercoles</option>
                                    <option value="jueves">Jueves</option>
                                    <option value="viernes">Viernes</option>
                                    <option value="sabado">Sabado</option>
                                    <option value="domingo">Domingo</option>
                                </select>
                            </label>
                        </div>

                        <div className='container-horario__a'>
                            <label > De:
                                <select
                                    name="horarioTardeEntrada"
                                    onChange={handleChange}
                                    value={valueInput.horarioTardeEntrada}
                                >
                                    <option value="">Hora</option>
                                    <option value="12:00">12:00</option>
                                    <option value="12:30">12:30</option>
                                    <option value="13:00">13:00</option>
                                    <option value="13:30">13:30</option>
                                    <option value="14:00">14:00</option>
                                    <option value="14:30">14:30</option>
                                    <option value="15:00">15:00</option>
                                    <option value="15:30">15:30</option>
                                    <option value="16:00">16:00</option>
                                    <option value="16:30">16:30</option>
                                    <option value="17:00">17:00</option>
                                    <option value="17:30">17:30</option>
                                    <option value="18:00">18:00</option>
                                    <option value="18:30">18:30</option>
                                    <option value="19:00">19:00</option>
                                    <option value="19:30">19:30</option>
                                    <option value="20:00">20:00</option>
                                    <option value="20:30">20:30</option>
                                    <option value="21:00">21:00</option>
                                </select>
                            </label>
                        </div>
                        <div className='container-horario__a'>
                            <label > A:
                                <select
                                    name="horarioTardeSalida"
                                    onChange={handleChange}
                                    value={valueInput.horarioTardeSalida}
                                >
                                    <option value="">Hora</option>
                                    <option value="15:00">15:00</option>
                                    <option value="15:30">15:30</option>
                                    <option value="16:00">16:00</option>
                                    <option value="16:30">16:30</option>
                                    <option value="17:00">17:00</option>
                                    <option value="17:30">17:30</option>
                                    <option value="18:00">18:00</option>
                                    <option value="18:30">18:30</option>
                                    <option value="19:00">19:00</option>
                                    <option value="19:30">19:30</option>
                                    <option value="20:00">20:00</option>
                                    <option value="20:30">20:30</option>
                                    <option value="21:00">21:00</option>
                                    <option value="21:30">21:30</option>
                                    <option value="22:00">22:00</option>
                                    <option value="22:30">22:30</option>
                                    <option value="23:00">23:00</option>
                                    <option value="23:30">23:30</option>
                                    <option value="24:00">24:00</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className='container-horario'>
                        <h4>horario de la mañana de dia diferente</h4>
                        <div className='container-horario__data'>
                            <div className='container-horario__de'>
                                <label >
                                    <select
                                        name="diaDifMañanaEntrada"
                                        onChange={handleChange}
                                        value={valueInput.diaDifMañanaEntrada}
                                    >
                                        <option value="">Seleccione dia</option>
                                        <option value="lunes">Lunes</option>
                                        <option value="martes">Martes</option>
                                        <option value="miercoles">Miercoles</option>
                                        <option value="jueves">Jueves</option>
                                        <option value="viernes">Viernes</option>
                                        <option value="sabado">Sabado</option>
                                        <option value="domingo">Domingo</option>
                                    </select>
                                </label>
                            </div>

                            <div className='container-horario__a'>
                                <label > De:
                                    <select
                                        name="horarioDifMañanaEntrada"
                                        onChange={handleChange}
                                        value={valueInput.horarioDifMañanaEntrada}
                                    >
                                        <option value="">Hora</option>
                                        <option value="6:00">6:00</option>
                                        <option value="6:30">6:30</option>
                                        <option value="7:00">7:00</option>
                                        <option value="7:30">7:30</option>
                                        <option value="8:00">8:00</option>
                                        <option value="8:30">8:30</option>
                                        <option value="9:00">9:00</option>
                                        <option value="9:30">9:30</option>
                                        <option value="10:00">10:00</option>
                                        <option value="10:30">10:30</option>
                                        <option value="11:00">11:00</option>
                                    </select>
                                </label>
                            </div>
                            <div className='container-horario__a'>
                                <label > A:
                                    <select
                                        name="horarioDifMañanaSalida"
                                        onChange={handleChange}
                                        value={valueInput.horarioDifMañanaSalida}
                                    >
                                        <option value="">Hora</option>
                                        <option value="11:00">11:00</option>
                                        <option value="11:30">11:30</option>
                                        <option value="12:00">12:00</option>
                                        <option value="12:30">12:30</option>
                                        <option value="13:00">13:00</option>
                                        <option value="13:30">13:30</option>
                                        <option value="14:00">14:00</option>
                                        <option value="14:30">14:30</option>
                                        <option value="15:00">15:00</option>
                                        <option value="15:30">15:30</option>
                                        <option value="16:00">16:00</option>

                                    </select>
                                </label>
                            </div>
                        </div>


                    </div>
                    <div className='container-horario'>
                        <h4>horario de la tarde de dia diferente</h4>
                        <div className='container-horario__data'>
                            <div className='container-horario__de'>
                                <label >
                                    <select
                                        name="diaDifTardeEntrada"
                                        onChange={handleChange}
                                        value={valueInput.diaDifTardeEntrada}
                                    >
                                        <option value="">Seleccione dia</option>
                                        <option value="lunes">Lunes</option>
                                        <option value="martes">Martes</option>
                                        <option value="miercoles">Miercoles</option>
                                        <option value="jueves">Jueves</option>
                                        <option value="viernes">Viernes</option>
                                        <option value="sabado">Sabado</option>
                                        <option value="domingo">Domingo</option>
                                    </select>
                                </label>
                            </div>

                            <div className='container-horario__a'>
                                <label > De:
                                    <select
                                        name="horarioDifTardeEntrada"
                                        onChange={handleChange}
                                        value={valueInput.horarioDifTardeEntrada}
                                    >
                                        <option value="">Hora</option>
                                        <option value="12:00">12:00</option>
                                        <option value="12:30">12:30</option>
                                        <option value="13:00">13:00</option>
                                        <option value="13:30">13:30</option>
                                        <option value="14:00">14:00</option>
                                        <option value="14:30">14:30</option>
                                        <option value="15:00">15:00</option>
                                        <option value="15:30">15:30</option>
                                        <option value="16:00">16:00</option>
                                        <option value="16:30">16:30</option>
                                        <option value="17:00">17:00</option>
                                        <option value="17:30">17:30</option>
                                        <option value="18:00">18:00</option>
                                        <option value="18:30">18:30</option>
                                        <option value="19:00">19:00</option>
                                        <option value="19:30">19:30</option>
                                        <option value="20:00">20:00</option>
                                        <option value="20:30">20:30</option>
                                        <option value="21:00">21:00</option>
                                    </select>
                                </label>
                            </div>
                            <div className='container-horario__a'>
                                <label > A:
                                    <select
                                        name="horarioDiftardeSalida"
                                        onChange={handleChange}
                                        value={valueInput.horarioDiftardeSalida}
                                    >
                                        <option value="">Hora</option>
                                        <option value="15:00">15:00</option>
                                        <option value="15:30">15:30</option>
                                        <option value="16:00">16:00</option>
                                        <option value="16:30">16:30</option>
                                        <option value="17:00">17:00</option>
                                        <option value="17:30">17:30</option>
                                        <option value="18:00">18:00</option>
                                        <option value="18:30">18:30</option>
                                        <option value="19:00">19:00</option>
                                        <option value="19:30">19:30</option>
                                        <option value="20:00">20:00</option>
                                        <option value="20:30">20:30</option>
                                        <option value="21:00">21:00</option>
                                        <option value="21:30">21:30</option>
                                        <option value="22:00">22:00</option>
                                        <option value="22:30">22:30</option>
                                        <option value="23:00">23:00</option>
                                        <option value="23:30">23:30</option>
                                        <option value="24:00">24:00</option>

                                    </select>
                                </label>
                            </div>
                        </div>


                    </div>
                </div>
                <button>Enviar</button>
                {error && <p className='error'>{error}</p>}

            </form>

        </div>
    )
}

