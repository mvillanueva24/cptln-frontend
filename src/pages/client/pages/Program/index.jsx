import { lazy, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JOELPhoto from "../../../../assets/Joel_1.jpg";
import PASIPhoto from "../../../../assets/PASI_3.jpg";

import { obtenerProgramasPorCategorias } from "@/Api/programas";
import { BuscarCategoriaPorNombre } from "@/Api/categorias";

const Header = lazy(() => import("@/pages/client/components/Header"));
const ProgramCard = lazy(() => import("@/pages/client/pages/Programs/components/ProgramCard.jsx"));

export const ProgramaEspecifico = () => {
    const { nombre } = useParams();
    const [programasCategoria, setProgramasCategoria] = useState([]);
    const [loadingProgramas, setLoadingProgramas] = useState(true);
    const [infoCategoria, setInfoCategoria] = useState("");
    const [loadingCategoria, setLoadingCategorias] = useState(true);

    useEffect(() => {
        const fetchProgramas = async () => {
            try {
                if (nombre) {
                    const formData = new FormData();
                    formData.append("nombre", nombre);
                    const response = await obtenerProgramasPorCategorias(formData);
                    setProgramasCategoria(response.data);
                    setLoadingProgramas(false);
                }
            } catch (error) {
                console.error("Error fetching programas:", error);
                setLoadingProgramas(false);
            }
        };
        
        fetchProgramas();
    }, []);

    useEffect(() => {
        const fetchCategoria = async () => {
            try {
                if (nombre) {
                    const formData = new FormData();
                    formData.append("nombre", nombre);
                    const response = await BuscarCategoriaPorNombre(formData);
                    setInfoCategoria(response.data);
                    // console.log(infoCategoria.color);
                    setLoadingCategorias(false);
                }
            } catch (error) {
                // console.error("Error fetching categoria:", error);
                setLoadingCategorias(false);
            }
        };
        
        fetchCategoria();
    }, []);

    useEffect(()=> {
        console.log(programasCategoria)
    },[programasCategoria])

    return (
        <div className="flex flex-col gap-12 lg:gap-16 xl:gap-24 pb-12 xl:pb-24">
            {loadingCategoria ? (
                <Header color={`#C3C3C3`} title="Cargando..." />
            ) : infoCategoria && infoCategoria.length ? (
                <Header 
                    color={infoCategoria[0].color} 
                    title={infoCategoria[0].nombre} 
                    return 
                    returnText="Programas" 
                    linkReturn="/programas" 
                />
            ) : (
                <Header color="#C3C3C3" title="Categoría no encontrada" />
            )}

            {loadingCategoria ? (
                <p className="standard-paragraph mx-10 sm:mx-auto md:mx-10 min-[930px]:mx-auto max-w-full max-md:max-w-[560px] max-lg:max-w-[800px] min-[880px]:mx-auto lg:mx-20 max-[1450px]:max-w-[1380px] xl:mx-24 min-[1700px]:mx-auto min-[1700px]:w-[1600px] min-[1800px]:w-[1550px]">Cargando ...</p>
            ) : infoCategoria && infoCategoria.length > 0 ? (
                <p className="standard-paragraph mx-10 sm:mx-auto md:mx-10 min-[930px]:mx-auto max-w-full max-md:max-w-[560px] max-lg:max-w-[800px] min-[880px]:mx-auto lg:mx-20 max-[1450px]:max-w-[1380px] xl:mx-24 min-[1700px]:mx-auto min-[1700px]:w-[1600px] min-[1800px]:w-[1550px]" dangerouslySetInnerHTML={{ __html: infoCategoria[0].descripcion }}></p>
            ) : ( "" )}

            {/* <p className="standard-paragraph mx-10 sm:mx-auto md:mx-10 min-[930px]:mx-auto max-w-full max-md:max-w-[560px] max-lg:max-w-[800px] min-[880px]:mx-auto lg:mx-20 max-[1450px]:max-w-[1380px] xl:mx-24 min-[1700px]:mx-auto min-[1700px]:w-[1600px] min-[1800px]:w-[1550px]">{programasCategoria[0].categoria}</p> */}

            <div className="flex flex-col gap-12 lg:gap-16 xl:gap-24">
                {!loadingProgramas && programasCategoria.map((programa, index) => (
                    <ProgramCard
                        key={programa._id}
                        color={programa.color}
                        title={programa.titulo}
                        img={programa.imagenes}
                        description={programa.descripcion}
                        posicion={index % 2 === 0 ? "izquierda" : "derecha"}
                        enlace={programa.enlace != null ? true : false}
                        link={`${programa.enlace ? programa.enlace: `/programas/${programa.categoria_id}/programa/${programa.titulo}`}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProgramaEspecifico;