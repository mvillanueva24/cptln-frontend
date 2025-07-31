import axios from "./axios";

// Cliente
export const solicitudCursos = devo => axios.post("solicitud-cursos",devo)


// Admin
export const obtenerSolicitudCursos = () => axios.get("solicitud-cursos")

export const obtenerCursosPag = (parametros) => axios.get("solicitud-cursos/pagination",parametros)