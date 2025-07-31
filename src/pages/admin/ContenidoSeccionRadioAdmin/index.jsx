import { useEffect, useState } from "react";
import { obtenerSeccionCotenido, agregarSeccionContenido, modificarSeccionContenido } from "../../../Api/radio";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ContenidoSeccionRadioAdmin = () => {
    const { idseccion, idcontenido } = useParams();
    const navigate = useNavigate();

    const [descripcion, setDescripcion] = useState("");
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); // Estado para manejar mensajes de error

    const handleDescripcion = (html) => setDescripcion(html);

    const handleMedia = (event) => {
        const archivosSeleccionados = Array.from(event.target.files);
        setMedia(archivosSeleccionados);
    };

    useEffect(() => {
        if (idseccion && idcontenido) {
            const fetch = async () => {
                const response = await obtenerSeccionCotenido(idseccion, idcontenido);
                setDescripcion(response.data.descripcion);
            };
            fetch();
        }
    }, [idseccion, idcontenido]);

    const uploadFiles = async (formData) => {
        try {
            const response = await agregarSeccionContenido(idseccion, formData);
            if (response.status === 200) {
                navigate(`/admin/radioconfig/tablasecciones/${idseccion}/tablacontenidoseccion`);
            }
            console.log(response);
        } catch (error) {
            console.error("Error al cargar los archivos:", error);
        } finally {
            setLoading(false);
        }
    };

    const agregarSeccionNueva = async (event) => {
        event.preventDefault();
        if (!descripcion.trim()) { // Verifica si 'descripcion' está vacío
            setError("Por favor, ingresa una descripción.");
            return;
        }
        setLoading(true);
        setError(""); // Resetea el error si existe una descripción válida

        const formData = new FormData();
        formData.append('descripcion', descripcion.trim().replace(/\s+/g, ' '));
        if (media.length > 0) {
            [...media].forEach((file) => formData.append('media', file));
        }
        await uploadFiles(formData);
    };

    const modificarSeccionExistente = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append('descripcion', descripcion.trim().replace(/\s+/g, ' '));
        if (media.length > 0) {
            [...media].forEach((file) => formData.append('media', file));
        }
    
        try {
            const response = await modificarSeccionContenido(idseccion, idcontenido, formData);
            if (response.status === 200) {
                navigate(`/admin/radioconfig/tablasecciones/${idseccion}/tablacontenidoseccion`);
            }
            console.log(response);
        } catch (error) {
            console.error("Error al modificar el contenido:", error);
        } finally {
            setLoading(false);
        }
    };

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ],
    };

    return (
        <div className="max-w-4xl px-5 py-10 mx-auto md:px-8 lg:px-12">
            <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
                {(idseccion && idcontenido) ? "Datos Actuales" : "Nuevo Contenido"}
            </h2>
            <form onSubmit={(idseccion && idcontenido) ? modificarSeccionExistente : agregarSeccionNueva} className="space-y-6">
                
                <ReactQuill
                    className="bg-white rounded-lg"
                    modules={modules}
                    name="cuerpo"
                    value={descripcion}
                    onChange={handleDescripcion}
                    placeholder="Contenido de la Noticia"
                />
                
                {error && <p className="text-red-500">{error}</p>} {/* Mostrar mensaje de error si existe */}
                
                <div>
                    <input
                        type="file"
                        name="media"
                        onChange={handleMedia}
                        multiple
                        required={!idcontenido}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-3 font-semibold text-white transition duration-200 rounded-lg bg-l_color_y-600 hover:bg-l_color_y-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-l_color_y-600"
                >
                    {(idseccion && idcontenido) ? "Guardar Cambios" : "Agregar Contenido"}
                </button>
            </form>
        </div>
    );
};

export default ContenidoSeccionRadioAdmin;