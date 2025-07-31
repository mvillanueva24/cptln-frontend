import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { obtenerDatosDeRadioAdmin, actualizarDatosDeRadio } from "../../../Api/radio";
import { useNavigate } from "react-router-dom";

const RadioAdmin = () => {

    // React Router
    const navigate = useNavigate()

    // Formulario
    const [id, setID] = useState(null)
    const [nombre, setNombre] = useState(null)
    const [descripcion, setDescripcion] = useState(null)
    const [imagenesExtra, setImagenesExtra] = useState([])
    const [video, setVideo] = useState(null)
    const handleNombre = (e) => setNombre(e.target.value)
    const handleDescripcion = (html) => setDescripcion(html)
    const handleID = (value) => setID(value)
    const handleImagenesExtra = (event) => setImagenesExtra(event.target.files)
    const handleVideo = (event) => setVideo(event.target.files[0])

    // Recuperar Datos
    useEffect(() => {
        const fetch = async () => {
            const res = await obtenerDatosDeRadioAdmin()
            if (res.data._id) {
                setID(res.data._id)
            }
            if (res.data.nombre) {
                setNombre(res.data.nombre)
            }
            if (res.data.descripcion) {
                setDescripcion(res.data.descripcion)
            }
        }
        fetch()
    }, [])

    // Guardar Cambios
    const guardarDatosDeRadio = async (event) => {
        event.preventDefault();
        const formData = new FormData()
        formData.append('nombre', nombre)
        if (id) formData.append('id', id);
        if (descripcion) formData.append('descripcion', descripcion);
        if (imagenesExtra.length > 0) {
            [...imagenesExtra].forEach((file) => { formData.append('imagenes', file) });
        }
        if(video) {
            formData.append('video', video)
        }
        try {
            const res = await actualizarDatosDeRadio(formData)
            alert("Datos actualizados correctamente")

        } catch (error) {
            console.log(error);
        }
    }

    // React Quill Modulos
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
        ],
    };

    return (
        <div className="flex justify-center mt-10 mx-5">  
            <div className="flex flex-col max-w-5xl pt-10 w-full">
                <h2 className="mb-6 text-3xl font-bold text-start text-gray-800">Configuracion de la radio</h2>
                <form onSubmit={guardarDatosDeRadio} className="space-y-6">
                    <input
                        type="text"
                        name="Nombre de la estacion"
                        value={nombre}
                        onChange={handleNombre}
                        placeholder="TÃ­tulo"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-l_color_y-600"
                    />

                    <ReactQuill
                        className="bg-white rounded-lg"
                        value={descripcion}
                        modules={modules}
                        name="descripcion"
                        onChange={handleDescripcion}
                        placeholder="Descripcion del Programa"
                    />

                    <div className="grid grid-cols-2">
                        <div className="flex flex-col w-full justify-center">
                            <label htmlFor="">Imagenes Extra</label>
                            <input type="file" onChange={handleImagenesExtra} multiple />
                        </div>
                        <div className="flex flex-col w-full justify-center">
                            <label htmlFor="">Video Home</label>
                            <input type="file" onChange={handleVideo} multiple />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 pt-10 gap-x-10">
                        <button 
                        type="button"
                            className="transition duration-200 bg-yellow-500 rounded-md hover:bg-yellow-600"
                            onClick={() => navigate(`tablasecciones`)}>
                            Modificar Secciones
                        </button>

                        <button
                            type="submit"
                            className="w-full px-4 py-3 font-semibold text-white transition duration-200 rounded-lg bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-l_color_y-600">
                            Guardar Cambios
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default RadioAdmin