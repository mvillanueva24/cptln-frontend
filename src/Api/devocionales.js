import axios from "./axios";

// Cliente

export const obtenerDevocional = () => axios.get("devocionales")

export const obtenerDevocionalHoy = () => axios.get("devocionales/hoy")

export const obtenerDevocionalPag = (parametros) => axios.get("devocionales/pagination",parametros)

export const obtenerDevocionalID = (id) => axios.get(`/devocionales/${id}`)


// Admin
export const obtenerDevocionalAdmin = () => axios.get("/admin/devocionales")

export const obtenerDevocionalPagAdmin = (parametros) => axios.get("/admin/devocionales/pagination",parametros)

export const obtenerDevocionalIDAdmin = (id) => axios.get(`/admin/devocionales/${id}`)

export const registrarDevo = devo => axios.post("/admin/devocionales",devo)

export const EditarDevocional =  (id, data) => axios.post(`/admin/devocionales/${id}`,data)

export const eliminarDevocional = ({id}) => axios.post('/admin/devocionales/delete',{},{params: {id}} )