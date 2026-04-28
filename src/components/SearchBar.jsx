function SearchBar({
  busqueda,
  setBusqueda,
  tipo,
  setTipo,
  onBuscar,
  onLimpiar,
}) {
  function manejarSubmit(e) {
    e.preventDefault()
    onBuscar()
  }

  return (
    <section className="bloqueBuscador">
      <div className="tituloZona">
        <p className="miniEtiqueta">TP 5 · React + Axios</p>
        <h1>Buscador de pelis</h1>
        <p className="bajada">
          Buscá una película o serie, mirá los resultados y abrí la ficha con la info importante.
        </p>
      </div>

      <form className="formBuscador" onSubmit={manejarSubmit}>
        <input
          type="text"
          placeholder="Ej: Batman, Shrek, Breaking Bad..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="">Todo</option>
          <option value="movie">Película</option>
          <option value="series">Serie</option>
          <option value="episode">Episodio</option>
        </select>

        <button type="submit">Buscar</button>
        <button type="button" className="btnSecundario" onClick={onLimpiar}>
          Limpiar
        </button>
      </form>
    </section>
  )
}

export default SearchBar