import axios from "./axios";

// Cliente
export const obtenerDatosDeRadio = () => axios.get(`/client/radio`)
export const obtenerRadioDataCliente = ({limit}) => axios.get(`/client/radio/secciones`, {params: {limit}})
export const obtenerRadioDataSeccion = (id) => axios.get(`/client/radio/seccion/${id}`)
export const obtenerContenidoSeccionPagination = (id, parametros) => axios.get(`/client/radio/${id}/pagination`,{params: parametros})

// Admin 

// Radio //
export const obtenerDatosDeRadioAdmin = () => axios.get(`/admin/radio`)
export const actualizarDatosDeRadio = (data) => axios.post(`/admin/radio`, data)

// Secciones //
export const obtenerSecciones = () => axios.get(`/admin/radio/secciones` )
export const agregarSeccion = (data) => axios.post(`/admin/radio/secciones`, data )
export const obtenerSeccion = (id) => axios.get(`/admin/radio/secciones/${id}` )
export const modificarSeccion = (id, data) => axios.post(`/admin/radio/secciones/${id}`, data)
export const eliminarSeccion = ({id}) => axios.post(`/admin/radio/secciones/delete`,{},{params: {id}} )


// Contenido //
export const obtenerSeccionContenidos = (idseccion) => axios.get(`/admin/radio/secciones/${idseccion}/contenido` )
export const agregarSeccionContenido = (idseccion,data) => axios.post(`/admin/radio/secciones/${idseccion}/contenido`, data )
export const obtenerSeccionCotenido = (idseccion, idcontenido) => axios.get(`/admin/radio/secciones/${idseccion}/contenido/${idcontenido}` )
export const modificarSeccionContenido = (idseccion, idcontenido, data) => axios.post(`/admin/radio/secciones/${idseccion}/contenido/${idcontenido}`, data)

export const eliminarContenido = (idseccion, idcontenido) => axios.post(`/admin/radio/secciones/${idseccion}/contenido/delete`, { idcontenido });
