import { useEffect, useState } from "react";
import Header from "@/pages/client/components/Header";
import { registrarEbooks, obtenerEbooksID, EditarEbooks } from "../../../Api/ebooks";
import "react-quill/dist/quill.snow.css";
import { useParams, useNavigate } from "react-router-dom";

const EbooksAdmin = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [imagen, setImagen] = useState(null);
    const [titulo, setTitulo] = useState("");
    const [portada, setPortada] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [pdf, setPdf] = useState("");
    const [error, setError] = useState("");
    const [imagenError, setImagenError] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");

    useEffect(() => {
        if (id) {
            const fetch = async () => {
                try {
                    const response = await obtenerEbooksID(id);
                    setTitulo(response.data.titulo);
                    setDescripcion(response.data.descripcion);
                    setPdf(response.data.pdf);
                    setPortada(response.data.portada);
                    setPreviewUrl(response.data.portada); // Set preview with existing image
                } catch (error) {
                    setError("Error al cargar el ebook.");
                }
            };
            fetch();
        }
    }, [id]);

    const handleTitulo = (event) => setTitulo(event.target.value);
    
    const handlePortada = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setPortada(file);
            setPreviewUrl(URL.createObjectURL(file)); // Update preview
            setImagenError("");
        } else {
            setImagenError("Por favor, sube un archivo de imagen válido para la portada.");
        }
    };
    
    const handleDescripcion = (event) => setDescripcion(event.target.value);
    
    const handlePdf = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setPdf(file);
            setError(""); // Limpiar el error si el archivo es válido
        } else {
            setError("Por favor, sube un archivo PDF válido.");
        }
    };


    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            setImagen(file);
            setPreviewUrl(URL.createObjectURL(file)); // Show preview for dropped image
            setImagenError("");
        } else {
            setImagenError("Por favor, sube un archivo de imagen válido.");
        }
    };

    const handleDragOver = (e) => e.preventDefault();

    const clearImage = () => {
        setImagen(null);
        setPreviewUrl("");
        setImagenError("Por favor, agrega una imagen.");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!id) {
            if (!imagen && !portada) {
                setImagenError("Por favor, agrega una imagen.");
                return;
            }
            if (!pdf) {
                setError("Por favor, sube un archivo PDF válido.");
                return;
            }
        }
        if (error || imagenError) return;

        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("descripcion", descripcion);
        formData.append("portada", imagen || portada);
        formData.append("pdf", pdf);

        try {
            const respuesta = id ? await EditarEbooks(id, formData) : await registrarEbooks(formData);
            if (respuesta.status === 200) navigate("/admin/tablaebooks");
        } catch (error) {
            setError("Error al registrar el ebook.");
        }
    };

    return (
        <>
            <div className="max-w-4xl px-5 py-10 mx-auto md:px-8 lg:px-12">
                <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">{id ? "Editar Ebook" : "Agregar un nuevo Ebook"}</h2>
                {error && <p className="text-center text-red-500">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4 md:flex md:space-x-6 md:space-y-0">
                        <input
                            type="text"
                            name="title"
                            value={titulo}
                            onChange={handleTitulo}
                            placeholder="Título"
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-l_color_y-600"
                            required
                        />
                    </div>
                    <textarea
                        name="descripcion"
                        value={descripcion}
                        onChange={handleDescripcion}
                        placeholder="Descripción"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-l_color_y-600"
                        required
                    />
                    <div className="space-y-4 md:flex md:space-x-6 md:space-y-0">
                        <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            className="flex flex-col items-center justify-center p-4 mb-4 border-2 border-gray-400 border-dashed"
                        >
                            {previewUrl ? (
                                <img src={previewUrl} alt="Imagen subida" className="object-cover w-full h-32" />
                            ) : (
                                <p>Arrastra y suelta una imagen aquí</p>
                            )}
                            <button
                                type="button"
                                onClick={clearImage}
                                className="mt-2 text-sm font-semibold text-red-600 hover:underline"
                            >
                                Eliminar imagen
                            </button>
                            {imagenError && <p className="text-red-600">{imagenError}</p>}
                        </div>
                        <div>
                            <label className="block mb-2 text-gray-600">PDF a subir</label>
                            <input
                                type="file"
                                name="pdf"
                                accept="application/pdf" // Aceptar solo archivos PDF
                                onChange={handlePdf}
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-l_color_y-600"
                            />

                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-3 font-semibold text-white transition duration-200 rounded-lg bg-l_color_y-600 hover:bg-l_color_y-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-l_color_y-600"
                    >
                        {id ? 'Modificar Ebook' : 'Agregar Ebook'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default EbooksAdmin;
