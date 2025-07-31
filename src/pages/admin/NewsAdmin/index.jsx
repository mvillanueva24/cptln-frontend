import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import Header from "@/pages/client/components/Header";
import "react-quill/dist/quill.snow.css";
import { registrarNoticia, obtenerNoticiaID, EditarNoticia } from "../../../Api/noticias";
import { obtenerProgramas } from "../../../Api/programas";
import { useParams, useNavigate } from "react-router-dom";

const NewsFormComponent = () => {

    const navigate = useNavigate()
    const { id } = useParams();

    const [categorias, setCategorias] = useState([]);
    const [selectcategoria, setSelectcategoria] = useState("");
    const [titulo, setTitulo] = useState("");
    const [cuerpo, setCuerpo] = useState("");
    const [imagenFondo, setImagenFondo] = useState(null);
    const [imagenesAdicionales, setImagenesAdicionales] = useState([]);
    const [fecha, setFecha] = useState("");
    const [error, setError] = useState(""); // Estado para manejar el mensaje de error

    const handleTitulo = (event) => setTitulo(event.target.value);
    const handleCuerpo = (html) => setCuerpo(html);
    const handleImagenFondo = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImagenFondo(file);
            setError("");
        } else {
            setError("Por favor, sube un archivo de imagen válido para la imagen de fondo.");
        }
    };
    const handleImagenesAdicionales = (event) => {
        const files = Array.from(event.target.files);
        const validImages = files.filter((file) => file.type.startsWith('image/'));

        if (validImages.length !== files.length) {
            setError("Por favor, sube solo archivos de imagen.");
        } else {
            setImagenesAdicionales(validImages);
            setError("");
        }
    };
    const handleFecha = (event) => setFecha(event.target.value);

    const enviarNoticia = async (event) => {
        event.preventDefault();
        if (!cuerpo) { // Verifica si 'cuerpo' está vacío
            setError("Por favor, ingresa el contenido de la noticia.");
            return;
        }
        const formData = new FormData();
        formData.append('programa_id', selectcategoria);
        formData.append('titulo', titulo);
        formData.append('cuerpo', cuerpo);
        formData.append('fecha', fecha);
        formData.append('portada', imagenFondo);
        imagenesAdicionales.forEach((file) => {
            formData.append('imagenes', file);
        });
        try {
            const respuesta = await registrarNoticia(formData);
            console.log(respuesta);
            if (respuesta.status === 200) navigate("/admin/tablanews");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fech = async () => {
            const response = await obtenerProgramas();
            setCategorias(response.data);
        };
        fech();
    }, []);

    useEffect(() => {
        if (id) {
            const fetch = async () => {
                const response = await obtenerNoticiaID(id);
                setSelectcategoria(response.data.programa_id);
                setTitulo(response.data.titulo);
                setCuerpo(response.data.cuerpo);
                setFecha(response.data.fecha);
            };
            fetch();
        }
    }, [id]);

    const ModificarNoticia = async (event) => {
        event.preventDefault();
        if (!cuerpo) {
            setError("Por favor, ingresa el contenido de la noticia.");
            return;
        }
        const formData = new FormData();
        formData.append('programa_id', selectcategoria ?? "");
        formData.append('titulo', titulo);
        formData.append('cuerpo', cuerpo);
        formData.append('fecha', fecha);
        formData.append('portada', imagenFondo);
        [...imagenesAdicionales].forEach((file) => {
            formData.append('imagenes', file);
        });
        try {
            const respuesta = await EditarNoticia(id, formData);
            console.log(respuesta);
            if (respuesta.status === 200) navigate("/admin/tablanews");
        } catch (error) {
            console.log(error);
        }
    };

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ],
    };

    return (
        <>
            <div className="max-w-4xl px-5 py-10 mx-auto md:px-8 lg:px-12">
                <h2 className="mb-6 text-4xl font-bold text-center text-gray-800">Escribe la Noticia</h2>
                <form onSubmit={id ? ModificarNoticia : enviarNoticia} className="space-y-6">
                    <input
                        type="text"
                        name="titulo"
                        value={titulo}
                        onChange={handleTitulo}
                        placeholder="Título"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-l_color_y-600"
                        required
                    />
                    <ReactQuill
                        className="bg-white rounded-lg"
                        modules={modules}
                        name="cuerpo"
                        value={cuerpo}
                        onChange={handleCuerpo}
                        placeholder="Contenido de la Noticia"
                    />
                    {error && <p className="text-red-600">{error}</p>} {/* Muestra el mensaje de error */}
                    <div>
                        <label className="block mb-2 text-gray-600">Imagen de fondo</label>
                        <input
                            type="file"
                            name="portada"
                            accept="image/*"
                            onChange={handleImagenFondo}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-l_color_y-600"
                            required={!id} // Solo requerido al agregar (cuando no hay id)
                        />

                    </div>
                    <div>
                        <label className="block mb-2 text-gray-600">Imágenes adicionales (2 o más)</label>
                        <input
                            type="file"
                            name="imagenes"
                            accept="image/*"
                            onChange={handleImagenesAdicionales}
                            multiple
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-l_color_y-600"
                            required={!id} // Solo requerido al agregar (cuando no hay id)
                        />

                    </div>
                    <input
                        type="date"
                        name="fecha"
                        value={fecha}
                        onChange={handleFecha}
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-l_color_y-600"
                        required
                    />
                    <select
                        value={selectcategoria}
                        onChange={(event) => setSelectcategoria(event.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-l_color_y-600"
                         // Asegura que el usuario seleccione una opción válida
                    >
                        <option value="" disabled>Selecciona el programa</option>
                        {Array.isArray(categorias) && categorias.map((programa) => (
                            !programa.enlace && <option value={programa._id} key={programa._id}>{programa.titulo}</option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="w-full px-4 py-3 font-semibold text-white transition duration-200 rounded-lg bg-l_color_y-600 hover:bg-l_color_y-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-l_color_y-600"
                    >
                        {id ? 'Modificar Noticia' : 'Enviar Noticia'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default NewsFormComponent;