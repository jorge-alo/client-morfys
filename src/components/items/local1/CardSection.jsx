import comidasPorCategoriaFuntion from "../../../hook/comidasPorCategoria.js";
import { Card } from "../../card/card";


export const CardSection = ({comidas, handleClickCard}) => {
    const { comidasPorCategoria } = comidasPorCategoriaFuntion(comidas);
    return (
        <div className='container-local__card'>
            {Object.entries(comidasPorCategoria).map(([categoria, comidasDeCategoria]) => (
                <section key={categoria} className="section-Card" id={categoria.replace(/\s+/g, '-')} >
                    <h2 >{categoria}</h2>
                    <div className="section-card__flex" >
                        {comidasDeCategoria.map((comida) => (
                            <Card key={comida.id} onClick={() => handleClickCard(comida)} id={comida.id} name={comida.name} description={comida.description} image={comida.image} price={comida.price} categoria={comida.categoria} tamanio= {comida.tamanio} tipo_control = {comida.tipo_control} controlUnidad = {comida.controlUnidad} opciones= {comida.variantes && comida.variantes.length > 0 ? comida.variantes[0].opciones : []} ></Card>
                        ))}
                    </div>
                </section>
            ))
            }
        </div>
    )
}
