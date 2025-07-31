import axios from "./axios";

// Cliente
export const solicitudEbooks = devo => axios.post("solicitud-ebooks",devo)


// Admin
export const obtenerEbooks = () => axios.get("solicitud-ebooks")

export const obtenerEbooksPag = (parametros) => axios.get("solicitud-ebooks/pagination",parametros)