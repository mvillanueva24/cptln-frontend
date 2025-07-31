import axios from "./axios";

// Cliente
export const obtenerProgramas = () => axios.get("programa")

export const buscarPrograma = (id) => axios.get(`programa/${id}`)

export const obtenerProgramasCliente = () => axios.get("client/programa")

export const obtenerProgramasPorCategorias = (categoria) => axios.post(`programa/categoria`,categoria)

export const obtenerInfoPrograma = (programaEspecifico) => axios.post(`programa/nombre`,programaEspecifico)

export const obtenerInfoProgramaContenido = (programaEspecifico) => axios.post(`programa/nombre/contenido`,programaEspecifico)


// Administracion

// Programas //
export const obtenerProgramasAdmin = () => axios.get("/admin/programa")

export const buscarProgramaAdmin = (id) => axios.get(`/admin/programa/${id}`)

export const crearPrograma = event => axios.post("/admin/programa",event)

export const obtenerProgramasPagination = (params) => axios.get('/admin/programa/pagination', params)

export const editarPrograma = (id, data) => axios.post(`/admin/programa/editar/${id}`,data)

// export const eliminarPrograma = (idprograma) => axios.post(`/admin/programa/delete`, idprograma)
export const eliminarPrograma = ({idprograma}) => axios.post(`/admin/programa/delete`,{},{params: {idprograma}} )

// Contenido //
export const obtenerContenidoProgramaPagination = (id, params) => axios.get(`/admin/programa/contenido/pagination/${id}`, params )

export const buscarProgramaContenido = (idprograma, id) => axios.get(`/admin/programa/contenido/${idprograma}/${id}`)

export const crearContenidoPrograma = (id, data) => axios.post(`/admin/programa/contenido/${id}`,data )

export const editarProgramaContenido = (idprograma, id, data) => axios.post(`/admin/programa/contenido/${idprograma}/${id}`,data)

export const ordenarListaDeContenido = (id, data) => axios.post(`/admin/programa/contenido/ordenar/${id}`,data)

export const eliminarContenidoDelPrograma = (idprograma, idcontenido) => axios.post('/admin/programa/contenido/delete',{idprograma, idcontenido})