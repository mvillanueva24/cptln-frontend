import { lazy, useEffect, useState } from "react";
import ImagenNoticia1 from "../../../../assets/img_N_card.png";
// import {NewsLoader} from "../../components/Loaders/NewsLoader"

import { obtenerNoticiasPag } from "@/Api/noticias";
import { obtenerEventos } from "@/Api/eventos";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import data from "../../data.json"

const Header = lazy(() => import("@/pages/client/components/Header"));
const NewsCard = lazy(() => import("@/pages/client/components/NewsCard"));
const EventCard = lazy(() => import("@/pages/client/components/EventCard"));
const NewsLoader = lazy(() => import("@/pages/client/components/Loaders/NewsLoader.jsx"));
const EventsLoader = lazy(() => import("@/pages/client/components/Loaders/EventsLoader.jsx"));

export const NewsEvents = () => {

  const [ fetchNoticias, setFetchNoticias ] = useState([])
  const [ fetchEventos, setFetchEventos ] = useState([])
  const [isLoadingNews, setIsLoadingNews] = useState(true); // Nuevo estado de carga
  const [isLoadingEvents, setIsLoadingEventes] = useState(true); // Nuevo estado de carga

  const [isTransitioning, setIsTransitioning] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {  
    const fetch = async (page) => {
      setIsTransitioning(true);
      const response = await obtenerNoticiasPag({ params: { page: Number(page), limit: 4 } })
      // console.log(response)
      setFetchNoticias(response.data.noticias)
      console.log(response.data)
      setIsLoadingNews(false);
      setCurrentPage(response.data.currentPage); // Actualizar la página actual
      setTotalPages(response.data.totalPages); // Actualizar el total de páginas
      setIsTransitioning(false);
    }
    fetch(currentPage);
  }, [currentPage]);

  useEffect(() => {  
    const fetchEvent = async () => {
      const response = await obtenerEventos()
      // console.log(response)
      setFetchEventos(response.data)
      setIsLoadingEventes(false);
    }
    fetchEvent();
  }, []);
  

  const handleNextPage = () => {
      if (currentPage < totalPages && !isTransitioning) {
          setCurrentPage(currentPage + 1);
      }
  };

  const handlePreviousPage = () => {
      if (currentPage > 1 && !isTransitioning) {
          setCurrentPage(currentPage - 1);
      }
  };

  const handlePage = (index) => {
    if (!isTransitioning) {
      setCurrentPage(index);
    }
  };

  return (
    <div className="flex flex-col gap-12 lg:gap-16 xl:gap-28 pb-12 lg:pb-16 xl:pb-28">
      <Header color="bg-l_color_o-600" title="Noticias y Eventos" />
      <div className="flex max-2xl:flex-col mx-auto px-8 max-w-[760px] min-[768px]:px-10 min-[1024px]:max-w-[1590px] min-[1650px]:w-full gap-4 2xl:gap-10">
          <div className="min-[310px]:mx-auto min-[1110px]:mx-10 2xl:mx-auto">
            <h3 className="h3-subtitles mb-5">Noticias</h3>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-3">
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
            <div className="flex flex-wrap items-center justify-center max-w-[1300px] mx-auto gap-2 md:gap-7 mt-8">
              <button
                className={`px-4 py-2 text-sm rounded-md text-l_color_o-600 bg-white hover:bg-l_color_v hover:text-white transition-colors ${
                  currentPage === 1 || isLoadingNews ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handlePreviousPage}
                disabled={currentPage === 1 || isLoadingNews}
              >
                <FaAngleLeft size={22}/>
              </button>

              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                const isFirstTwo = pageNumber <= 2;
                const isLastTwo = pageNumber > totalPages - 2;
                const isCurrentPage = pageNumber === currentPage;

                // En tablet, mostrar solo los dos primeros y los dos últimos números
                if (isFirstTwo || isLastTwo || isCurrentPage) {
                  return (
                    <button
                      key={index}
                      className={`px-4 py-2 text-base font-bold rounded-md  hover:text-white hover:bg-l_color_v transition-colors  ${
                        currentPage === pageNumber ? "bg-l_color_v text-white shadow-xl" : "bg-white text-l_color_v shadow-md"
                      }`}
                      onClick={() => handlePage(pageNumber)}
                      disabled={isLoadingNews || isTransitioning}
                    >
                      {pageNumber}
                    </button>
                  );
                }

                // Puntos suspensivos después de los primeros dos números
                if (pageNumber === 3 && currentPage > 3 && !isLastTwo) {
                  return (
                    <button
                      key="dots"
                      className="px-4 py-2 text-base font-bold rounded-md text-l_color_v bg-white  cursor-default"
                      disabled
                    >
                      ...
                    </button>
                  );
                }

                // Puntos suspensivos antes de los últimos dos números
                if (pageNumber === totalPages - 2 && currentPage < totalPages - 2 && !isFirstTwo) {
                  return (
                    <button
                      key="dots-end"
                      className="px-4 py-2 text-base font-bold rounded-md text-l_color_v bg-white cursor-default"
                      disabled
                    >
                      ...
                    </button>
                  );
                }

                return null;
              })}

              <button
                className={`px-4 py-2 text-base rounded-md text-l_color_o-600 bg-white hover:bg-l_color_v hover:text-white transition-colors ${
                  currentPage === totalPages || isLoadingNews ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleNextPage}
                disabled={currentPage === totalPages || isLoadingNews}
              >
                <FaAngleRight size={22}/>
              </button>
            </div>
          </div>

          <div className="w-full min-[360px]:mx-auto md:max-w-[630px] lg:max-w-[950px] xl:max-w-[1280px] 2xl:max-w-[530px] ">
            <h3 className="h3-subtitles mb-5">Eventos</h3>
            <div className={`grid grid-cols-1 ${fetchEventos && fetchEventos.length > 1 && "lg:grid-cols-2" } lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-1 gap-4 xl:gap-8 2xl:gap-6 place-items-center 2xl:max-w-[530px]`}>
              {isLoadingEvents // Mientras está cargando, muestra los skeletons
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
              {/* <EventCard
              date="ABR 30 2024"
              title="Evento 1"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
              location="Av. Independencia N° 100"
            />
            <EventCard
              date="ABR 30 2024"
              title="Evento 1"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
              location="Av. Independencia N° 100"
            />
            <EventCard
              date="ABR 30 2024"
              title="Evento 1"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
              location="Av. Independencia N° 100"
            /> */}
            </div>
          </div>
        
      </div>
    </div>
  );
};

export default NewsEvents;

