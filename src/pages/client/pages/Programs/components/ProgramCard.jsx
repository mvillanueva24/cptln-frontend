import { useEffect, useState } from "react";
import { GrLinkNext } from "react-icons/gr";

export const ProgramCard = ({ posicion = "derecha", img = [], ...props }) => {
    function convertirTexto(texto) {
        return texto ? texto.trim().toLowerCase().replace(/\s+/g, '-') : '';
    }

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = Array.isArray(img) ? img : [];

    useEffect(() => {
        // Solo configurar el intervalo si hay imágenes
        if (images.length > 0) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [images.length]);

    return (
        <div className={`mx-10 sm:mx-auto sm:min-w-[550px] md:mx-10 min-[930px]:mx-auto max-w-full max-md:max-w-[560px] max-lg:max-w-[800px] min-[880px]:mx-auto min-[880px]:min-w-[760px] lg:mx-20 md:flex md:h-[350px] lg:h-[500px] min-[1100px]:h-[550px] xl:h-[650px] 2xl:h-[750px] max-[1450px]:max-w-[1380px] xl:mx-24 min-[1700px]:mx-auto min-[1700px]:w-[1600px] min-[1800px]:w-[1550px] lg:relative`}>
            <div className="md:flex md:w-1/2 lg:w-full">
                <div className={`h-full lg:w-2/6 max-lg:hidden ${posicion === "izquierda" ? "order-1 lg:rounded-l-[12px]" : "order-2 lg:rounded-r-[12px]"}`}
                    style={{
                        backgroundColor: props.color || '#ffffff',
                    }}
                ></div>
                <div className={`relative h-[220px] min-[500px]:h-[280px] md:h-full w-full lg:w-4/6 ${posicion === "izquierda" ? "order-2 lg:rounded-r-[12px]" : "order-1 lg:rounded-l-[12px]"}`}>
                    {images.length > 0 ? (
                        images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`img-${index}`}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                } max-md:rounded-t-[16px] md:rounded-l-[16px] lg:rounded-l-[0px] ${
                                    posicion === "izquierda" ? "lg:rounded-r-[12px]" : "lg:rounded-l-[12px]"
                                }`}
                                style={{ transition: 'opacity 1s ease-in-out' }}
                            />
                        ))
                    ) : (
                        // Placeholder o imagen por defecto cuando no hay imágenes
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">No image available</span>
                        </div>
                    )}
                </div>
            </div>
            <div className={`lg:absolute lg:h-96 ${
                posicion === "izquierda" 
                    ? "lg:inset-y-0 lg:left-20 xl:left-32 2xl:left-44" 
                    : "lg:inset-y-0 lg:right-20 xl:right-32 2xl:right-44"
            } lg:my-auto min-[1100px]:h-[28rem] max-md:h-[350px] md:w-1/2 xl:max-w-[540px] 2xl:h-[30rem] max-md:rounded-b-[16px] lg:rounded-[12px] md:rounded-r-[16px] bg-white`}>
                <div className="p-8 lg:p-10 xl:p-14 flex flex-col h-full w-full">
                    <h3 className="max-md:text-[1.625em] max-lg:text-[1.875em] max-[1110px]:text-[2.1875em] text-[2.5em] font-bold leading-[1.25em] text-[#222126]">
                        {props.title || 'Sin título'}
                    </h3>
                    <p 
                        className="mt-4 lg:mt-6 xl:mt-8 font-normal text-[1.30em] leading-[1.5em] max-[1100px]:text-[1.125em] max-[1100px]:leading-[1.4em] text-[#555656] line-clamp-[7] min-[375px]:line-clamp-[8] min-sm:line-clamp-none"
                        dangerouslySetInnerHTML={{ __html: props.description || '' }}
                    ></p>
                    <a 
                        href={props.enlace ? props.link : convertirTexto(props.link)} target={props.enlace ? "_black" : "_self"}
                        className="flex items-center gap-3 self-end mt-auto font-bold text-[1.2em] leading-[1.5em] max-[1100px]:text-[1.075em] max-[1100px]:leading-[1.4em] text-[#3C5050] hover:text-[#46797A] rounded-md"
                    >
                        <span>Conocer más</span>
                        <GrLinkNext />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ProgramCard;