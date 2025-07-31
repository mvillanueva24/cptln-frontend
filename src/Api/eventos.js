import axios from "./axios";

// Cliente
export const obtenerEventos = () => axios.get("eventos")


// Admin
export const obtenerEventosAdmin = () => axios.get("admin/eventos")

export const obtenerEventosID = (id) => axios.get(`admin/eventos/${id}`)

export const registrarEvento = event => axios.post("admin/eventos",event)

export const EditarEventos =  (id, data) => axios.post(`admin/eventos/${id}`,data)

export const EliminarEvento = ({id}) => axios.post("admin/eventos/delete",{},{params: {id}} )

export const obtenerEventosPag = (parametros) => axios.get("admin/eventos/pagination",parametros)