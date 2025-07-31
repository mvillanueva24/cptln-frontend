import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { agregarSeccion, modificarSeccion, obtenerSeccion } from "../../../Api/radio";


const SeccionRadioAdmin = () => {

    // Obtener el parametro ID
    const { idseccion } = useParams()
    const navigate = useNavigate();

    // Guardar datos del formulario
    const [nombre, setNombre] = useState("");
    const handleNombre = (event) => setNombre(event.target.value);


    // Obtener Datos de la Seccion
    useEffect(() => {
        if (idseccion) {
            const fetch = async () => {
                const response = await obtenerSeccion(idseccion)
                setNombre(response.data.nombre)
            }
            fetch()
        }
    }, [])

    // Agregar Seccion
    const agregarSeccionNueva = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('nombre', nombre.trim().replace(/\s+/g, ' '));
    
        try {
            const response = await agregarSeccion(formData);
            console.log(response);
            
            // Verificar la respuesta correctamente
            if (response.status === 200) {
                navigate("/admin/radioconfig/tablasecciones");
            }
        } catch (error) {
            console.log(error);
        }
    }
    

    // Modificar Seccion
    const modificarSeccionExistente = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('nombre', nombre.trim().replace(/\s+/g, ' '));
    
        try {
            const response = await modificarSeccion(idseccion, formData);
            console.log(response);
    
            // Verificar la respuesta correctamente
            if (response.status === 200) {
                // Redirigir después de la modificación exitosa
                navigate("/admin/radioconfig/tablasecciones");
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <>
            <div className="max-w-4xl px-5 py-10 mx-auto md:px-8 lg:px-12">
                <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">{idseccion ? `Datos Actuales` : 'Nueva Seccion'}</h2>
                <form onSubmit={idseccion ? modificarSeccionExistente : agregarSeccionNueva} className="space-y-6">
                    <input
                        type="text"
                        name="titulo"
                        value={nombre}
                        onChange={handleNombre}
                        placeholder="Titulo"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-l_color_y-600"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full px-4 py-3 font-semibold text-white transition duration-200 rounded-lg bg-l_color_y-600 hover:bg-l_color_y-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-l_color_y-600">
                        {idseccion ? 'Guardar Cambios' : 'Agregar Seccion'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default SeccionRadioAdmin;