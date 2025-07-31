import { lazy, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {RadioCard} from "../components/RadioCard";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { obtenerContenidoSeccionPagination } from "@/Api/radio";

import MoonLoader  from "react-spinners/MoonLoader";

const Header = lazy(() => import("@/pages/client/components/Header"));

export const CreciendoEnFamilia = () => {

    const [ contenidoData, setContenidoData ] = useState([]);
    const [ isContenidoData, setIsContenidoData ] = useState(true);

    const [isTransitioning, setIsTransitioning] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { id } = useParams();

    useEffect(() => {
        const fetch = async (page) => {
            setIsTransitioning(true);
            const response = await obtenerContenidoSeccionPagination(id,  { page: Number (page), limit: 6 } );
                // console.log(response)
            setContenidoData(response.data);
            console.log(response.data)
            setIsContenidoData(false);
            setCurrentPage(response.data.currentPage); // Actualizar la página actual
            setTotalPages(response.data.totalPages); // Actualizar el total de páginas
            // console.log(response.data.currentPage)
            // console.log(response.data.totalPages)
            setIsTransitioning(false);
        };
        fetch(currentPage);
    }, [currentPage])

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


    return(
        <div className="flex flex-col gap-12 lg:gap-16 xl:gap-24 pb-12 xl:pb-24">
            <Header color="bg-l_color_o-600" title={`Sección: ${contenidoData.seccion ? contenidoData.seccion : "..."}`}/>
            <div className="flex flex-col gap-12 lg:gap-16 xl:gap-24">
                <div className="mx-6 min-[450px]:mx-auto md:mx-10 min-[930px]:mx-auto max-w-full max-md:max-w-[560px] max-lg:max-w-[800px] min-[880px]:mx-auto lg:mx-20 max-[1450px]:max-w-[1380px] xl:mx-24 min-[1700px]:mx-auto min-[1700px]:w-[1600px] min-[1800px]:w-[1550px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">

                        {
                            !isTransitioning ? (!isContenidoData && contenidoData.contenidosJson && contenidoData.contenidosJson.map((cont, index2) => (
                                <RadioCard key={index2} descripcion={cont.descripcion} contenido={cont.archivos}/>
                            ))) : (
                                !isContenidoData && contenidoData.contenidosJson && contenidoData.contenidosJson.map((cont, index2) => (
                                    <MoonLoader key={index2} size={90} />
                                ))
                            )
                        }
                        
                        {/* <RadioCard descripcion="akjdna akjsndaskjd aosndak andasd alkdnad admkasdm askdasdkan akdasdn adklsd akdaskd akdnaskd kasdaksd ksadksald kandkad klasdnasd lkasdnasd lkndas dlkansd aslkadmnas lkasdnask alkdna ks ksnd alsdkjasnqwourfh"/>
                        <RadioCard descripcion="akjdna akjsndaskjd aosndak andasd alkdnad admkasdm askdasdkan akdasdn adklsd akdaskd akdnaskd kasdaksd ksadksald kandkad klasdnasd lkasdnasd lkndas dlkansd aslkadmnas lkasdnask alkdna ks ksnd alsdkjasnqwourfh"/>
                        <RadioCard descripcion="akjdna akjsndaskjd aosndak andasd alkdnad admkasdm askdasdkan akdasdn adklsd akdaskd akdnaskd kasdaksd ksadksald kandkad klasdnasd lkasdnasd lkndas dlkansd aslkadmnas lkasdnask alkdna ks ksnd alsdkjasnqwourfh"/>
                        <RadioCard descripcion="akjdna akjsndaskjd aosndak andasd alkdnad admkasdm askdasdkan akdasdn adklsd akdaskd akdnaskd kasdaksd ksadksald kandkad klasdnasd lkasdnasd lkndas dlkansd aslkadmnas lkasdnask alkdna ks ksnd alsdkjasnqwourfh"/>
                        <RadioCard descripcion="akjdna akjsndaskjd aosndak andasd alkdnad admkasdm askdasdkan akdasdn adklsd akdaskd akdnaskd kasdaksd ksadksald kandkad klasdnasd lkasdnasd lkndas dlkansd aslkadmnas lkasdnask alkdna ks ksnd alsdkjasnqwourfh"/>
                        <RadioCard descripcion="akjdna akjsndaskjd aosndak andasd alkdnad admkasdm askdasdkan akdasdn adklsd akdaskd akdnaskd kasdaksd ksadksald kandkad klasdnasd lkasdnasd lkndas dlkansd aslkadmnas lkasdnask alkdna ks ksnd alsdkjasnqwourfh"/>
                        <RadioCard descripcion="akjdna akjsndaskjd aosndak andasd alkdnad admkasdm askdasdkan akdasdn adklsd akdaskd akdnaskd kasdaksd ksadksald kandkad klasdnasd lkasdnasd lkndas dlkansd aslkadmnas lkasdnask alkdna ks ksnd alsdkjasnqwourfh"/> */}
                    </div>
                    <div className="flex flex-wrap items-center justify-center max-w-[1300px] mx-auto gap-2 md:gap-7 mt-8">
                        <button
                            className={`px-4 py-2 text-sm rounded-md text-l_color_o-600 bg-white hover:bg-l_color_v hover:text-white transition-colors ${
                            currentPage === 1 || isContenidoData ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1 || isContenidoData}
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
                                disabled={isContenidoData || isTransitioning}
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
                            currentPage === totalPages || isContenidoData ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            onClick={handleNextPage}
                            disabled={(currentPage === totalPages) || isContenidoData}
                        >
                            {console.log("adad" + currentPage)}
                            {console.log("kamakm" + totalPages)}
                            <FaAngleRight size={22}/>
                        </button>
                        </div>
                </div>
            
            </div>
        </div>
    );
}

export default CreciendoEnFamilia