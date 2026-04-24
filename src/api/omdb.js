import axios from "axios"

const API_URL = "https://www.omdbapi.com/"
const API_KEY = import.meta.env.VITE_OMDB_API_KEY

export async function buscarPeliculas(titulo, tipo = "") {
  console.log("API KEY:", API_KEY)
  console.log("Título buscado:", titulo)
  console.log("Tipo:", tipo)

  const params = {
    apikey: API_KEY,
    s: titulo,
  }

  if (tipo !== "") {
    params.type = tipo
  }

  const respuesta = await axios.get(API_URL, { params })

  console.log("Respuesta búsqueda:", respuesta.data)

  return respuesta.data
}

export async function buscarDetallePorId(id) {
  console.log("ID pedido:", id)

  const respuesta = await axios.get(API_URL, {
    params: {
      apikey: API_KEY,
      i: id,
      plot: "full",
    },
  })

  console.log("Respuesta detalle:", respuesta.data)

  return respuesta.data
}