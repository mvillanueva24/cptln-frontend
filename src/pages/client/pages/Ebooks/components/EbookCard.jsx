export const EbookCard = (props) => {
    return (
        <div className="relative h-80 w-64 xl:h-96 xl:w-80 group">
            <div className="bg-black/70 z-20 w-full h-full absolute text-white p-5  opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex justify-center items-center text-center ">
                {props.descripcion}
            </div>
            <img src={props.img} alt="image" className="w-full h-full object-cover bg-center mb-1" />
            {
                !props.state ? (
                    <button className=" w-full flex gap-2 justify-center items-center py-2 rounded-md bg-l_color_v text-white text-sm sm:text-base xl:text-lg hover:bg-[#3a6567]" onClick={() => props.scrollToElement()}>
                        {/* <FaRegFilePdf/> */}
                        Obtenerlo
                    </button>
                    ) :
                    (
                    <a href={props.pdf} target="_blank">
                        <button className="w-full flex gap-2 justify-center items-center py-2 rounded-md bg-l_color_v text-white text-sm sm:text-base xl:text-lg hover:bg-[#3a6567]">
                            {/* <FaRegFilePdf/> */}
                            Descargarlo
                        </button>
                    </a>
                    )
            }
            <div className="absolute inset-0 flex flex-col justify-between">
                <div className="bg-l_color_v-600/80 px-3 py-1 xl:mt-5 h-[88px] lg:h-[96px]">
                <div className="flex flex-col justify-between h-full">
                    <span className="font-light text-[1.125em] leading-[1.5em] max-[1100px]:text-[1em] max-[1100px]:leading-[1.4em] text-white h-full flex items-center">
                        Ebook
                    </span>
                    <h4 className="font-bold text-[1.25em] leading-[1.5em] max-[1100px]:text-[1.125em] max-[1100px]:leading-[1.4em] text-white h-full flex items-center">
                        {props.titulo}
                    </h4>
                </div>
                </div>
                {/* <div className="bg-l_color_v-600/75 px-3 py-3 flex justify-center">
                {
                    props.state ? (
                    <span className="font-bold text-[1.125em] leading-[1.5em] max-[1100px]:text-[1em] max-[1100px]:leading-[1.4em] text-white">
                        DESCARGAR
                    </span>
                    ) :
                    (
                    <span className="font-bold text-[1.125em] leading-[1.5em] max-[1100px]:text-[1em] max-[1100px]:leading-[1.4em] text-white">
                        VER MÁS
                    </span>
                    )
                }
                <span className="font-bold text-[1.125em] leading-[1.5em] max-[1100px]:text-[1em] max-[1100px]:leading-[1.4em] text-white">
                        VER MÁS
                </span>
                
                </div> */}
            </div>
            
            
        </div>
    );
};

export default EbookCard;