import axios from "axios"

const URL = "https://www.omdbapi.com/"
const API_KEY = import.meta.env.VITE_OMDB_API_KEY

export async function buscarPeliculas(texto, tipo = "") {
  const params = {
    apikey: API_KEY,
    s: texto,
  }

  if (tipo !== "") {
    params.type = tipo
  }

  const respuesta = await axios.get(URL, { params })
  return respuesta.data
}

export async function buscarDetalle(id) {
  const respuesta = await axios.get(URL, {
    params: {
      apikey: API_KEY,
      i: id,
      plot: "full",
    },
  })

  return respuesta.data
}