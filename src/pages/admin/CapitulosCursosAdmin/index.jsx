import { useEffect, useState } from "react";
import { crearCapituloCurso, buscarCapituloEspecifico, editarCapituloCurso } from "../../../Api/cursos";
import "react-quill/dist/quill.snow.css";
import { useParams, useNavigate } from "react-router-dom";

const CapituloCursosAdmin = () => {
    const navigate = useNavigate();
    const { idcurso, idcapitulo } = useParams();

    const [titulo, setTitulo] = useState("");
    const [pdflink, setPdflink] = useState(null);
    const [youtubelink, setYoutubelink] = useState("");

    const handleTitulo = (event) => setTitulo(event.target.value);
    const handlePdflink = (event) => setPdflink(event.target.files[0]);
    const handleYoutubelink = (event) => setYoutubelink(event.target.value);

    useEffect(() => {
        if (idcurso && idcapitulo) {
            const fetch = async () => {
                const response = await buscarCapituloEspecifico(idcurso, idcapitulo);
                setTitulo(response.data.titulo);
                setYoutubelink(response.data.idYoutube);
            };
            fetch();
        }
    }, [idcurso, idcapitulo]);

    const extractVideoId = (input) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|.+\?v=)|youtu\.be\/)?([^&\n?#]+)/;
        const match = input.match(regex);
        return match ? match[1] : null;
    };

    const CrearCapituloCurso = async (event) => {
        event.preventDefault();
        const youtubeId = extractVideoId(youtubelink);
        if (!youtubeId) {
            alert("La URL de YouTube no es válida");
            return;
        }
        if (!pdflink) {
            alert("El archivo PDF es obligatorio al crear un nuevo capítulo");
            return;
        }

        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("pdf", pdflink);
        formData.append("youtube", youtubeId);

        try {
            const respuesta = await crearCapituloCurso(idcurso, formData);
            if (respuesta.status === 200) navigate(`/admin/tablacursos/${idcurso}/tablacapitulos`);
        } catch (error) {
            console.log(error);
        }
    };

    const ModificarCapituloCurso = async (event) => {
        event.preventDefault();
        let youtubeId;

        // Permitir solo ID o URL en modo de modificación
        if (youtubelink.length === 11) {
            youtubeId = youtubelink; // Es solo el ID
        } else {
            youtubeId = extractVideoId(youtubelink);
        }

        if (!youtubeId) {
            alert("La URL o ID de YouTube no es válida");
            return;
        }

        const formData = new FormData();
        formData.append("titulo", titulo);
        if (pdflink) formData.append("pdf", pdflink); // Solo se agrega el PDF si se ha seleccionado
        formData.append("youtube", youtubeId);

        try {
            const respuesta = await editarCapituloCurso(idcurso, idcapitulo, formData);
            if (respuesta.status === 200) navigate(`/admin/tablacursos/${idcurso}/tablacapitulos`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="min-w-[400px] max-w-3xl px-6 py-12 mx-auto">
                <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">Capítulo para curso</h2>
                <form onSubmit={(idcurso && idcapitulo) ? ModificarCapituloCurso : CrearCapituloCurso} className="p-6 space-y-5 bg-white rounded-lg shadow-lg">
                    <div>
                        <label className="block font-semibold text-gray-700">Título del Capítulo</label>
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
                    <div>
                        <label className="block font-semibold text-gray-700">Archivo PDF</label>
                        <input
                            type="file"
                            name="pdf"
                            onChange={handlePdflink}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-l_color_y-600"
                            accept="application/pdf"
                            required={!idcapitulo} // Obligatorio solo si es un nuevo capítulo
                        />
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700">Link de YouTube</label>
                        <input
                            name="Youtube"
                            value={`https://www.youtube.com/watch?v=${youtubelink}`}
                            onChange={handleYoutubelink}
                            placeholder="https://www.youtube.com/ o solo la ID del video"
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-l_color_y-600"
                        />
                    </div>

                    <div className="py-2">
                        <button
                            type="submit"
                            className="w-full py-3 font-semibold text-white transition duration-200 rounded-lg bg-l_color_y-600 hover:bg-l_color_y-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-l_color_y-600"
                        >
                            {(idcurso && idcapitulo) ? "Modificar Capítulo" : "Enviar Capítulo"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CapituloCursosAdmin;
