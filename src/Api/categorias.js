import axios from "./axios";

// Cliente
export const obtenerCategorias = () => axios.get("categorias")

export const obtenerCategoriasID = (id) => axios.get(`categorias/${id}`)

export const BuscarCategoriaPorNombre =  (data) => axios.post(`categorias/nombre`,data)


// Admin
export const obtenerCategoriasAdmin = () => axios.get("/admin/categorias")

export const obtenerCategoriasIDAdmin = (id) => axios.get(`/admin/categorias/${id}`)

export const registrarCategoria = event => axios.post("/admin/categorias",event)

export const EditarCategorias =  (id, data) => axios.post(`/admin/categorias/${id}`,data)

export const obtenerCategoriasPag = (parametros) => axios.get("/admin/categorias/pagination",parametros)

export const EliminarCategoria = ({id}) => axios.post("admin/categorias/delete",{},{params: {id}} )