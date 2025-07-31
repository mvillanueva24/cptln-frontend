import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Joel from "../../../../../assets/Día_del_Nino_1.jpg"
import ImageNotFound from "@/assets/image_not_found.jpg";

export const HomeProgramsCard = ({ program, radio = false }) => {
  const navigate = useNavigate();
  const [imagen, setImagen] = useState('');
  const [imagenList, setImagenList] = useState([]);

  useEffect(() => {
    setImagenList(program.imagenes)
    if (imagenList) {
      const img = imagenList.find((img) => img.estado);

      if (img) {
        setImagen(img.ruta);
        // console.log(img.ruta)
      }
    }
  }, [imagenList]); // Dependencia de useEffect

  const sendToProgram = (link) => {
    navigate(link);
  };

  const getImageUrl = () => {
    if (program?.imagenes?.length > 0 || program.portadaEnlace){
      if (!program.portadaEnlace) {
        return program.imagenes[program.indicePortada - 1];
      } else {
        return program.portadaEnlace;
      }
    } else {
      return (ImageNotFound);
    }
     // Imagen por defecto
  };

  const getImageUrl2 = () => {
    if (program?.imagenes?.length > 0 || program.portadaEnlace){
      if (!program.portadaEnlace) {
        return program.imagenes[0];
      } else {
        return program.portadaEnlace;
      }
    } else {
      return (ImageNotFound);
    }
     // Imagen por defecto
  };


{/* <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">No image available</span>
                        </div> */}

  return (
    <div
      className="relative w-full h-64 overflow-hidden rounded-[10px] lg:h-72 xl:h-80 2xl:h-96 cursor-pointer "
    >
      {
        !radio ? (
          <>
          <img src={getImageUrl()} alt="Imagen" className="w-full h-full object-cover bg-center hover:scale-105 transition-all duration-500"/>
          <div
            className={`absolute bottom-0 left-0 flex flex-col items-center justify-center p-2 text-white  w-full max-md:rounded-b-[10px] md:rounded-bl-lg md:rounded-tr-lg md:w-2/5 md:py-3 xl:py-4 2xl:py-6`}
            style={{
              backgroundColor : program.color,
            }}
          >
            <span className="text-sm xl:text-base">{program.categoria}</span>
            <span className="text-base xl:text-xl font-bold">{program.abreviatura}</span>
          </div>
          </>
        ) :
        (
          <>
          <img src={program.imagenes && program.imagenes[0]} alt="Imagen" className="w-full h-full object-cover bg-center hover:scale-105 transition-all duration-500"/>
          <div
            className={`absolute bottom-0 left-0 flex flex-col items-center justify-center p-2 text-white  w-full max-md:rounded-b-[10px] md:rounded-bl-lg md:rounded-tr-lg md:w-2/5 md:py-3 xl:py-4 2xl:py-6`}
            style={{
              backgroundColor : "#589898",
            }}
          >
            <span className="text-base xl:text-xl font-bold">{program.nombre}</span>
          </div>
          </>
        )
      }
      
    </div>
  );
};

export default HomeProgramsCard;
