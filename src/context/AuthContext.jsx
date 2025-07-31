import { createContext, useContext, useState, useEffect, useRef } from "react";
import { login, registrar, verifyTokenRequest, logout } from "../Api/auth";
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

    const location = useLocation()
    const navigate = useNavigate ()

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorsAuth , setErrorsAuth] = useState("")

    const loginUser = async (user) => {
        try {
            const res = await login(user); // Espera a que la promesa se resuelva
            setIsAuthenticated(true)
            setUser(res.data)
            navigate('admin/')
        } catch (error) {
            console.error('Error en el login:', error.message);
        }
    }

    const RegisterUser = async (user) => {
        try {
            const response = await registrar(user)
            console.log(response)
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                const firstError = error.response.data.errors[0]; // Primer error de la respuesta
                setErrorsAuth(firstError.message); // Establecer el primer error como estado
            } else {
                setErrorsAuth("Error desconocido"); // En caso de que no se obtenga un error esperado
            }
    
        }
    }

    const LogoutUser = async () => {
        try {
            const token = localStorage.removeItem('token') || Cookies.remove('token');
            const res = logout(token)
            if (res) {
                setIsAuthenticated(false)
                setUser(null)
                
            }
        } catch (error) {
            setErrorsAuth(error)
        }
    }

    const hasRedirected = useRef(false); // Usamos un ref para evitar redirecciones múltiples
    // Verificación inicial al cargar
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await verifyTokenRequest()
                if (!res.data) {
                    if (location.pathname.includes('/admin') && !hasRedirected.current) {
                        hasRedirected.current = true;  // Marcamos que ya hemos redirigido
                        setIsAuthenticated(false);
                        setLoading(false);
                        navigate('/cptln/pe/admin/login');
                        return;
                    }
                } else {
                    setIsAuthenticated(true);
                    setUser(res.data);
                }
                setLoading(false);
            } catch (error) {
                console.error('Token verification error:', error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false); // Asegúrate de que la carga se complete
            }
        }
        checkLogin();
    }, [location]);

    return (
        <AuthContext.Provider value={{ user, loginUser, RegisterUser, LogoutUser, isAuthenticated, loading, errorsAuth }} >
            {children}
        </AuthContext.Provider>
    )
}