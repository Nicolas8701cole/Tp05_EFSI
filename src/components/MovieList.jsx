import MovieCard from "./MovieCard"

function MovieList({ resultados, onAbrirDetalle, ultimaBusqueda }) {
  return (
    <section className="zonaResultados">
      <div className="encabezadoResultados">
        <h2>Resultados</h2>
        <p>
          {resultados.length} encontrados para <span>"{ultimaBusqueda}"</span>
        </p>
      </div>

      <div className="grillaPeliculas">
        {resultados.map((item) => (
          <MovieCard
            key={item.imdbID}
            peli={item}
            onAbrirDetalle={onAbrirDetalle}
          />
        ))}
      </div>
    </section>
  )
}

export default MovieList