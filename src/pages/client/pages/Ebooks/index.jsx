import { lazy, useState, useEffect, useRef } from "react";
const Header = lazy(() => import("@/pages/client/components/Header"));
const EbookCard = lazy(() => import("./components/EbookCard"));
const EbookLoader = lazy(() => import("@/pages/client/components/Loaders/EbookLoader.jsx"));
import image22 from "../../../../assets/image22.png";
import WhiteIcon from "../../../../assets/WhiteIcon.png";
import EbooksHeader from "../../../../assets/EbooksHeader.png";

import { obtenerEbooks } from "../../../../Api/ebooks"
import { solicitudEbooks } from "../../../../Api/resEbooks";

export const Ebooks = () => {

    const formRef = useRef(null);

    const [fetchEbooks, setFetchEbooks] = useState([]);
    const [sessionValue, setSessionValue] = useState(false);
    const [isLoadingEbooks, setIsLoadingEbooks] = useState(true)
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [correo, setCorreo] = useState("");
    const [categoria, setCategoria] = useState("");

    useEffect(() => {
        const obtenerDataEbooks = async() => {
            const response = await obtenerEbooks();
            setFetchEbooks(response.data)
            setIsLoadingEbooks(false);
        }
        obtenerDataEbooks();
    }, [])

    useEffect(() =>{
        // console.log(sessionValue)
        const value = sessionStorage.getItem('validacion_ebooks')
        if (value) {
            setSessionValue(value)
        }
    }, [sessionValue])

    const guardarSessionStorage = () => {
        window.scrollTo({
        top: 0,
        behavior: "smooth"
        });
        sessionStorage.setItem('validacion_ebooks', true);
        // console.log("Dato guardado en sessionStorage:", true);
        setSessionValue(sessionStorage.getItem('validacion_ebooks'))
    };

    const scrollToElement = () => {
        const element = document.getElementById('formulario');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleNombre = (event) => setNombres(event.target.value);
    const handleApellido = (event) => setApellidos(event.target.value);
    const handleCorreo = (event) => setCorreo(event.target.value);
    const handleCategoria = (event) => setCategoria(event.target.value);

    const enviarDatos = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('nombres', nombres);
        formData.append('apellidos', apellidos);
        formData.append('correo', correo);
        formData.append('motivo', categoria);
        try {
            const respuesta = await solicitudEbooks(formData);
            console.log(respuesta);
            formRef.current.reset();
            setNombres('')
            setApellidos('')
            setCorreo('')
            setCategoria('')
        } catch (error) {
            console.log(error);
        };
    }

    return(
        <div className="flex flex-col items-center gap-12 pb-12 lg:gap-16 xl:gap-28 lg:pb-16 xl:pb-28">
            <Header color="bg-l_color_v-600" title="Nuestros Ebooks"/>
            {/* <div className="flex items-center justify-center w-full m-auto bg-l_color_o-600 h-96">
                <div className="flex items-center p-10 text-center bg-white rounded-full w-72 h-72">
                    <p className="font-normal text-[1.25em] leading-[1.5em] max-[1100px]:text-[1.125em] max-[1100px]:leading-[1.4em]">Contamos con una variedad de materiales gratuitos que podrán ayudarte con los desafíos de la actualidad. <br/> <br/>¡Te invitamos a que los descargues!</p>
                </div>
            </div> */}
            <div className="flex w-full justify-center box-content lg:max-w-[900px] 2xl:max-w-[1300px] mx-auto">
                {/* <div className="bg-white rounded-full w-72 max-md:hidden"></div> */}
                <div className="flex items-center p-10 text-center bg-l_color_v-var max-lg:w-72 max-lg:h-72 rounded-l-2xl max-sm:rounded-full lg:w-2/5">
                    <p className="font-normal text-[1.25em] leading-[1.5em] max-[1100px]:text-[1.125em] max-[1100px]:leading-[1.4em] text-white">Contamos con una variedad de materiales gratuitos que podrán ayudarte con los desafíos de la actualidad. <br/> <br/>¡Te invitamos a que los descargues!</p>
                </div>
                <img
                    src={EbooksHeader}
                    alt="Imagen"
                    className="object-cover max-lg:w-72 rounded-r-2xl max-sm:hidden lg:w-3/5"
                />
            </div>
            
            <div className="2xl:max-w-[1300px] 2xl:w-full grid gap-x-10 gap-y-12 min-[710px]:gap-x-16 min-[710px]:gap-y-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-8 2xl:px-auto max-lg:mb-16">

                {/* {isLoadingEbooks &&
                    fetchEbooks.map((ebook) => (
                        <EbookCard scrollToElement={scrollToElement} state={sessionValue} key={ebook._id} titulo={ebook.titulo} img={ebook.portada} descripcion={ebook.descripcion}/>
                    ))
                } */}
                {isLoadingEbooks // Mientras está cargando, muestra los skeletons
                    ? Array(6) // Crear 6 skeletons como placeholders
                        .fill()
                        .map((_, index) => (
                            <EbookLoader key={index} /> // loading={true} activa los skeletons
                        ))
                    : fetchEbooks.map((ebook) => (
                        <EbookCard scrollToElement={scrollToElement} pdf={ebook.pdf} state={sessionValue} key={ebook._id} titulo={ebook.titulo} img={ebook.portada} descripcion={ebook.descripcion}/>
                    ))}

                {/* <EbookCard titulo="Miedos" img={image22}/>
                <EbookCard titulo="Ansiedad" img={image22}/>
                <EbookCard titulo="Miedos" img={image22}/>
                <EbookCard titulo="Miedos" img={image22}/>
                <EbookCard titulo="Miedos" img={image22}/>
                <EbookCard titulo="Miedos" img={image22}/>
                <EbookCard titulo="Miedos" img={image22}/>
                <EbookCard titulo="Miedos" img={image22}/>
                <EbookCard titulo="Miedos" img={image22}/> */}
                
            </div>

            <div className="h-auto max-[600px]:w-full flex max-lg:flex-col min-[600px]:mx-[30px] md:w-max-[700px] md:mx-auto lg:mx-[40px] box-content md:items-center min-[1580px]:max-w-[1500px] min-[1580px]:mx-auto min-[1580px]:w-full max-lg:gap-1" id="formulario">
                <div className="flex flex-col justify-center gap-5 px-5 py-5 xl:px-10 max-lg:h-2/5 w-full bg-[#A7A692] text-white lg:text-black lg:bg-white text-center h-auto lg:h-96">
                    <p className="font-bold text-[1.25em] leading-[1.5em] max-[1100px]:text-[1.125em] max-[1100px]:leading-[1.4em] ">¡Aquí puedes descargar todos los Ebooks que quieras!</p>
                    <p className="font-light text-[1.125em] leading-[1.5em] max-[1100px]:text-[1em] max-[1100px]:leading-[1.4em] ">Completa este simple formulario y accede a todos los ebooks de nuestra librería digital</p>
                    <p className="font-bold text-[1.25em] leading-[1.5em] max-[1100px]:text-[1.125em] max-[1100px]:leading-[1.4em] ">¿Estás listo para comenzar?</p>
                </div>
                <div className="flex flex-col gap-5 max-lg:h-4/5 h-auto lg:h-96 w-full bg-[#A7A692] px-5 py-5 xl:px-10 justify-center">
                    <img src={WhiteIcon} alt="" className="self-center w-12 my-4"/>
                    <form className="flex flex-col w-full gap-5" onSubmit={enviarDatos} ref={formRef}>
                        <div className="flex gap-5 max-md:flex-col">
                            <input
                                type="text"
                                placeholder="Nombre *"
                                value={nombres}
                                onChange={handleNombre}
                                className="py-1.5 px-2 w-full rounded-lg border border-[#EAE9E5] text-[1.125em] leading-[1.5em] max-[1100px]:text-[1em] max-[1100px]:leading-[1.4em]"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Apellido *"
                                value={apellidos}
                                onChange={handleApellido}
                                className="py-1.5 px-2 w-full rounded-lg border border-[#EAE9E5] text-[1.125em] leading-[1.5em] max-[1100px]:text-[1em] max-[1100px]:leading-[1.4em]"
                                required
                            />
                        </div>
                        <input
                            type="email"
                            placeholder="Correo Electrónico *"
                            value={correo}
                            onChange={handleCorreo}
                            className="py-1.5 px-2 rounded-lg text-[1.125em] leading-[1.5em] max-[1100px]:text-[1em] max-[1100px]:leading-[1.4em]"
                            required
                        />
                        <select
                            value={categoria}
                            onChange={handleCategoria}
                            className="py-1.5 px-2 rounded-lg border border-[#EAE9E5] text-[1.125em] leading-[1.5em] max-[1100px]:text-[1em] max-[1100px]:leading-[1.4em]"
                            required
                        >
                            <option value="none" selected disabled className="text-gray-400">Escoja una categoría</option>
                            <option value="Vicios">Vicios</option>
                            <option value="Alcoholismo">Alcoholismo</option>
                            <option value="Drogas">Drogas</option>
                            <option value="Depresión">Depresión</option>
                            <option value="Ansiedad">Ansiedad</option>
                        </select>
                        <button type="submit" onClick={guardarSessionStorage} className="w-28 h-auto py-2 bg-l_color_v-600 text-white shadow-lg rounded-lg self-center text-[1.125em] leading-[1.5em] max-[1100px]:text-[1em] max-[1100px]:leading-[1.4em]"> Enviar</button>
                    </form>
                </div>
                
            </div>
        </div>
    );
};

export default Ebooks;