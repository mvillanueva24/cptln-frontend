import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { registrarDevo, obtenerDevocionalIDAdmin, EditarDevocional } from "../../../Api/devocionales";
import "react-quill/dist/quill.snow.css";
import { useParams, useNavigate } from "react-router-dom";
import AudioPlayer from "../../client/components/AudioPlayer";
import { useRef } from "react";

const DevocionalesAdmin = () => {

    //const navigate = useNavigate()
    const navigate = useNavigate();
    const { id } = useParams();

    const [imagenurl, setImagenurl] = useState('');
    const [audiourl, setAudiourl] = useState('');

    const [imagen, setImagen] = useState("");
    const [audio, setAudio] = useState("");
    const [titulo, setTitulo] = useState("");
    const [versiculo, setVersiculo] = useState("");
    const [parrafo, setParrafo] = useState("");
    const [fecha, setFecha] = useState("");
    const [error, setError] = useState("");
    const [errorFecha, setErrorFecha] = useState("");

    const handleImagen = (event) => setImagen(event.target.files[0]);
    const handleAudio = (event) => {
        setAudio(event.target.files[0]); // Guarda el nuevo archivo de audio
        setAudiourl(URL.createObjectURL(event.target.files[0])); // Carga el nuevo audio en el reproductor
    };
    const handleTitulo = (event) => setTitulo(event.target.value);
    const handleVersiculo = (event) => setVersiculo(event.target.value);
    const handleParrafo = (html) => setParrafo(html);
    const handleFecha = (event) => setFecha(event.target.value);


    useEffect(() => {
        console.log(id)
        if (id) {
            const fetch = async () => {
                const response = await obtenerDevocionalIDAdmin(id);
                setTitulo(response.data.titulo);
                setVersiculo(response.data.versiculo);
                setFecha(response.data.fecha);
                setParrafo(response.data.parrafo);
                setImagenurl(response.data.imagenURL);
                setAudiourl(response.data.audioURL); // Carga el audio existente
            };
            fetch();
        }
    }, [id])

    useEffect(() => {
        console.log(imagen)
    }, [imagen])

    const subirdevo = async (event) => {
        event.preventDefault();
        if (!parrafo) {
            setError("Por favor, ingresa el contenido de devocional.");
            return;
        }
        const formData = new FormData();

        // Agregar solo si existen
        if (imagen) formData.append('imagen', imagen);
        if (audio) formData.append('audio', audio);

        formData.append('titulo', titulo);
        formData.append('versiculo', versiculo);
        formData.append('parrafo', parrafo);
        formData.append('fecha', fecha);

        try {
            const respuesta = await registrarDevo(formData);
            console.log(respuesta);
            if (respuesta.status === 200) navigate("/admin/tabladevocional");
        } catch (error) {
            console.log(error);
            setErrorFecha(error.response.data.error.fecha);
        }
    };

    const ModificarDevocional = async (event) => {
        event.preventDefault();
        if (!parrafo) {
            setError("Por favor, ingresa el contenido de devocional.");
            return;
        }
        const formData = new FormData();
        if (imagen) formData.append('imagen', imagen);
        if (audio) formData.append('audio', audio);
        formData.append('titulo', titulo);
        formData.append('versiculo', versiculo);
        formData.append('parrafo', parrafo);
        formData.append('fecha', fecha);

        try {
            const respuesta = await EditarDevocional(id, formData);
            if (respuesta.status === 200) {
                window.location.href = "/admin/tabladevocional";
            }
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
                <h2 className="mb-6 text-4xl font-bold text-center text-gray-800">Escribe el Devocional</h2>
                <form onSubmit={id ? ModificarDevocional : subirdevo} className="space-y-6">
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
                        <div className="w-full relative">

                            <input
                                type="date"
                                name="fecha"
                                value={fecha}
                                onChange={handleFecha}
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-l_color_y-600"
                                required
                            />
                            <span className="text-red-600 italic absolute left-0 top-full">{errorFecha}</span>
                        </div>
                    </div>
                    <input
                        type="text"
                        name="versiculo"
                        value={versiculo}
                        onChange={handleVersiculo}
                        placeholder="Versículo"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-l_color_y-600"
                        required
                    />
                    <ReactQuill
                        className="bg-white rounded-lg"
                        modules={modules}
                        name="parrafo"
                        value={parrafo}
                        onChange={handleParrafo}
                        placeholder="Contenido del Devocional"
                    />
                    {error && <p className="text-red-600">{error}</p>}
                    <div className="space-y-4 md:space-x-6 md:space-y-0 grid grid-cols-2">
                        <div>
                            <label className="block mb-2 text-gray-600">Imágene para Devocional</label>
                            {id && (
                                <img src={imagenurl} alt="imagendevocional" />
                            )}
                            <input
                                type="file"
                                name="imagen"
                                accept="image/*"
                                onChange={handleImagen}
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-l_color_y-600"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-gray-600">Audio para Devocional</label>
                                {id && audiourl && (
                                    <div className="flex items-center mt-6 space-x-4">
                                        <AudioPlayer audio={audiourl} />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    name="audio"
                                    onChange={handleAudio}
                                    accept="audio/*, video/mp4"
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-l_color_y-600"
                                />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-3 font-semibold text-white transition duration-200 rounded-lg bg-l_color_y-600 hover:bg-l_color_y-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-l_color_y-600"
                    >
                        {id ? 'Modificar Devocional' : 'Enviar Devocional'}
                    </button>
                </form>
            </div>
        </>
    );
};
export default DevocionalesAdmin;
