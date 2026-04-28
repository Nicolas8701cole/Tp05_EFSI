import { useEffect, useState } from "react"
import "./App.css"

import { buscarPeliculas, buscarDetalle } from "./api/omdb"

import SearchBar from "./components/SearchBar"
import MovieList from "./components/MovieList"
import MovieDetail from "./components/MovieDetail"
import Loader from "./components/Loader"
import ErrorMessage from "./components/ErrorMessage"

function App() {
  const [busqueda, setBusqueda] = useState("")
  const [tipo, setTipo] = useState("")

  const [resultados, setResultados] = useState([])
  const [ultimaBusqueda, setUltimaBusqueda] = useState("")

  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState("")
  const [sinNada, setSinNada] = useState(false)

  const [modalAbierta, setModalAbierta] = useState(false)
  const [detalle, setDetalle] = useState(null)
  const [cargandoDetalle, setCargandoDetalle] = useState(false)
  const [errorDetalle, setErrorDetalle] = useState("")

  useEffect(() => {
    if (resultados.length > 0) {
      document.title = `${resultados.length} resultados | Buscador de pelis`
    } else {
      document.title = "Buscador de pelis"
    }

    return () => {
      document.title = "Buscador de pelis"
    }
  }, [resultados.length])

  async function onBuscar() {
    const textoLimpio = busqueda.trim()

    console.log("Texto original:", busqueda)
    console.log("Texto limpio:", textoLimpio)

    if (textoLimpio === "") {
      setError("Escribí algo antes de buscar.")
      setResultados([])
      setSinNada(false)
      return
    }

    setCargando(true)
    setError("")
    setSinNada(false)
    setResultados([])
    setUltimaBusqueda(textoLimpio)

    setModalAbierta(false)
    setDetalle(null)
    setErrorDetalle("")

    try {
      const data = await buscarPeliculas(textoLimpio, tipo)

      console.log("Respuesta búsqueda:", data)

      if (data.Response === "False") {
        setSinNada(true)
        setResultados([])
        return
      }

      setResultados(data.Search || [])
    } catch (err) {
      console.log("Error al buscar películas:", err)

      if (err.response?.status === 401) {
        setError("La API key fue rechazada. Si sigue así, el problema no es React: es la key.")
      } else {
        setError("Hubo un problema al buscar. Revisá la conexión o la API.")
      }
    } finally {
      setCargando(false)
    }
  }

  function onLimpiar() {
    setBusqueda("")
    setTipo("")
    setResultados([])
    setUltimaBusqueda("")
    setCargando(false)
    setError("")
    setSinNada(false)

    setModalAbierta(false)
    setDetalle(null)
    setCargandoDetalle(false)
    setErrorDetalle("")
  }

  async function abrirDetalle(id) {
    console.log("Pidiendo detalle para ID:", id)

    setModalAbierta(true)
    setCargandoDetalle(true)
    setDetalle(null)
    setErrorDetalle("")

    try {
      const data = await buscarDetalle(id)

      console.log("Respuesta detalle:", data)

      if (data.Response === "False") {
        setErrorDetalle("No pude cargar el detalle de esa peli.")
        return
      }

      setDetalle(data)
    } catch (err) {
      console.log("Error al pedir detalle:", err)
      setErrorDetalle("No pude cargar el detalle de esa peli.")
    } finally {
      setCargandoDetalle(false)
    }
  }

  function cerrarDetalle() {
    setModalAbierta(false)
    setDetalle(null)
    setCargandoDetalle(false)
    setErrorDetalle("")
  }

  return (
    <main className="app">
      <SearchBar
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        tipo={tipo}
        setTipo={setTipo}
        onBuscar={onBuscar}
        onLimpiar={onLimpiar}
      />

      {cargando && <Loader texto="Buscando resultados..." />}

      {!cargando && error && <ErrorMessage mensaje={error} />}

      {!cargando && sinNada && (
        <div className="sinResultados">
          <h3>No encontré nada con ese nombre.</h3>
          <p>Probá con otro título o cambiá el tipo de búsqueda.</p>
        </div>
      )}

      {!cargando && resultados.length > 0 && (
        <MovieList
          resultados={resultados}
          onAbrirDetalle={abrirDetalle}
          ultimaBusqueda={ultimaBusqueda}
        />
      )}

      <MovieDetail
        abierta={modalAbierta}
        detalle={detalle}
        cargando={cargandoDetalle}
        error={errorDetalle}
        onCerrar={cerrarDetalle}
      />
    </main>
  )
}

export default App