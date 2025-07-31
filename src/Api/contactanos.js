import axios from "./axios";

// Cliente
export const solicitudContactanos = devo => axios.post("solicitud-contactanos",devo)


// Admin
export const obtenerContactanos = () => axios.get("solicitud-contactanos")

export const obtenerContactanosPag = (parametros) => axios.get("solicitud-contactanos/pagination",parametros)