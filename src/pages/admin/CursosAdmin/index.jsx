import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { registrarCurso, obtenerCursoID, EditarCurso } from "../../../Api/cursos";
import "react-quill/dist/quill.snow.css";
import { useParams, useNavigate } from "react-router-dom";

const CursoAdmin = () => {
    const navigate = useNavigate();
    const { idcurso } = useParams();

    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [descripcionValida, setDescripcionValida] = useState(true);

    const handleTitulo = (event) => setTitulo(event.target.value);

    const handleDescripcion = (html) => {
        setDescripcion(html);
        setDescripcionValida(html.trim().length > 0); // Verifica si hay texto en la descripción
    };

    useEffect(() => {
        if (idcurso) {
            const fetchCurso = async () => {
                const response = await obtenerCursoID(idcurso);
                setTitulo(response.data.titulo);
                setDescripcion(response.data.descripcion);
            };
            fetchCurso();
        }
    }, [idcurso]);

    const CrearCurso = async (event) => {
        event.preventDefault();
        // Verifica si la descripción está vacía antes de enviar
        if (!descripcion.trim()) {
            setDescripcionValida(false);
            return; // No envía el formulario si la descripción está vacía
        }

        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("descripcion", descripcion);

        try {
            const respuesta = await registrarCurso(formData);
            if (respuesta.status === 200) navigate("/admin/tablacursos");
        } catch (error) {
            console.error(error);
        }
    };

    const ModificarCurso = async (event) => {
        event.preventDefault();
        if (!descripcion.trim()) {
            setDescripcionValida(false);
            return;
        }

        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("descripcion", descripcion);

        try {
            const respuesta = await EditarCurso(idcurso, formData);
            if (respuesta.status === 200) navigate("/admin/tablacursos");
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

    return (
        <>
            <div className="min-w-[400px] max-w-3xl px-6 py-12 mx-auto">
                <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">Escribe el Curso</h2>
                <form onSubmit={idcurso ? ModificarCurso : CrearCurso} className="p-6 space-y-10 bg-white rounded-lg shadow-lg">
                    <div className="space-y-6">
                        <input
                            type="text"
                            name="title"
                            value={titulo}
                            onChange={handleTitulo}
                            placeholder="Título"
                            required // Hace que el título sea obligatorio
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-l_color_y-600"
                        />
                    </div>
                    <div className="h-56">
                        <ReactQuill
                            className="h-full bg-white rounded-lg"
                            modules={modules}
                            name="descripcion"
                            value={descripcion}
                            onChange={handleDescripcion}
                            placeholder="Descripción de este curso"
                        />
                        {!descripcionValida && (
                            <p className="mt-2 text-sm text-red-600">La descripción es obligatoria.</p>
                        )}
                    </div>
                    <div className="py-2">
                        <button
                            type="submit"
                            className={`w-full py-3 font-semibold text-white transition duration-200 rounded-lg ${descripcionValida ? "bg-l_color_y-600 hover:bg-l_color_y-700" : "bg-gray-400 cursor-not-allowed"}`}
                        >
                            {idcurso ? "Modificar Curso" : "Enviar Curso"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CursoAdmin;