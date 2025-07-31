import React, { useEffect, useState } from "react";
import Header from "@/pages/client/components/Header";
import "react-quill/dist/quill.snow.css";
import { obtenerCategoriasIDAdmin, registrarCategoria, EditarCategorias } from "../../../Api/categorias";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";

const CategoriaAdmin = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [color, setColor] = useState("#47797A");
    const [imagenes, setImagenes] = useState([]);
    const [imagenesResponse, setImagenesResponse] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [error, setError] = useState("");
    const [colorError, setColorError] = useState("");
    const [imagenError, setImagenError] = useState("");

    const handleNombre = (event) => setNombre(event.target.value);
    const handleColor = (color) => {
        setColor(color);
        setColorError("");
    };

    const handleDescripcion = (html) => setDescripcion(html);

    // Manejo de arrastrar y soltar imágenes
    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        const imageFiles = files.filter(file => file.type.startsWith("image/"));
        setImagenes((prev) => [...prev, ...imageFiles]);
        setImagenError("");  // Elimina el mensaje de error cuando se agregan imágenes
    };

    const handleDragOver = (e) => e.preventDefault();

    // Botón para limpiar las imágenes seleccionadas
    const clearImages = () => {
        setImagenes([]);
        setImagenError("Por favor, agrega al menos una imagen.");
    };

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const response = await obtenerCategoriasIDAdmin(id);
                setNombre(response.data.nombre);
                setDescripcion(response.data.descripcion);
                setColor(response.data.color);
                setImagenesResponse(response.data.imagenes);
                const estadoIndex = response.data.imagenes.findIndex((imagen) => imagen.estado === true);
                setSelectedOption(estadoIndex);
            };
            fetchData();
        }
    }, [id]);

    const enviarCategoria = async (event) => {
        event.preventDefault();
        if (!descripcion) {
            setError("Por favor, ingresa el contenido de característica.");
            return;
        }
        if (!color) {
            setColorError("Por favor, selecciona un color.");
            return;
        }
        if (imagenes.length === 0 && (!imagenesResponse || imagenesResponse.length === 0)) {
            setImagenError("Por favor, agrega al menos una imagen.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("nombre", nombre.trim().replace(/\s+/g, " "));
            formData.append("descripcion", descripcion);
            formData.append("color", color);
            [...imagenes].forEach((file) => formData.append("imagenes", file));
            const respuesta = await registrarCategoria(formData);
            if (respuesta.status === 200) navigate("/admin/tablacategoria");
        } catch (error) {
            console.error(error);
        }
    };

    const ModificarCategoria = async (event) => {
        event.preventDefault();
        if (!descripcion) {
            setError("Por favor, ingresa el contenido de característica.");
            return;
        }
        if (!color) {
            setColorError("Por favor, selecciona un color.");
            return;
        }
        if (imagenes.length === 0 && (!imagenesResponse || imagenesResponse.length === 0)) {
            setImagenError("Por favor, agrega al menos una imagen.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("nombre", nombre);
            formData.append("descripcion", descripcion);
            formData.append("color", color);
            [...imagenes].forEach((file) => formData.append("imagenes", file));
            const respuesta = await EditarCategorias(id, formData);
            if (respuesta.status === 200) navigate("/admin/tablacategoria");
        } catch (error) {
            console.error(error);
        }
    };

    const modules = {
        toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
        ],
    };

    const colorOptions = [
        { name: "Color 1", value: "#47797A" },
        { name: "Color 2", value: "#3C5050" },
        { name: "Color 3", value: "#A7A692" },
        { name: "Color 4", value: "#9D1A2E" },
        { name: "Color 5", value: "#742732" },
        { name: "Color 6", value: "#791524" },
        { name: "Color 7", value: "#CD612D" },
        { name: "Color 8", value: "#d78157" },
        { name: "Color 9", value: "#A25F3B" },
        { name: "Color 10", value: "#BBB237" },
        { name: "Color 11", value: "#908A42" },
        { name: "Color 12", value: "#65633F" },
    ];

    return (
        <>
            <div className="max-w-4xl px-5 py-10 lg:w-[1000px] w-[500px] m-auto md:px-8 lg:px-12">
                <h2 className="mb-6 text-4xl font-bold text-center text-gray-800">Escribe la Categoria</h2>
                <form onSubmit={id ? ModificarCategoria : enviarCategoria} className="space-y-8">
                    <div>
                        <label className="block font-semibold text-gray-700">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={nombre}
                            onChange={handleNombre}
                            placeholder="Nombre"
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-l_color_y-600"
                            required
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="block font-semibold text-gray-700">Descripción</label>
                        <ReactQuill
                            className="bg-white rounded-lg"
                            modules={modules}
                            name="descripcion"
                            value={descripcion}
                            onChange={handleDescripcion}
                            placeholder="Escribe la descripción"
                        />
                        {error && <p className="text-red-600">{error}</p>}
                    </div>

                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        className="flex flex-col items-center justify-center p-4 mb-4 border-2 border-gray-400 border-dashed"
                    >
                        {imagenes.length > 0 ? (
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                {imagenes.map((imagen, index) => (
                                    <img key={index} src={URL.createObjectURL(imagen)} alt={`Imagen ${index + 1}`} className="object-cover w-full h-32" />
                                ))}
                            </div>
                        ) : (
                            <p>Arrastra y suelta imágenes aquí</p>
                        )}
                        <button
                            type="button"
                            onClick={clearImages}
                            className="mt-2 text-sm font-semibold text-red-600 hover:underline"
                        >
                            Eliminar imágenes
                        </button>
                        {imagenError && <p className="text-red-600">{imagenError}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="block font-semibold text-gray-700">Selecciona un Color</label>
                        <div className="grid grid-cols-4 lg:grid-cols-6 gap-4">
                            {colorOptions.map((option) => (
                                <label key={option.value} className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="color"
                                        value={option.value}
                                        checked={color === option.value}
                                        onChange={() => handleColor(option.value)}
                                        className="hidden"
                                    />
                                    <span
                                        className={`w-10 h-10 rounded-full border-2 ${color === option.value ? "border-black" : "border-gray-300"}`}
                                        style={{ backgroundColor: option.value }}
                                    ></span>
                                    <span className="ml-2">{option.name}</span>
                                </label>
                            ))}
                        </div>
                        {colorError && <p className="text-red-600">{colorError}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-3 font-semibold text-white transition duration-200 rounded-lg bg-l_color_y-600 hover:bg-l_color_y-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-l_color_y-600"
                    >
                        {id ? "Modificar Categoria" : "Enviar Categoria"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default CategoriaAdmin;
