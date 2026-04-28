function Loader({ texto = "Cargando..." }) {
  return (
    <div className="loader">
      <div className="spinner"></div>
      <p>{texto}</p>
    </div>
  )
}

export default Loader