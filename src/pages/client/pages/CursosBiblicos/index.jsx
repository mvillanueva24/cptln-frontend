import { lazy, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import videotest from '../../../../assets/file.mp4';
import WhiteIcon from "../../../../assets/WhiteIcon.png";
import { solicitudCursos } from "../../../../Api/cursosbiblicos";
import { CursoCart } from "./components/CursoCart"

const Header = lazy(() => import("@/pages/client/components/Header"));

import { obtenerCurso } from "@/Api/cursos";

const CursosBiblico = () => {

    const navigate = useNavigate();

    // Mover el estado dentro del componente
    const [sessionValue, setSessionValue] = useState(false);
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [correo, setCorreo] = useState("");
    const [motivo, setMotivo] = useState("");

    const [cursos, setCursos] = useState([]);
    const [isLoadingCursos, setIsLoadingCursos] = useState([]);

    const handleNombre = (event) => setNombres(event.target.value);
    const handleApellido = (event) => setApellidos(event.target.value);
    const handleCorreo = (event) => setCorreo(event.target.value);
    const handleCategoria = (event) => setMotivo(event.target.value);

    const enviarDatos = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('nombres', nombres);
        formData.append('apellidos', apellidos);
        formData.append('correo', correo);
        formData.append('motivo', motivo);
        try {
            const respuesta = await solicitudCursos(formData);
            console.log(respuesta);
            guardarSessionStorage();
            // navigate("/recursos/cursos-biblicos/curso-completo");

            setNombres('');
            setApellidos('');
            setCorreo('');
            setMotivo('')

        } catch (error) {
            console.log(error);
        };
    };

    useEffect(() =>{
        // console.log(sessionValue)
        const value = sessionStorage.getItem('validacion_cursos')
        if (value) {
            setSessionValue(value)
        }
    }, [sessionValue])

    useEffect(() => {
        const fetchDevocional = async () =>{
            const response = await obtenerCurso()
            setCursos(response.data)
            setIsLoadingCursos(false)
        }
        fetchDevocional()
    }, [])

    const guardarSessionStorage = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        sessionStorage.setItem('validacion_cursos', true);
        // console.log("Dato guardado en sessionStorage:", true);
        setSessionValue(sessionStorage.getItem('validacion_cursos'))
    };

    const scrollToElement = () => {
        const element = document.getElementById('formulario');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col gap-12 pb-12 lg:gap-16 xl:gap-28 lg:pb-16 xl:pb-28">
            <Header color="bg-[#3C5050]" title="Cursos Bíblicos" />
            <div className="grid grid-cols-1 gap-12 lg:gap-16 xl:gap-28 mx-5 sm:mx-10 2xl:w-full max-w-[1500px] xl:mx-10 2xl:mx-auto rounded-xl">
                {
                    !isLoadingCursos && cursos && cursos.map((curso, index) => (
                        <CursoCart key={index} scrollToElement={scrollToElement} titulo = {curso.titulo} descripcion = {curso.descripcion} capitulos = {curso.capitulos} preview = {curso.capitulos[0] && curso.capitulos[0].titulo} previewVideo = {curso.capitulos[0] && curso.capitulos[0].idYoutube} state={sessionValue} id = {curso._id}/>
                    ))
                }
                
            </div>
            <div className="h-auto max-[600px]:w-full flex max-lg:flex-col min-[600px]:mx-[30px] md:w-max-[700px] md:mx-auto lg:mx-[40px] box-content md:items-center min-[1580px]:max-w-[1500px] min-[1580px]:mx-auto min-[1580px]:w-full max-lg:gap-1" id="formulario">
                <div className="flex flex-col justify-center gap-5 px-5 py-5 xl:px-10 max-lg:h-1/3 w-full bg-l_color_v text-white lg:text-black lg:bg-white text-center h-auto lg:h-96">
                    <p className="font-bold text-[1.25em] leading-[1.5em] max-[1100px]:text-[1.125em] max-[1100px]:leading-[1.4em] ">¡Accede a los cursos llenando el formulario!</p>
                    <p className="font-light text-[1.125em] leading-[1.5em] max-[1100px]:text-[1em] max-[1100px]:leading-[1.4em] text-justify">Cada uno de los 12 videos contiene una guía de estudio con referencias bíblicas y preguntas de reflexión y discusión.</p>
                    <p className="font-bold text-[1.25em] leading-[1.5em] max-[1100px]:text-[1.125em] max-[1100px]:leading-[1.4em] ">¿Estás listo para aprender?</p>
                </div>
                <div className="flex flex-col gap-5 max-lg:h-2/3 h-auto lg:h-96 w-full bg-[#47797A]/70 px-5 py-5 xl:px-10 justify-center">
                    <img src={WhiteIcon} alt="" className="self-center w-12 my-4" />
                    <form className="flex flex-col w-full gap-5" onSubmit={enviarDatos}>
                        <div className="flex gap-5 max-md:flex-col">
                            <input
                                type="text"
                                placeholder="Nombre *"
                                value={nombres}
                                onChange={handleNombre}
                                className="py-1.5 px-2 w-full rounded-lg border border-[#EAE9E5] text-[1.125em] leading-[1.5em] max-[1100px]:text-[1em] max-[1100px]:leading-[1.4em]" />
                            <input 
                                type="text" 
                                placeholder="Apellido *" 
                                value={apellidos}
                                onChange={handleApellido}
                                className="py-1.5 px-2 w-full rounded-lg border border-[#EAE9E5] text-[1.125em] leading-[1.5em] max-[1100px]:text-[1em] max-[1100px]:leading-[1.4em]" />
                        </div>
                        <input 
                            type="email" 
                            value={correo}
                            onChange={handleCorreo}
                            placeholder="Correo *"
                            className="py-1.5 px-2 w-full rounded-lg border border-[#EAE9E5] text-[1.125em] leading-[1.5em] max-[1100px]:text-[1em] max-[1100px]:leading-[1.4em]" />
                        <select
                            value={motivo}
                            onChange={handleCategoria}
                            className="py-1.5 px-2 rounded-lg border border-[#EAE9E5] text-[1.125em] leading-[1.5em] max-[1100px]:text-[1em] max-[1100px]:leading-[1.4em]"
                            required
                        >
                            <option value="" disabled className="text-gray-400">Escoja un curso</option>
                            {
                                !isLoadingCursos && cursos && cursos.map((curso, index) => (
                                    <option value={curso.titulo}>{curso.titulo}</option>
                                ))
                            }
                            {/* <option value="Vicios">Vicios</option>
                            <option value="Alcoholismo">Alcoholismo</option>
                            <option value="Drogas">Drogas</option>
                            <option value="Depresión">Depresión</option>
                            <option value="Ansiedad">Ansiedad</option> */}
                        </select>
                        <button type="submit" className="px-4 py-2 text-white transition-all duration-300 rounded-md bg-[#A25F3B]/80 hover:shadow-md hover:bg-[#A25F3B]">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CursosBiblico;
