import { lazy, useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import TransferImage1 from "../../../../assets/img_D_C_2.png"; 
import TransferImage2 from "../../../../assets/img_D_C_3.png"; 
import TransferImage3 from "../../../../assets/img_D_C.png";
import TransferImage3_2 from "../../../../assets/img_N_card.png";
import TransferImage4 from "../../../../assets/bcp-logo.png";
import TransferImage5 from "../../../../assets/img_Yape.png";
import Voluntario from "../../../../assets/Screenshot_3.png";

import { obtenerNoticia } from "@/Api/noticias";
const NewsLoader = lazy(() => import("@/pages/client/components/Loaders/NewsLoader.jsx"));

const Header = lazy(() => import("@/pages/client/components/Header"));

export const Donate = () => {

    const [slidesToShow, setSlidesToShow] = useState(4);

    const updateSlidesToShow = () => {
    const width = window.innerWidth;
    if (width < 900) {
        setSlidesToShow(1);
    } else if (width < 1324) {
        setSlidesToShow(2);
    } else if (width < 1500){
        setSlidesToShow(3);
    } else {
        setSlidesToShow(4)
    }
    };

    useEffect(() => {
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => {
        window.removeEventListener("resize", updateSlidesToShow);
    };
    }, []);
    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 4,
    //     slidesToScroll: 1,
    //     responsive: [
    //         {
    //             breakpoint: 1024,
    //             settings: {
    //                 slidesToShow: 2,
    //                 slidesToScroll: 1,
    //                 infinite: true,
    //                 dots: true
    //             }
    //         },
    //         {
    //             breakpoint: 600,
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1
    //             }
    //         }
    //     ]
    // };
    

    const [trabajos, setTrabajos] = useState([])
    const [isLoadingTrabajos, setIsLoadingTrabajos] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            const response = await obtenerNoticia({limit: null})
            setTrabajos(response.data)
            setIsLoadingTrabajos(false)
        }
        fetch()
    }, [])

    const settings = {
        dots: true,
        infinite: trabajos.length > 1 ? true : false,
        speed: 500,
        slidesToShow: trabajos.length > 1 ? slidesToShow : 1,
        slidesToScroll: 1,
        autoplay: true,
        mobileFirst: true,
    };

    return (
        <div className="flex flex-col gap-12 pb-12 lg:gap-16 xl:gap-28 lg:pb-16 xl:pb-28">
            
            <Header color="bg-l_color_o-600" title="¿CÓMO PUEDES AYUDAR?" text="Necesitamos tu colaboración para continuar y expandir esta obra"/>
            
            {/* Cuadro de Transferencias */}
            <div className="flex mx-6 sm:mx-10 md:mx-20  min-[1110px]:mx-auto min-[1110px]:max-w-[1025px] max-2xl:flex-col gap-10 2xl:gap-12 2xl:max-w-[1880px] 2xl:mx-16 min-[1650px]:mx-auto min-[1650px]:max-w-[1520px] ">
                {/* <div className="border-4 border-l_color_r px-8 py-8 xl:px-10 xl:py-12 rounded-xl flex flex-col gap-4 xl:gap-8">
                    <h3 className="h3-subtitles text-center">Donaciones</h3>
                    <p className="standard-paragraph text-justify">
                        ¿Tienes alguna habilidad y te gustaría enseñar a otras personas?
                        <br /> <br />
                        ¿Sabes algo en específico y quieres compartir tus conocimientos a la comunidad?, ¿Te gustaría trabajar como voluntario en nuestra organización?
                        <br /> <br />
                        ¡Sé nuestro Voluntario!
                        <br />
                        ¡Juntos podemos hacer un gran trabajo!
                    </p>
                    <a href="/contactanos">
                        <button className=" w-full flex gap-2 justify-center items-center py-2 rounded-md bg-l_color_r text-white text-sm sm:text-base xl:text-lg hover:bg-[#d72738]">
                            Contáctanos
                        </button>
                    </a>
                </div> */}
                {/* <div className=" rounded-xl w-1/3">
                    <img src={Voluntario} alt="s" className="w-full h-full"/>
                </div> */}
                <div className="border-4 border-l_color_v px-8 py-8 xl:px-10 xl:py-12 rounded-xl flex flex-col gap-4 xl:gap-8 ">
                    <h3 className="h3-subtitles text-center">Voluntariado</h3>
                    <p className="standard-paragraph text-justify">
                        ¿Tienes alguna habilidad y te gustaría enseñar a otras personas?
                        <br /> <br />
                        ¿Sabes algo en específico y quieres compartir tus conocimientos a la comunidad?, ¿Te gustaría trabajar como voluntario en nuestra organización?
                        <br /> <br />
                        ¡Sé nuestro Voluntario!
                        <br />
                        ¡Juntos podemos hacer un gran trabajo!
                        <br/>                        
                        <br/>                        
                        Estamos más que felices de trabajar con pastores y hermanos de la iglesia dispuestos a apoyar en los diferentes programas.
                    </p>
                    <a href="/contactanos">
                        <button className=" w-full flex gap-2 justify-center items-center py-2 rounded-md bg-l_color_v text-white text-sm sm:text-base xl:text-lg hover:bg-[#3a6567]">
                            Contáctanos
                        </button>
                    </a>
                </div>
                
            </div>
            {/* <div className="container px-4 mx-auto lg:px-8">
                <div className="p-8 rounded-lg shadow-lg bg-slate-300">
                    <div className="grid grid-cols-1 gap-8 text-black md:grid-cols-2">
                        <div>
                            <h3 className="mb-10 text-lg font-bold text-center ">TRANSFERENCIAS INTERBANCARIAS</h3>
                            <div className="flex items-center mb-8 space-x-4">
                                <img src={TransferImage4} alt="bcp" className="h-8"/>
                                <div>
                                    <p>Titular: Fundación CPTLN</p>
                                    <p>CBU: 07200892 20000000206204</p>
                                    <p>CUIT: 30-64669900-9</p>
                                </div>
                            </div>
                            <div className="flex items-center mb-8 space-x-4">
                                <img src={TransferImage4} alt="bcp" className="h-8"/>
                                <div>
                                    <p>Titular: Fundación CPTLN</p>
                                    <p>CBU: 07200892 20000000206204</p>
                                    <p>CUIT: 30-64669900-9</p>
                                </div>
                            </div>
                            <div className="flex items-center mb-8 space-x-4">
                                <img src={TransferImage4} alt="bcp" className="h-8"/>
                                <div>
                                    <p>Titular: Fundación CPTLN</p>
                                    <p>CBU: 07200892 20000000206204</p>
                                    <p>CUIT: 30-64669900-9</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="mb-10 text-lg font-bold text-center ">TRANSFERENCIAS MÓVILES</h3>
                            <div className="flex items-center mb-20 space-x-4">
                                <img src={TransferImage5} alt="Yape" className="h-12"/>
                                <div>  
                                    <p>Titular: Nombre del titular</p>
                                    <p>Número: 938472342</p>
                                </div>
                                <img src={TransferImage6} alt="QR" className="h-12"/>
                            </div>
                            <div className="flex items-center mb-20 space-x-4">
                                <img src={TransferImage5} alt="Yape" className="h-12"/>
                                <div>  
                                    <p>Titular: Nombre del titular</p>
                                    <p>Número: 938472342</p>
                                </div>
                                <img src={TransferImage6} alt="QR" className="h-12"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Carrusel de Imágenes */}

            <div className="mx-auto lg:px-8">
                <h3 className="h3-subtitles mb-4 min-[500px]:pb-8 text-center text-black">NUESTROS TRABAJOS</h3>
                <div className="mx-auto w-[90%] max-w-[760px] min-[1024px]:max-w-[1590px] lg:w-[95%]  grid grid-cols-1">
                    <Slider {...settings}>                       
                        {isLoadingTrabajos // Mientras está cargando, muestra los skeletons
                            ? Array(6) // Crear 6 skeletons como placeholders
                                .fill()
                                .map((_, index) => (
                                    <NewsLoader key={index} />
                                    // loading={true} activa los skeletons
                                ))
                            : trabajos.map((trabajo, index) => (
                                <div className="px-3" key={index}>
                                    <div className="flex items-center justify-center h-64 overflow-hidden">
                                        <img src={trabajo.portada} alt="Trabajo 5" className="object-contain w-full h-full transition-transform duration-500 transform hover:scale-105" />
                                    </div>
                                </div>
                        ))}
                    </Slider>
                </div>
            </div>
            
        </div>
    );
};

export default Donate;
