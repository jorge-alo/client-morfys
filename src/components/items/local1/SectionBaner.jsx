

export const SectionBaner = ({ idVaner, login, vaner, name, handleClickBaner }) => {
  console.log("valor de vaner:", vaner);
  const handleClick = () => {
    if (login) {
      handleClickBaner();
    }
  }
  const fondoBanner = vaner.length > 0 ? `url(${vaner})` : `url("/banner/fondoBaner.jpg")`
  return (
    <section
      className={`container-banner ${login && "container-banner__login"}`}
      onClick={handleClick}
      style={{
        backgroundImage: fondoBanner,

      }}
    >
      <div className="container-baner__data">
        <h2>{name}</h2>
        <div className="container-abiertoHorarioEnvio">
          <div>
            <h3>
              {idVaner.diaManianaEntrada && idVaner.horarioManianaEntrada && idVaner.horarioManianaSalida && (
                <>
                  Abierto de {idVaner.diaManianaEntrada} a {idVaner.diaManianaSalida} de {idVaner.horarioManianaEntrada} a {idVaner.horarioManianaSalida}
                </>
              )}

              {idVaner.diaTardeEntrada && idVaner.horarioTardeEntrada && idVaner.horarioTardeSalida && (
                <>
                  {idVaner.diaManianaEntrada ? " y " : `Abierto de ${idVaner.diaTardeEntrada} a ${idVaner.diaTardeSalida}`}
                  {idVaner.horarioTardeEntrada} a {idVaner.horarioTardeSalida}
                </>
              )}


            </h3>
            <h3>
              {idVaner.diaDifManianaEntrada && idVaner.horarioDifManianaEntrada && idVaner.horarioDifManianaSalida && (
                <>
                  Abierto {idVaner.diaDifManianaEntrada} {idVaner.diaDifManianaSalida} de {idVaner.horarioDifManianaEntrada} a {idVaner.horarioDifManianaSalida}
                </>
              )}
              {idVaner.diaDifTardeEntrada && idVaner.horarioDifTardeEntrada && idVaner.horarioDifTardeSalida && (
                <>
                  {idVaner.diaDifManianaEntrada ? " y " : `Abierto ${idVaner.diaDifTardeEntrada} `}
                  {idVaner.horarioDifTardeEntrada} a {idVaner.horarioDifTardeSalida}
                </>
              )}
            </h3>
            {idVaner.envio && <h3>Envio ${idVaner.envio} {idVaner.envioMinimo && `- Pedido minimo $${idVaner.envioMinimo}`}</h3>}
          </div>

        </div>

      </div>
    </section>
  )
}
