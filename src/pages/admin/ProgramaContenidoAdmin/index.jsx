import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import Header from "@/pages/client/components/Header";
import "react-quill/dist/quill.snow.css";
import { buscarProgramaContenido, editarProgramaContenido, crearContenidoPrograma } from "../../../Api/programas";
import { useParams, useNavigate } from "react-router-dom";

const ProgramaContenidoAdmin = () => {

    // Obtener el parametro ID
    const { idprograma, id } = useParams()
    const navigate = useNavigate();

    // Guardar datos del formulario
    const [subtitulo, setSubtitulo] = useState("");
    const [parrafo, setParrafo] = useState("");
    const [imagen, setImagen] = useState([]);

    // Modificar valores del formulario
    const handleSubtitulo = (event) => setSubtitulo(event.target.value);
    const handleParrafo = (html) => setParrafo(html);
    const handleImagen = (event) => setImagen(event.target.files[0])

    // Verificadores
    const [imagenNew, setImagenNew] = useState(false)
    const handleImagenNew = () => setImagenNew(!imagenNew)

    // Verificar si hay un ID en los parametros
    useEffect(() => {
        if (id && idprograma) {
            const fetch = async () => {
                const response = await buscarProgramaContenido(idprograma, id)
                setSubtitulo(response.data.subtitulo)
                setParrafo(response.data.parrafo)
                setImagen(response.data.imagen)
                if (response.data.imagen == null) {
                    setImagenNew(true)
                }
            }
            fetch()
        }
    }, [])

   // Crear Programa
const crearContenido = async (event) => {
    event.preventDefault();
    try {
        const formData = new FormData();
        formData.append('subtitulo', subtitulo.trim().replace(/\s+/g, ' '));
        formData.append('parrafo', parrafo);
        formData.append('imagen', imagen);
        const res = await crearContenidoPrograma(id, formData);
        console.log(res);
        // Aquí cambia response por res
        if (res.status === 200) {
            navigate(`/admin/tablaprogramas/${id}/tablacontenido`);
        }
    } catch (error) {
        console.log(error);
    }
};


    // Modificar Programa
    const ModificarProgramas = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('subtitulo', subtitulo.trim().replace(/\s+/g, ' '));
            formData.append('parrafo', parrafo);
            if (imagenNew) {
                formData.append('imagen', imagen);
            }
            const respuesta = await editarProgramaContenido(idprograma, id, formData);
            console.log(respuesta);
            // Aquí cambia response por respuesta
            if (respuesta.status === 200) {
                navigate(`/admin/tablaprogramas/${idprograma}/tablacontenido`);
            }
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
                <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">Añada un contenido para el programa</h2>
                <form onSubmit={(id && idprograma) ? ModificarProgramas : crearContenido} className="space-y-6">
                    <input
                        type="text"
                        value={subtitulo}
                        onChange={handleSubtitulo}
                        placeholder="Subtitulo"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-l_color_y-600"
                    />

                    <ReactQuill
                        className="bg-white rounded-lg"
                        modules={modules}
                        value={parrafo}
                        onChange={handleParrafo}
                        placeholder="Escriba el contenido"
                    />


                    {(id && idprograma) ?
                        (
                            imagenNew ?
                                (
                                    <>
                                        <label className="block mb-2 text-gray-600">Imagen</label>
                                        <div className="flex space-x-5">
                                            <div className={`flex flex-col ${imagen ? 'w-2/3' : 'w-full'} `}>
                                                <input
                                                    type="file"
                                                    onChange={handleImagen}
                                                    multiple // Permite seleccionar múltiples imágenes
                                                    accept="image/*" // Solo permite seleccionar archivos de imagen
                                                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-l_color_y-600"
                                                />

                                            </div>
                                            {imagen && (
                                                <div className="flex items-center justify-center w-1/3">
                                                    <button
                                                        onClick={handleImagenNew}
                                                        className={`rounded-md p-4 ${imagenNew ? 'bg-red-500' : 'bg-yellow-500'}`}>
                                                        {imagenNew ? 'Cancelar' : 'Cambiar Imagen'}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <div className="flex">
                                            <img src={imagen} alt="" className="flex w-1/2" />
                                            <div className="flex items-center justify-center w-1/2">
                                                <button
                                                    onClick={handleImagenNew}
                                                    className={`flex  rounded-md p-4 ${imagenNew ? 'bg-red-500' : 'bg-yellow-500'}`}>
                                                    {imagenNew ? 'Cancelar' : 'Cambiar Imagen'}
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )
                        )
                        :
                        (
                            <>
                                <label className="block mb-2 text-gray-600">Imagen</label>
                                <input
                                    type="file"
                                    onChange={handleImagen}
                                    multiple // Permite seleccionar múltiples imágenes
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-l_color_y-600"
                                />
                            </>
                        )
                    }

                    <button
                        type="submit"
                        className="w-full px-4 py-3 font-semibold text-white transition duration-200 rounded-lg bg-l_color_y-600 hover:bg-l_color_y-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-l_color_y-600"
                    >
                        {(id && idprograma) ? 'Modificar Contenido' : 'Crear Contenido'}
                    </button>

                </form>
            </div>
        </>
    );
};

export default ProgramaContenidoAdmin;