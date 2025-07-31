import axios from "./axios";

// Cliente
export const obtenerCurso = () => axios.get("cursos")

export const obtenerCursoID = (id) => axios.get(`cursos/${id}`)

export const buscarContenidosDelCurso = (idcurso) => axios.get(`/cursos/capitulos/capitulo/${idcurso}`)


// Admin

// Curso //
export const obtenerCursoAdmin = () => axios.get("/admin/cursos")

export const obtenerCursoIDAdmin = (id) => axios.get(`/admin/cursos/${id}`)

export const registrarCurso = event => axios.post("/admin/cursos",event)

export const EditarCurso =  (id, data) => axios.post(`/admin/cursos/${id}`,data)

export const obtenerCursoPag = (parametros) => axios.get("/admin/cursos/pagination",parametros)

// export const eliminarCurso = (idcurso) => axios.post('/admin/cursos/delete', idcurso)
export const eliminarCurso = ({idcurso}) => axios.post("admin/cursos/delete",{},{params: {idcurso}} )


// Contenido //
export const buscarContenidosDelCursoAdmin = (idcurso) => axios.get(`/admin/cursos/capitulos/capitulo/${idcurso}`)

export const buscarCapituloEspecifico = (idcurso, id) => axios.get(`/admin/cursos/capitulos/${idcurso}/${id}`)

export const crearCapituloCurso = (idcurso, data) => axios.post(`/admin/cursos/capitulos/capitulo/${idcurso}`,data)

export const editarCapituloCurso = (idcurso, idcapitulo, data) => axios.post(`/admin/cursos/capitulos/${idcurso}/${idcapitulo}`, data)

export const obtenerCapitulosCursoPag = (idcurso, parametros) => axios.get(`/admin/cursos/capitulos/pagination/${idcurso}`,parametros) 

export const ordenarListaDeCapitulos = (id, data) => axios.post(`/admin/cursos/capitulos/ordenar/${id}`,data)

export const eliminarCapituloDelCurso = (idcurso, idcapitulo) => axios.post(`/admin/cursos/capitulos/${idcurso}/${idcapitulo}/delete`)