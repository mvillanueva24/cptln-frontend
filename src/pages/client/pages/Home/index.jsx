import { lazy, useEffect, useState } from "react";
import BackgroundHeaderImage from "../../../../assets/img_F_header.png";
import JoelImg from "../../../../assets/Joel_3.jpg";
import PasiImg from "../../../../assets/PASI_3.jpg";
import Slider from "react-slick";
// ../../../Api/Noticias.js
import { obtenerNoticia } from "@/Api/noticias";
import { obtenerEventos } from "@/Api/eventos";
import { obtenerDatosDeRadio } from "@/Api/radio";
import { obtenerProgramasCliente } from "@/Api/programas";

import video from "../../../../assets/video_creciendo_familia.mp4"

import data from "../../data.json";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Componentes lazy-loaded
const Header = lazy(() => import("@/pages/client/components/Header"));
const HomeProgramsCard = lazy(() =>
  import("./components/HomeProgramsCard.jsx")
);
const NewsCard = lazy(() => import("@/pages/client/components/NewsCard"));
const EventCard = lazy(() => import("@/pages/client/components/EventCard"));
const NewsLoader = lazy(() =>
  import("@/pages/client/components/Loaders/NewsLoader.jsx")
);
const HomeProgramsLoader = lazy(() =>
  import("@/pages/client/components/Loaders/HomeProgramsLoader.jsx")
);
const EventsLoader = lazy(() =>
  import("@/pages/client/components/Loaders/EventsLoader.jsx")
);

// Datos de los programas para el carrusel
const programs = [
  { imgSrc: JoelImg, name: "JOEL", tipo: "Niños y Adolescentes", linktipo: "", color: "bg-l_color_v", link: "/niños-adolescentes/joel" },
  { imgSrc: PasiImg, name: "PASI", tipo: "Niños y Adolescentes", color: "bg-l_color_r-600", link: "/programas/niños-adolescentes/pasi"},
  { imgSrc: JoelImg, name: "Creciendo en Familia", tipo: "Familia", color: "bg-l_color_y-600", link: "/programas/creciendo-en-familia"},
];

export const Home = () => {
  const [slidesToShow, setSlidesToShow] = useState(2);
  const [fetchNoticias, setFetchNoticias] = useState([]);
  const [fetchEventos, setFetchEventos] = useState([]);
  const [fetchProgramas, setFetchProgramas] = useState([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true); // Nuevo estado de carga
  const [isLoadingEvents, setIsLoadingEventes] = useState(true); // Nuevo estado de carga
  const [isLoadingPrograms, setIsLoadingPrograms] = useState(true); // Nuevo estado de carga

  const [datosRadio, setdatosRadio] = useState([]);
  const [isLoadingRadio, setIsLoadingRadio] = useState(true); // Nuevo estado de carga

  function convertirTexto(texto) {
    return texto ? texto.trim().toLowerCase().replace(/\s+/g, '-') : '';
  }

  useEffect(() => {
    const fetchProgram = async () => {
      const response = await obtenerProgramasCliente();
      // console.log(response)
      setFetchProgramas(response.data);
      setIsLoadingPrograms(false);
    };
    fetchProgram();
    const fetch = async () => {
      const response = await obtenerNoticia({"limit":6});
      // console.log(response)
      setFetchNoticias(response.data);
      setIsLoadingNews(false);
    };
    fetch();
    const fetchEvent = async () => {
      const response = await obtenerEventos();
      // console.log(response)
      setFetchEventos(response.data);
      setIsLoadingEventes(false);
    };
    fetchEvent();
    const fetchRadio = async () => {
      const response = await obtenerDatosDeRadio();
      // console.log(response)
      setdatosRadio(response.data);
      setIsLoadingRadio(false);
    };
    fetchRadio();
  }, []);

  const updateSlidesToShow = () => {
    const width = window.innerWidth;
    if (width < 1024) {
      setSlidesToShow(1);
    } else {
      setSlidesToShow(2);
    }
  };

  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => {
      window.removeEventListener("resize", updateSlidesToShow);
    };
  }, []);

  const carouselSettings = {
    dots: true,
    infinite: fetchProgramas.length > 1 ? true : false,
    speed: 500,
    slidesToShow: fetchProgramas.length > 1 ? slidesToShow : 1,
    slidesToScroll: 1,
    // autoplay: true,
    mobileFirst: true,
  };

  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Sección del Header */}
      <div className="relative h-[45vh] min-h-[300px]">
        {/* Imagen de fondo */}
        <img
          src={BackgroundHeaderImage}
          alt="Header background"
          className="absolute inset-0 object-cover w-full h-full"
          style={{ objectFit: "cover" }}
        />
        {/* Filtro oscuro */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        {/* Contenido del Header */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 text-center">
          <Header
            color="bg-transparent"
            title="CRISTO PARA TODAS LAS NACIONES - PERÚ"
            text="Llevando a Cristo a las Naciones y las Naciones a la Iglesia"
          />
        </div>
      </div>

      <div className="flex flex-col gap-12 lg:gap-16 xl:gap-28 pb-12 lg:pb-16 xl:pb-28 ">
        {/* Sección de Programas */}

        {/* <div className="container min-[768px]:px-10 min-[1024px]:px-12 min-[1280px]:px-16 min-[1440px]:px-6 mx-auto"> */}
        <div className="mx-auto px-8 max-w-[860px] min-[768px]:px-20 min-[1024px]:max-w-[1690px] min-[1650px]:w-full ">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="h3-subtitles">Programas</h2>
            <a href="/programas">
              <button className="px-4 py-1 border rounded border-[#46797A] hover:bg-[#46797A] hover:text-white transition-colors duration-300">
                Ver todo
              </button>
            </a>
          </div>

          {/* Carrusel de Programas */}
          {/* <div className="mx-1 min-[768px]:px-5 min-[1024px]:px-6 min-[1280px]:px-8 min-[1440px]:px-10 min-[1920px]:px-12 "> */}
          <div className=" mx-auto w-[90%] lg:w-[95%] 2xl:w-[98%] min-[1650px]:w-full">
            <div className="grid grid-cols-1">
              <Slider {...carouselSettings}>
                {
                  !isLoadingPrograms && (
                    <a className="relative px-2" href="/programa/creciendo-en-familia">

                    <HomeProgramsCard program={datosRadio} radio={true}/>
                    </a>
                  )
                }
                

                {isLoadingPrograms // Mientras está cargando, muestra los skeletons
                  ? Array(6) // Crear 6 skeletons como placeholders
                      .fill()
                      .map((_, index) => (
                        <HomeProgramsLoader key={index} /> // loading={true} activa los skeletons
                      ))
                  : fetchProgramas.map((program, index) => {
                    return (
                      
                      <a key={index} className="relative px-2" href={program.enlace != null ? program.enlace : (`${program.categoria_id ? `/programas/${convertirTexto(program.categoria_id)}` : ""}/programa/${convertirTexto(program.titulo)}`)} target={program.enlace != null ? "_blank" : "_self"}>
                        <HomeProgramsCard program={program} />
                      </a>
                    );
                  })
                }
              </Slider>
            </div>
          </div>
        </div>
        

        {/* <div className="flex w-full mx-5 sm:mx-10 sm:max-w-[645px] md:mx-auto md:max-w-[672px] lg:max-w-[980px] lg:mx-auto min-[1110px]:mx-auto min-[1110px]:max-w-[1025px] max-2xl:flex-col gap-10 2xl:gap-12 2xl:max-w-[1480px] 2xl:mx-12 min-[1650px]:mx-auto min-[1650px]:max-w-[1520px]"> */}
        <div className="grid xl:grid-cols-2 mx-auto px-8 max-w-[860px] min-[768px]:px-20 min-[1024px]:max-w-[1690px] min-[1650px]:w-full gap-4 2xl:gap-10">
          <div className="flex flex-col justify-between w-full">
              <div className="flex flex-col gap-2 xl:gap-4 2xl:gap-6 mb-4">
                  <h3 className="h3-subtitles">{datosRadio.nombre}</h3>
                  <p className="standard-paragraph text-justify line-clamp-[9] 2xl:line-clamp-[10]" dangerouslySetInnerHTML={{ __html: datosRadio.descripcion}}></p>
              </div>
              <a href="/programa/creciendo-en-familia">
                  <button className="px-4 py-1 border rounded border-[#46797A] hover:bg-[#46797A] hover:text-white transition-colors duration-300">
                      Ir a Creciendo en Familia
                  </button>
              </a>
          </div>
          <div className="max-h-[500px] bg-[#222126] rounded-t-xl lg:rounded-t-none lg:rounded-md">
              <video 
                  src={datosRadio.videoHome} 
                  controls 
                  className="w-full h-full object-contain "
              />
          </div>
      </div>

        {/* flex sm:mx-10 md:mx-auto lg:mx-10 min-[1110px]:mx-auto max-2xl:flex-col gap-10 2xl:gap-20 2xl:max-w-[1880px] 2xl:mx-16 min-[1650px]:mx-auto */}
        <div className="flex max-2xl:flex-col mx-auto px-8 max-w-[860px] min-[768px]:px-20 min-[1024px]:max-w-[1690px] min-[1650px]:w-full gap-10 w-full">
          <div className="2xl:w-2/3">
            {/* <h3 className="h3-subtitles mb-5">Noticias</h3> */}
            <div className="flex items-center gap-4 mb-8">
              <h2 className="h3-subtitles">Noticias</h2>
              <a href="/noticias-y-eventos">
                <button className="px-4 py-1 border rounded border-[#46797A] hover:bg-[#46797A] hover:text-white transition-colors duration-300">
                  Ver todo
                </button>
              </a>
            </div>
            <div className="mx-auto min-[1110px]:mx-10 xl:mx-auto">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-3 justify-items-center ">
                {isLoadingNews // Mientras está cargando, muestra los skeletons
                  ? Array(6) // Crear 6 skeletons como placeholders
                  .fill()
                  .map((_, index) => (
                    <NewsLoader key={index} /> // loading={true} activa los skeletons
                  ))
                  : fetchNoticias.map((not, index) => (
                    <NewsCard
                    key={not._id}
                    title={not.titulo}
                    date={not.fecha}
                    description={not.cuerpo}
                    link={not._id}
                    imageSrc={not.portada}
                    loading={false} // loading={false} oculta los skeletons
                    />
                  ))}
              </div>
            </div>
          </div>


          <div className="2xl:w-1/3">
            <h3 className="h3-subtitles mb-5">Eventos</h3>
            <div className="min-[360px]:mx-auto ">
              <div className={`grid grid-cols-1 ${fetchEventos && fetchEventos.length > 1 ? "lg:grid-cols-2" : "lg:grid-cols-1"} xl:grid-cols-2 2xl:grid-cols-1 gap-4 xl:gap-8 2xl:gap-6 2xl:max-w-[530px] justify-items-center`}>
                {isLoadingEvents ? (
                  Array(3).fill().map((_, index) => (
                    <EventsLoader key={index} />
                  ))
                ) : (
                  <>
                    {fetchEventos.map((event, index) => (
                      <EventCard
                        key={event._id}
                        date={event.fecha}
                        hora={event.hora}
                        title={event.titulo}
                        description={event.cuerpo}
                        location={event.ubicacion}
                      />
                    ))}
                    {fetchEventos.length < 3 &&
                      Array(3 - fetchEventos.length).fill().map((_, index) => (
                        <div key={index} className="invisible">
                          <EventCard />
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
