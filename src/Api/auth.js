import axios from "./axios"

// Rutas de usuarios
export const obtenerUsuarios = () => axios.get("/admin/cptln/pe/users");
export const registrar = (user) => axios.post(`/admin/cptln/pe/users/register`, user);
export const login = (user) => axios.post(`/admin/cptln/pe/users/login`, user);
export const logout = (token) => axios.post(`/admin/cptln/pe/users/logout`, token);
export const eliminarUsuario = (id) => axios.post(`/admin/cptln/pe/users/${id}/delete`);
export const verifyTokenRequest = () => axios.post("/verifytoken");
