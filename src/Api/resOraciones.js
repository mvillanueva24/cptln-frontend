import axios from "./axios";

// Cliente
export const registrarOraciones = devo => axios.post("solicitud-oraciones",devo)


// Admin
export const obtenerOraciones = () => axios.get("solicitud-oraciones")

export const obtenerOracionesPag = (parametros) => axios.get("solicitud-oraciones/pagination",parametros)