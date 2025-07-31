import { lazy, useState, useEffect } from "react";
import videotest from '../../../../assets/file.mp4';
import WhiteIcon from "../../../../assets/WhiteIcon.png";
import { FaRegFilePdf } from "react-icons/fa";
import { useParams } from "react-router-dom";

const Header = lazy(() => import("@/pages/client/components/Header"));
const YoutubeEmbed = lazy(() => import("@/pages/client/components/YoutubeEmbed"));

import { obtenerCursoID } from "@/Api/cursos";

export const CursosCompletos = () => {

    const {id} = useParams();

    const [fetchCursosVideos, setFetchCursosVideos] = useState([]);
    const [isLoadingFetchCursosVideos, setLoadingIsFetchCursosVideos] = useState(true);

    useEffect(() => {
        const fetchDevocional = async () =>{
            const response = await obtenerCursoID(id)
            setFetchCursosVideos(response.data)
            setLoadingIsFetchCursosVideos(false)
        }
        fetchDevocional()
    }, [])

    // useEffect(() => {
    //     // Ensure data_curso contains valid data and assign the 'videos' array to state.
    //     if (data_curso && data_curso.data && data_curso.data.length > 0) {
    //         setFetchCursosVideos(data_curso.data[0].videos || []);
    //     }
    // }, []);

    return (
        <div className="flex flex-col gap-12 lg:gap-16 xl:gap-28 pb-12 lg:pb-16 xl:pb-28">
            <Header color="bg-l_color_o-600" title={`Curso "${!isLoadingFetchCursosVideos && fetchCursosVideos.titulo}"`} />
            <div className="flex flex-col px-7 sm:px-10 lg:px-20 2xl:px-40 rounded-xl justify-center">
                <p className="standard-paragraph mb-6" dangerouslySetInnerHTML={{ __html: fetchCursosVideos.descripcion}}></p>
                {/* <p className="standard-paragraph mb-6">Cada uno de los 12 videos contiene una guía de estudio con referencias bíblicas y preguntas de reflexión y discusión. Estas sesiones pueden ser utilizadas en las clases para nuevos miembros o como material de estudio de grupos, dado que a través de ellas ese Dios, que “no escatimó a su propio Hijo, sino que lo entregó por nosotros” (Romanos 6:32a) se revela para que lo conozcamos más y profundicemos así nuestra relación con él.</p> */}
                <div className="grid gap-x-5 gap-y-5 grid-cols-1 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-10 ">
                    {
                        !isLoadingFetchCursosVideos && fetchCursosVideos.capitulos.length > 0 ? (
                            fetchCursosVideos.capitulos.map((video, index) => (
                                <div key={video._id} className="flex flex-col gap-3">
                                    <h2 className="block text-center max-md:text-[1.3em] max-lg:text-[1.5em] max-[1110px]:text-[1.7em] text-[1.9em] font-bold leading-[1.25em]">Capítulo {index+1}: {video.titulo}</h2>
                                    <YoutubeEmbed videoId={video.idYoutube} />
                                    <a href={video.pdf} target="_blank">
                                        <button className="flex gap-2 justify-center items-center py-2 w-full rounded-md border bg-l_color_v text-white text-sm sm:text-base xl:text-lg hover:bg-[#3a6567]">
                                            <FaRegFilePdf/>
                                            Descargar Guía de Estudio
                                        </button>
                                    </a>
                                </div>
                            ))
                        ) : (
                            <p>No videos available</p>
                        )
                    }
                </div>
                

            </div>
        </div>
    );
};

export default CursosCompletos;