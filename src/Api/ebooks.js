import axios from "./axios";

// Cliente

export const obtenerEbooks = () => axios.get("ebooks")


//Admin

export const obtenerEbooksAdmin = () => axios.get("/admin/ebooks")

export const registrarEbooks = event => axios.post("/admin/ebooks",event)

export const obtenerEbooksID = (id) => axios.get(`/admin/ebooks/${id}`)

export const EditarEbooks =  (id, data) => axios.post(`/admin/ebooks/${id}`,data)

export const obtenerEbooksPag = (parametros) => axios.get("/admin/ebooks/pagination",parametros)

export const EliminarEbooks = ({id}) => axios.post("/admin/ebooks/delete",{},{params: {id}} )