
export const comidasPorCategoriaFuntion = (comidas) => {
  const agrupadas = comidas.reduce((acumulador, comida) => {
    if (!acumulador[comida.categoria]) {
      acumulador[comida.categoria] = [];
    }
    acumulador[comida.categoria].push(comida);
    return acumulador;
  }, {});

  // Crear un nuevo objeto con el orden deseado
  const ordenPersonalizado = ["menu del dia", "menu"];
  const comidasPorCategoria = {};

  // Agregar primero las categorías deseadas si existen
  ordenPersonalizado.forEach((categoria) => {
    if (agrupadas[categoria]) {
      comidasPorCategoria[categoria] = agrupadas[categoria];
    }
  });

  // Agregar el resto de las categorías que no están en el orden personalizado
  Object.keys(agrupadas).forEach((categoria) => {
    if (!ordenPersonalizado.includes(categoria)) {
      comidasPorCategoria[categoria] = agrupadas[categoria];
    }
  });

  return { comidasPorCategoria };
};

export default comidasPorCategoriaFuntion;