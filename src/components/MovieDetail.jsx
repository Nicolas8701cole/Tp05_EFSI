import { useEffect } from "react"
import Loader from "./Loader"

function MovieDetail({ abierta, detalle, cargando, error, onCerrar }) {
  useEffect(() => {
    if (!abierta) return

    const overflowAnterior = document.body.style.overflow

    function cerrarConEscape(e) {
      if (e.key === "Escape") {
        onCerrar()
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", cerrarConEscape)

    return () => {
      document.body.style.overflow = overflowAnterior
      window.removeEventListener("keydown", cerrarConEscape)
    }
  }, [abierta, onCerrar])

  if (!abierta) return null

  const tienePoster = detalle?.Poster && detalle.Poster !== "N/A"

  return (
    <section className="overlayDetalle" onClick={onCerrar}>
      <article className="modalDetalle" onClick={(e) => e.stopPropagation()}>
        <button className="cerrarModal" onClick={onCerrar}>
          ×
        </button>

        {cargando && (
          <div className="detalleCargando">
            <Loader texto="Cargando detalle..." />
          </div>
        )}

        {!cargando && error && (
          <div className="detalleError">
            <p>{error}</p>
          </div>
        )}

        {!cargando && !error && detalle && (
          <div className="detalleContenido">
            <div className="detallePoster">
              {tienePoster ? (
                <img src={detalle.Poster} alt={`Póster de ${detalle.Title}`} />
              ) : (
                <div className="sinPoster grande">Sin póster</div>
              )}
            </div>

            <div className="detalleTexto">
              <p className="miniEtiquetaDetalle">{detalle.Type || "Título"}</p>
              <h2>{detalle.Title || "Título no disponible"}</h2>

              <div className="datosDetalle">
                <p><strong>Año:</strong> {detalle.Year || "Sin dato"}</p>
                <p><strong>Género:</strong> {detalle.Genre || "Sin dato"}</p>
                <p><strong>Director:</strong> {detalle.Director || "Sin dato"}</p>
                <p><strong>Actores:</strong> {detalle.Actors || "Sin dato"}</p>
                <p><strong>Duración:</strong> {detalle.Runtime || "Sin dato"}</p>
                <p><strong>Idioma:</strong> {detalle.Language || "Sin dato"}</p>
                <p><strong>País:</strong> {detalle.Country || "Sin dato"}</p>
                <p>
                  <strong>IMDb:</strong>{" "}
                  {detalle.imdbRating && detalle.imdbRating !== "N/A"
                    ? detalle.imdbRating
                    : "No disponible"}
                </p>
              </div>

              <div className="bloqueSinopsis">
                <h3>Sinopsis</h3>
                <p>
                  {detalle.Plot && detalle.Plot !== "N/A"
                    ? detalle.Plot
                    : "No hay sinopsis disponible para este resultado."}
                </p>
              </div>
            </div>
          </div>
        )}
      </article>
    </section>
  )
}

export default MovieDetail