function traducirTipo(tipo) {
  if (tipo === "movie") return "Película"
  if (tipo === "series") return "Serie"
  if (tipo === "episode") return "Episodio"
  return tipo || "Sin tipo"
}

function MovieCard({ peli, onAbrirDetalle }) {
  const tienePoster = peli.Poster && peli.Poster !== "N/A"

  return (
    <article className="cardPeli">
      <div className="cardPoster">
        {tienePoster ? (
          <img src={peli.Poster} alt={`Póster de ${peli.Title}`} />
        ) : (
          <div className="sinPoster">Sin póster</div>
        )}
      </div>

      <div className="cardInfo">
        <p className="cardTipo">{traducirTipo(peli.Type)}</p>
        <h3>{peli.Title || "Título no disponible"}</h3>
        <p className="cardAnio">{peli.Year || "Año desconocido"}</p>

        <button onClick={() => onAbrirDetalle(peli.imdbID)}>
          Ver detalle
        </button>
      </div>
    </article>
  )
}

export default MovieCard