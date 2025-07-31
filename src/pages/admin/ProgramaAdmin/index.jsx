import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import Header from "@/pages/client/components/Header";
import "react-quill/dist/quill.snow.css";
import { crearPrograma, editarPrograma, buscarProgramaAdmin } from "../../../Api/programas";
import { useParams,useNavigate } from "react-router-dom";
import { obtenerCategorias } from "../../../Api/categorias";

const ProgramaAdmin = () => {

    // Obtener el parametro ID
    const { id } = useParams()
    const navigate = useNavigate();
    // Guardar datos del formulario
    const [titulo, setTitulo] = useState("");
    const [selectcategoria, setSelectcategoria] = useState(null);
    const [abreviatura, setAbreviatura] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagenesAdicionales, setImagenesAdicionales] = useState([]);
    const [color, setColor] = useState("#47797A");
    const [enlace, setEnlace] = useState(null);
    const [portada, setPortada] = useState([])
    const [showPortada, setShowPortada] = useState(null)

    // Guardar categorias para el select option
    const [categorias, setCategorias] = useState([]);

    // Modificar valores del formulario
    const handleTitulo = (event) => setTitulo(event.target.value);
    const handleAbreviatura = (event) => setAbreviatura(event.target.value);
    const handleDescripcion = (html) => setDescripcion(html);
    const handleColor = (event) => setColor(event.target.value);
    const handleEnlace = (event) => setEnlace(event.target.value);
    const handleImagenesAdicionales = (event) => {
        setImagenesAdicionales(event.target.files);
    };
    const handlePortada = (event) => setPortada(event.target.files)

    // Intercambiar entre datos o agregar un enlace
    const [panelEnlaceDatos, setPanelEnlaceDatos] = useState(false)
    const handlePanelEnlaceDatos = () => {
        setPanelEnlaceDatos(!panelEnlaceDatos)
    }

    const [imagenNew, setImagenNew] = useState(false)
    const handleImagenNew = () => {
        setImagenNew(!imagenNew)
    }


    //Colores
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

    // Traer las categorias para el formulario
    useEffect(() => {
        const fech = async () => {
            const response = await obtenerCategorias()
            setCategorias(response.data)
        }
        fech()
    }, [])

    // Verificar si hay un ID en los parametros
    useEffect(() => {
        if (id) {
            const fetch = async () => {
                const response = await buscarProgramaAdmin(id)
                setSelectcategoria(response.data.categoria_id)
                setTitulo(response.data.titulo)
                setDescripcion(response.data.descripcion)
                setAbreviatura(response.data.abreviatura)
                setColor(response.data.color)
                setEnlace(response.data.enlace)
                
                if (response.data.enlace === null) {
                    setPanelEnlaceDatos(true)
                } else {
                    setPanelEnlaceDatos(false)
                }
            }
            fetch()
        }
    }, [])

    // Crear Programa
    const enviarPrograma = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('titulo', titulo.trim().replace(/\s+/g, ' '));
            formData.append('descripcion', descripcion);
            formData.append('color', color);
            formData.append('abreviatura', abreviatura);
            formData.append('categoria_id', selectcategoria || "");
            if (panelEnlaceDatos) {
                [...imagenesAdicionales].forEach((file) => {
                    formData.append('imagenes', file || ""); // Todos los archivos bajo el mismo nombre 'imagenes'
                });
            } else {
                formData.append('enlace', enlace || "");
                [...portada].forEach((file) => {
                    formData.append('imagenesEnlace', file || ""); // Todos los archivos bajo el mismo nombre 'imagenes'
                })
            }
            const respuesta = await crearPrograma(formData);
            console.log(respuesta);
            if (respuesta.status === 200) navigate("/admin/tablaprogramas");
        } catch (error) {
            console.log(error);
        }
    };

    // Modificar Programa
    const ModificarProgramas = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('titulo', titulo.trim().replace(/\s+/g, ' '));
            formData.append('descripcion', descripcion);
            formData.append('abreviatura', abreviatura);
            formData.append('color', color);
            formData.append('categoria_id', selectcategoria || "");
            if (panelEnlaceDatos) {
                [...imagenesAdicionales].forEach((file) => {
                    formData.append('imagenes', file); // Todos los archivos bajo el mismo nombre 'imagenes'
                });
            } else {
                formData.append('enlace', enlace || "");
                [...portada].forEach((file) => {
                    formData.append('imagenesEnlace', file || ""); // Todos los archivos bajo el mismo nombre 'imagenes'
                })
            }
            const respuesta = await editarPrograma(id, formData);
            console.log(respuesta);
            if (respuesta.status === 200) navigate("/admin/tablaprogramas");
        } catch (error) {
            console.log(error);
        }
    }

    // Configuracion de ReactQuill
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ],
    };

    return (
        <>
            <div className="max-w-4xl px-5 py-10 mx-auto md:px-8 lg:px-12">

                <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">Escribe el Programa</h2>
                <form onSubmit={id ? ModificarProgramas : enviarPrograma} className="space-y-6">
                    <input
                        type="text"
                        name="titulo"
                        value={titulo}
                        onChange={handleTitulo}
                        placeholder="TÃ­tulo"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-l_color_y-600"
                    />
                    <input
                        type="text"
                        name="abreviatura"
                        value={abreviatura}
                        onChange={handleAbreviatura}
                        placeholder="Abreviatura"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-l_color_y-600"
                    />

                    <ReactQuill
                        className="bg-white rounded-lg"
                        modules={modules}
                        name="descripcion"
                        value={descripcion}
                        onChange={handleDescripcion}
                        placeholder="Descripcion del Programa"
                    />

                    <div className="flex flex-col">
                        <label htmlFor="">Seleccione una categoria</label>
                        <select className="p-4"
                            value={selectcategoria}
                            onChange={(event) => setSelectcategoria(event.target.value)}
                        >
                            <option value={""}>Sin categoria</option>
                            {Array.isArray(categorias) && categorias.map((categoria) => (
                                <option key={categoria._id} value={categoria._id}>{categoria.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-4 gap-4 lg:grid-cols-6">
                        {colorOptions.map((option) => (
                            <label key={option.value} className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="color"
                                    value={option.value}
                                    checked={color === option.value}
                                    onChange={handleColor}
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

                    <div className="grid grid-cols-2">
                        <button onClick={handlePanelEnlaceDatos}
                            className={`transition-all duration-200 ease-in p-3  ${panelEnlaceDatos ? 'bg-gray-100 shadow-gray-400 shadow-inner' : 'bg-gray-300'}`} disabled={panelEnlaceDatos ? true : false}>
                            Datos
                        </button>
                        <button onClick={handlePanelEnlaceDatos}
                            className={`transition-all duration-200 ease-in p-3 ${panelEnlaceDatos ? 'bg-gray-300' : 'bg-gray-100 shadow-gray-400 shadow-inner'}`} disabled={panelEnlaceDatos ? false : true}>
                            Enlace
                        </button>
                    </div>

                    <div className="p-2 border border-gray-300">

                        {panelEnlaceDatos ?
                            (
                                <>
                                    <div className={`space-y-10 transition-all duration-200 ${panelEnlaceDatos ? 'opacity-100' : 'opacity-0'}`}>
                                        <div className="flex">
                                            <div>
                                                <label className="block mb-2 text-gray-600">Imagenes adicionales (2 o mas)</label>
                                                <input
                                                    type="file"
                                                    name="imagenes"
                                                    onChange={handleImagenesAdicionales}
                                                    multiple // Permite seleccionar mÃºltiples imÃ¡genes
                                                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-l_color_y-600"
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </>
                            )
                            :
                            (
                                <>
                                    <div className={`flex flex-col space-y-5 transition-all duration-200 ${panelEnlaceDatos ? 'opacity-0' : 'opacity-100'}`}>
                                        <div>
                                            <label className="block mb-2 text-gray-600">URL</label>
                                            <input type="text"
                                                value={enlace}
                                                onChange={handleEnlace}
                                                placeholder="AÃ±adir url"
                                                className="w-full p-4 border border-gray-300 rounded-md placeholder:italic"
                                            />
                                        </div>
                                        <div>
                                            {(id) ?
                                                (showPortada != null ? (
                                                    <>
                                                        <div className="flex w-full space-x-5">
                                                            {imagenNew ? (
                                                                <>
                                                                    <div className="flex w-1/2">
                                                                        <input
                                                                            type="file"
                                                                            onChange={handlePortada}
                                                                            multiple
                                                                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-l_color_y-600"
                                                                        />
                                                                    </div>
                                                                    <div className="flex items-center justify-center w-1/2">
                                                                        <button className="flex p-4 bg-red-500 rounded-md" onClick={handleImagenNew}>
                                                                            Cancelar
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div className="flex w-1/2">
                                                                        <img src={showPortada} alt="" />
                                                                    </div>
                                                                    <div className="flex items-center justify-center w-1/2">
                                                                        <button className="flex p-4 bg-yellow-500 rounded-md" onClick={handleImagenNew}>
                                                                            Cambiar
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </>
                                                )
                                                    :
                                                    (
                                                        <>
                                                            <label className="block mb-2 text-gray-600">Portada</label>
                                                            <input
                                                                type="file"
                                                                onChange={handlePortada}
                                                                multiple
                                                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-l_color_y-600"
                                                            />
                                                        </>
                                                    )
                                                )
                                                :
                                                (
                                                    <>
                                                        <label className="block mb-2 text-gray-600">Imagen</label>
                                                        <input
                                                            type="file"
                                                            onChange={handlePortada}
                                                            multiple
                                                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-l_color_y-600"
                                                        />
                                                    </>

                                                )
                                            }
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </div>


                    <button
                        type="submit"
                        className="w-full px-4 py-3 font-semibold text-white transition duration-200 rounded-lg bg-l_color_y-600 hover:bg-l_color_y-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-l_color_y-600"
                    >
                        {id ? 'Modificar Programa' : 'Enviar Programa'}
                    </button>

                </form>
            </div>
        </>
    );
};

export default ProgramaAdmin;
