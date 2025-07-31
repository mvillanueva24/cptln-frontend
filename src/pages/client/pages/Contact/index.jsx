import { lazy, useState, useEffect } from "react";
import OriginalLogo from "../../../../assets/OriginalLogo.png";
import Logo_Wpp from "../../../../assets/Logo_Wpp.png";
import Logo_Facebook from "../../../../assets/facebook.png";
import Logo_Instagram from "../../../../assets/instagram.png";
import Logo_X from "../../../../assets/twitter.png";
import Logo_TikTok from "../../../../assets/tik-tok.png";
import Fondo_C from "../../../../assets/Contactanos.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { solicitudContactanos } from "../../../../Api/contactanos";
const Header = lazy(() => import("@/pages/client/components/Header"));

export const Contact = () => {
    // const { data } = useParams(); 
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
    
    // Configuración del carrusel
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        window.addEventListener("resize", handleResize);
        
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // useEffect(() => {

    // }, [data])

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [ciudad, setCiudad ] = useState("");
    const [mensaje, setMensaje] = useState("");
    
    const handleNombre = (event) => setNombre(event.target.value);
    const handleApellido = (event) => setApellido(event.target.value);
    const handleCorreo = (event) => setCorreo(event.target.value);
    const handleTelefono = (event) => setTelefono(event.target.value);
    const handleCiudad = (event) => setCiudad(event.target.value);
    const handleMensaje = (event) => setMensaje(event.target.value);

    const enviarDatos = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('nombres', nombre);
        formData.append('apellidos', apellido);
        formData.append('correo', correo);
        formData.append('telefono', telefono);
        formData.append('ciudad', ciudad);
        formData.append('mensaje', mensaje);
    
        try {
            const respuesta = await solicitudContactanos(formData);
            console.log(respuesta);
    
            // Reset form fields after successful submission
            setNombre('');
            setApellido('');
            setCorreo('');
            setTelefono('');
            setCiudad('');
            setMensaje('');
            
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <div className="flex flex-col gap-12 pb-12">
            {/* Header */}
            <Header color="bg-l_color_v-600" title="CONTÁCTANOS" />
            {/* Main Content */}
            <div className="flex flex-col [@media(min-width:1280px)]:flex-row justify-center mx-auto h-90 [@media(min-width:1280px)]:w-[75%] [@media(min-width:1920px)]:w-[65%] gap-0">
                {/* Contenedor principal */}
                <div className="flex flex-col [@media(min-width:1280px)]:flex-row w-full">
                    {/* Sección del formulario */}
                    {isMobile ? (
                        <div className="p-8 rounded-none bg-l_color_v-var">
                            <div className="flex justify-center mb-6">
                                <img src={OriginalLogo} alt="Logo" className="w-12 h-12 sm:w-16 sm:h-16" />
                            </div>
                            <form  onSubmit={enviarDatos}> 
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                <input type="text" name="nombre" placeholder="Nombre" className="p-3 bg-gray-100 rounded-md" value={nombre} onChange={handleNombre} />
                                <input type="text" name="apellido" placeholder="Apellido" className="p-3 bg-gray-100 rounded-md" value={apellido} onChange={handleApellido} />
                                </div>
                                <input type="email" name="email" placeholder="Correo Electrónico" className="w-full p-3 mb-4 bg-gray-100 rounded-md" value={correo} onChange={handleCorreo} />
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                <input type="text" name="telefono" placeholder="Teléfono" className="p-3 bg-gray-100 rounded-md" value={telefono} onChange={handleTelefono} />
                                <select name="ciudad" className="flex-1 px-4 py-2 bg-gray-100 border rounded-full" value={ciudad} onChange={handleCiudad}>
                                    <option value="">Ciudad</option>
                                        <option value="Amazonas">Amazonas</option>
                                        <option value="Áncash">Áncash</option>
                                        <option value="Apurímac">Apurímac</option>
                                        <option value="Arequipa">Arequipa</option>
                                        <option value="Ayacucho">Ayacucho</option>
                                        <option value="Cajamarca">Cajamarca</option>
                                        <option value="Callao">Callao</option>
                                        <option value="Cusco">Cusco</option>
                                        <option value="Huancavelica">Huancavelica</option>
                                        <option value="Huánuco">Huánuco</option>
                                        <option value="Ica">Ica</option>
                                        <option value="Junín">Junín</option>
                                        <option value="La Libertad">La Libertad</option>
                                        <option value="Lambayeque">Lambayeque</option>
                                        <option value="Lima">Lima</option>
                                        <option value="Loreto">Loreto</option>
                                        <option value="Madre de Dios">Madre de Dios</option>
                                        <option value="Moquegua">Moquegua</option>
                                        <option value="Pasco">Pasco</option>
                                        <option value="Piura">Piura</option>
                                        <option value="Puno">Puno</option>
                                        <option value="San Martín">San Martín</option>
                                        <option value="Tacna">Tacna</option>
                                        <option value="Tumbes">Tumbes</option>
                                        <option value="Ucayali">Ucayali</option>
                                        {/* Agregar más ciudades */}
                                    </select>
                                </div>
                                <textarea name="mensaje" placeholder="Mensaje" className="w-full h-40 p-3 bg-gray-100 rounded-md" value={mensaje} onChange={handleMensaje}></textarea>
                                <button type="submit" className="w-full p-3 mt-4 text-white rounded-md bg-l_color_v-600">Enviar</button>
                            </form>
                        </div>
                    ) : (
                        <div className="w-full [@media(min-width:1280px)]:w-1/2 bg-[#65633F] p-8 rounded-none">
                            <div className="p-8 bg-[#EAE9E5] rounded-none">
                                {/* Logo */}
                                <div className="flex justify-center mb-6">
                                    <img src={OriginalLogo} alt="Logo" className="w-12 h-12 sm:w-16 sm:h-16" />
                                </div>
                                {/* Formulario */}
                                <form  onSubmit={enviarDatos}>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <input type="text" placeholder="Nombre" className="p-3 bg-gray-100 rounded-md" value={nombre} onChange={handleNombre} />
                                        <input type="text" placeholder="Apellido" className="p-3 bg-gray-100 rounded-md" value={apellido} onChange={handleApellido}/>
                                    </div>
                                    <input type="email" placeholder="Correo Electrónico" className="w-full p-3 mb-4 bg-gray-100 rounded-md" value={correo} onChange={handleCorreo}/>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <input type="text" placeholder="Teléfono" className="p-3 bg-gray-100 rounded-md"  value={telefono} onChange={handleTelefono}/>
                                        <select className="flex-1 px-3 py-2 bg-gray-100 border rounded-md" value={ciudad} onChange={handleCiudad}>
                                            <option value="">Ciudad</option>
                                            <option value="Amazonas">Amazonas</option>
                                            <option value="Áncash">Áncash</option>
                                            <option value="Apurímac">Apurímac</option>
                                            <option value="Arequipa">Arequipa</option>
                                            <option value="Ayacucho">Ayacucho</option>
                                            <option value="Cajamarca">Cajamarca</option>
                                            <option value="Callao">Callao</option>
                                            <option value="Cusco">Cusco</option>
                                            <option value="Huancavelica">Huancavelica</option>
                                            <option value="Huánuco">Huánuco</option>
                                            <option value="Ica">Ica</option>
                                            <option value="Junín">Junín</option>
                                            <option value="La Libertad">La Libertad</option>
                                            <option value="Lambayeque">Lambayeque</option>
                                            <option value="Lima">Lima</option>
                                            <option value="Loreto">Loreto</option>
                                            <option value="Madre de Dios">Madre de Dios</option>
                                            <option value="Moquegua">Moquegua</option>
                                            <option value="Pasco">Pasco</option>
                                            <option value="Piura">Piura</option>
                                            <option value="Puno">Puno</option>
                                            <option value="San Martín">San Martín</option>
                                            <option value="Tacna">Tacna</option>
                                            <option value="Tumbes">Tumbes</option>
                                            <option value="Ucayali">Ucayali</option>
                                        </select>
                                    </div>
                                    <textarea placeholder="Mensaje" className="w-full h-40 p-3 bg-gray-100 rounded-md" value={mensaje} onChange={handleMensaje}></textarea>                  
                                    <button type="submit" className="w-full p-3 mt-4 text-white rounded-md bg-l_color_v-600">Enviar</button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Sección de contacto */}
                    <div className="relative w-full [@media(min-width:1280px)]:w-1/2 [@media(max-width:1279px)]:mt-8">
                        {/* Imagen de fondo */}
                        <div className="absolute inset-0 bg-center bg-cover">
                            <img src={Fondo_C} alt="Imagen de fondo" className="object-cover w-full h-full" />
                            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                        </div>

                        {/* Información de contacto */}
                        <div className="relative z-10 flex flex-col justify-center h-full p-8 text-white">
                            <h2 className="mb-4 font-semibold h3-subtitles">Contacto</h2>
                            <p className="mb-2 standard-paragraph"><strong>Dirección:</strong> Urb. Villa Eléctrica, Edificio Apolo B-16, JLBR</p>
                            <p className="mb-2 standard-paragraph"><strong>Teléfono:</strong> 959 423 634</p>
                            <p className="mb-2 standard-paragraph"><strong>Email:</strong> cptln.peru@gmail.com</p>
                            <p className="standard-paragraph font-bold">Nuestras Redes Sociales:</p>
                            {/* Icono de WhatsApp */}
                            <div className="flex gap-5">
                                <a href="https://wa.me/qr/L6TK7UDV2UFBF1" target="_blank" rel="noopener noreferrer" className="block mt-2 sm:mt-4">
                                    <img src={Logo_Wpp} alt="WhatsApp" className="w-8 h-8 sm:w-10 sm:h-10" />
                                </a>
                                <a href="https://www.facebook.com/cptln.peru" target="_blank" rel="noopener noreferrer" className="block mt-2 sm:mt-4">
                                    <img src={Logo_Facebook} alt="Facebook" className="w-8 h-8 sm:w-10 sm:h-10" />
                                </a>
                                <a href="https://www.instagram.com/cptln.peru/" target="_blank" rel="noopener noreferrer" className="block mt-2 sm:mt-4">
                                    <img src={Logo_Instagram} alt="Instagram" className="w-8 h-8 sm:w-10 sm:h-10" />
                                </a>
                                <a href="https://x.com/cptlnperu" target="_blank" rel="noopener noreferrer" className="block mt-2 sm:mt-4">
                                    <img src={Logo_X} alt="WhatsApp" className="w-8 h-8 sm:w-10 sm:h-10" />
                                </a>
                                <a href="https://www.tiktok.com/@cptln.peru" target="_blank" rel="noopener noreferrer" className="block mt-2 sm:mt-4">
                                    <img src={Logo_TikTok} alt="WhatsApp" className="w-8 h-8 sm:w-12 sm:h-12" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Carrusel de Imágenes */}
            {/* <div className="py-8 bg-l_color_Fondo">
                <div className="container px-4 mx-auto lg:px-8">
                    <h3 className="mb-8 text-center text-black h3-subtitles">NUESTROS TRABAJOS</h3>
                    <Slider {...settings}>
                        <div className="px-2">
                            <div className="flex items-center justify-center h-64 overflow-hidden">
                                <img src={TransferImage1} alt="Trabajo 1" className="object-cover w-full h-full" />
                            </div>
                        </div>
                        <div className="px-2">
                            <div className="flex items-center justify-center h-64 overflow-hidden">
                                <img src={TransferImage2} alt="Trabajo 2" className="object-cover w-full h-full" />
                            </div>
                        </div>
                        <div className="px-2">
                            <div className="flex items-center justify-center h-64 overflow-hidden">
                                <img src={TransferImage3} alt="Trabajo 3" className="object-cover w-full h-full" />
                            </div>
                        </div>
                        <div className="px-2">
                            <div className="flex items-center justify-center h-64 overflow-hidden">
                                <img src={TransferImage3_2} alt="Trabajo 4" className="object-cover w-full h-full" />
                            </div>
                        </div>
                    </Slider>
                </div>
            </div> */}
        </div>
    );
};

export default Contact;