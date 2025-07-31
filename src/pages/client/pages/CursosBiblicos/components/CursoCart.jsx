import { lazy, useState } from "react";
const YoutubeEmbed = lazy(() => import("@/pages/client/components/YoutubeEmbed"));

export const CursoCart = ({  scrollToElement, titulo, descripcion, capitulos, preview, previewVideo, state, id  }) => {
    // console.log(preview)
    return (
        <div className="grid w-full grid-cols-1 lg:grid-cols-2">
            {/* Sección del video */}
            <div className="flex flex-col justify-center gap-5 lg:py-8 lg:px-10 lg:bg-[#47797A]/80 lg:rounded-l-xl">
                <span className="block text-center max-md:text-[1.3em] max-lg:text-[1.5em] max-[1110px]:text-[1.7em] text-[1.9em] font-bold leading-[1.25em] lg:text-white">Capítulo 1: {preview}</span>
                <YoutubeEmbed videoId={previewVideo} />
            </div>

            {/* Sección de información y capítulos */}
            <div className="flex flex-col gap-3 px-7 py-4 bg-white rounded-b-xl lg:rounded-b-none lg:rounded-r-xl">
                <div className="text-center">
                    <span className="block h3-subtitles ">Curso "{!titulo ? 'Título' : titulo}"</span>
                </div>

                <div className="flex flex-grow">
                    <span className="text-justify standard-paragraph line-clamp-[8]" dangerouslySetInnerHTML={{ __html: !descripcion ? 'Descripción' : descripcion}}></span>
                </div>

                <h4 className="block max-md:text-[1.3em] max-lg:text-[1.5em] max-[1110px]:text-[1.7em] text-[1.9em] font-bold leading-[1.25em] ">Capítulos de "{titulo}"</h4>

                <ol className="space-y-2 list-decimal list-inside standard-paragraph columns-1 sm:columns-2">
                    {
                        capitulos && capitulos.map((map) => (
                            <li>{map.titulo}</li>
                        ))
                    }
                    {/* <li>¿Por qué Jesús?</li>
                    <li>¿Por qué la Biblia?</li>
                    <li>Los diez mandamientos</li>
                    <li>La naturaleza de Dios</li>
                    <li>La obra de Cristo</li>
                    <li>El Espíritu Santo</li>
                    <li>La oración</li>
                    <li>El Bautismo</li>
                    <li>Confesión y absolución</li>
                    <li>La Santa Comunión</li>
                    <li>El fin de los tiempos</li>
                    <li>La vida cristiana</li> */}
                </ol>

                <div className="flex justify-end my-2">
                    {
                    !state ? (
                        <button className="px-4 py-2 text-white transition-all duration-300 rounded-md border-[#A25F3B] bg-[#A25F3B]/80 hover:shadow-md hover:bg-[#A25F3B]" onClick={() => scrollToElement()}>
                        Conseguir curso
                    </button>
                        ) :
                        (
                        <a href={`/recursos/cursos-biblicos/${id}`}>
                            <button className="px-4 py-2 text-white transition-all duration-300 border-[#A25F3B] rounded-md bg-[#A25F3B]/80 hover:shadow-md hover:bg-[#A25F3B]" onClick={() => scrollToElement()}>
                                Entrar al curso
                            </button>
                        </a>
                        )
                    }
                    {/* <button className="px-4 py-2 text-white transition-all duration-300 rounded-md bg-l_color_o-400 hover:shadow-md" onClick={() => scrollToElement()}>
                        Entrar al curso
                    </button> */}
                </div>
            </div>
        </div>
    )
}

export default CursoCart;