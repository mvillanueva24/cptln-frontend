import { lazy } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const Header = lazy(() => import("@/pages/client/components/Header"));
import Image1 from "../../../../assets/Día_del_Nino_1.jpg";
import MoonLoader  from "react-spinners/MoonLoader";
import Image2 from "../../../../assets/Día_del_Nino_2.jpg";
import Image3 from "../../../../assets/Día_del_Nino_3.jpg";
const NotFound = lazy(() => import("@/pages/client/pages/ExtraPages/NotFound"));
const PageLoader = lazy(() => import("@/pages/client/components/Loaders/PageLoader.jsx"));

import { obtenerNoticiaID } from "@/Api/noticias";
import { obtenerEventos } from "@/Api/eventos";

import data from "../../data.json";
const EventsLoader = lazy(() => import("@/pages/client/components/Loaders/EventsLoader.jsx"));
const EventCard = lazy(() => import("@/pages/client/components/EventCard"));

export const Noticia = () => {
  const { id } = useParams();
  const [noticia, setNoticia] = useState([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [ fetchEventos, setFetchEventos ] = useState([])
  const [ isLoadingFetchEventos, setIsLoadingFetchEventos ] = useState(true)
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNoticias = async () => {
        try {
          const response = await obtenerNoticiaID(id)
          if (!response.data) {
            navigate(-1)
            
          } else {
            setNoticia(response.data)
            console.log(response.data)
            setIsLoadingNews(false);
          }
        } catch (error) {
            
            //console.error("Error fetching programas:", error);
            setIsLoadingNews(false);
        }
    };
    // const fetch = async () => {
    //   const response = await obtenerNoticiaID(id)
    //   if (!response.data) {
    //     console.log("Prueba ajdnadn")
    //     navigate("*")
    //   } else {
    //     setNoticia(response.data)
    //     console.log(response.data)
        
    //     setLoading(false);
    //   }
    //   // console.log(response)
      
    // }
    
    fetchNoticias();
    const fetchEvent = async () => {
      const response = await obtenerEventos()
      // console.log(response)
      setFetchEventos(response.data)
      setIsLoadingFetchEventos(false)
      
    }
    if( noticia.length == 0 ){
      fetchEvent();
    }
    
  }, [id, navigate]);

  const handleDateUTC = (dateString) => {
    const dateObj = new Date(dateString);
    return new Date(dateObj.getUTCFullYear(), dateObj.getUTCMonth(), dateObj.getUTCDate());
  };

  function convertirFechaPersonalizada(fecha) {
    const dateFormat = handleDateUTC(fecha);
    const fechaObj = new Date(dateFormat);

    const dia = fechaObj.getDate();
    const mes = fechaObj.toLocaleString('es-ES', { month: 'long' });
    const año = fechaObj.getFullYear();

    return `${mes.charAt(0).toUpperCase() + mes.slice(1)} ${dia}, ${año}`;
  }

  return (
    <div className="flex flex-col gap-12 lg:gap-16 xl:gap-28 pb-12 lg:pb-16 xl:pb-28">
      <div className="relative  min-h-[300px]">
        {
          !isLoadingNews && noticia.portada && (
            <>
              <img
              src={noticia.portada}
              alt="Header background"
              className="absolute inset-0 object-cover w-full h-full"
              style={{ objectFit: "cover" }}
              />
              
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </>
          )
        }
        

        {/* Contenido del Header */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full  text-center">
          <Header
            color={`${!isLoadingNews && noticia.portada ? "bg-transparent" : "bg-[#C3C3C3]"}`}
            title={noticia.titulo ? noticia.titulo : "Noticia..."}
            text={noticia.fecha ? convertirFechaPersonalizada(noticia.fecha) : "-- --, ----"}
            return
            returnText="Noticias"
            linkReturn="/noticias-y-eventos"
          />
        </div>
      </div>

      {/* <div dangerouslySetInnerHTML={{__html: noticia.cuerpo}}></div> */}

      <div className="flex max-2xl:flex-col mx-auto px-8 max-w-[760px] min-[768px]:px-10 min-[1024px]:max-w-[1590px] min-[1650px]:w-full gap-4 2xl:gap-10">
        {
          !isLoadingNews && noticia.cuerpo ? (
            <div className="flex flex-col gap-10 2xl:w-8/12">
              <p className="standard-paragraph whitespace-pre-line" dangerouslySetInnerHTML={{ __html: noticia.cuerpo}}></p>
              {
                setIsLoadingNews && noticia.imagenes && Array.isArray(noticia.imagenes) && noticia.imagenes.map((link, index) => (
                  <img key={index} src={link} className="xl:w-[70%] self-center" alt={`imagen-${index}`} />
                ))
              }
              {/* <img src={Image1} className="xl:w-[70%] self-center" alt="" /> */}
              {/* <img src={Image2} className="xl:w-[70%] self-center" alt="" />
              <img src={Image3} className="xl:w-[70%] self-center" alt="" /> */}
            </div>
          ) :
          (
            <div className="flex justify-center gap-10 2xl:w-8/12 ">
              <MoonLoader 
                size={90}
              />
            </div>
          )
        }
        
        <div className="2xl:w-4/12">
          <h3 className="h3-subtitles mb-5">Eventos</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-1 gap-4 xl:gap-8 2xl:gap-6 place-items-center">
          {isLoadingFetchEventos // Mientras está cargando, muestra los skeletons
                ? Array(3) // Crear 6 skeletons como placeholders
                    .fill()
                    .map((_, index) => (
                      <EventsLoader key={index} /> // loading={true} activa los skeletons
                    ))
                : fetchEventos.map((event, index) => (
                    <EventCard
                      key={event._id}
                      date={event.fecha}
                      hora={event.hora}
                      title={event.titulo}
                      description={event.cuerpo}
                      location={event.ubicacion}
                    />
                  ))}
            {/* {fetchEventos.map((event, index) => (
              <EventCard
                key={index}
                date={event.fecha}
                hora={event.hora}
                title={event.titulo}
                description={event.cuerpo}
                location={event.ubicacion}
              />
            ))} */}
            {/* {fetchEventos.map((event) => (
              <EventCard
                date={event.fecha}
                title={event.titulo}
                description={event.descripcion}
                location={event.location}
              />
            ))} */}
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default Noticia;
