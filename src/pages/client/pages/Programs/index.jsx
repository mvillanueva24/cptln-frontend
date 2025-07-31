import { lazy, useState, useEffect } from "react";
import LugarFe from "../../../../assets/Lugar_fe.jpg";
import JOELPhoto from "../../../../assets/Joel_1.jpg";
import EquipandoImg from "../../../../assets/Equipando_santos.jpg";
import CreciendoFamilia from "../../../../assets/creciendo-en-familia.jpg";
import { obtenerCategorias } from "@/Api/categorias";
import { obtenerProgramas } from "@/Api/programas";
import { obtenerDatosDeRadio } from "@/Api/radio";
import ImageNotFound from "../../../../assets/image_not_found.jpg";

const Header = lazy(() => import("@/pages/client/components/Header"));
const ProgramCard = lazy(() => import("@/pages/client/pages/Programs/components/ProgramCard.jsx"));

export const Programs = () => {
    const [fetchCategorias, setFetchCategorias] = useState([]);
    const [isLoadingCategorias, setIsLoadingCategorias] = useState(true);

    const [fetchProgramasSinCategoria, setFetchProgramasSinCategoria] = useState([]);
    const [isLoadingProgramasSinCategoria, setIsLoadingProgramasSinCategoria] = useState(true);    

    const [datosRadio, setDatosRadio] = useState([]);
    const [isLoadingRadio, setIsLoadingRadio] = useState(true);

    useEffect(() => {  
        const fetch = async () => {
            const response = await obtenerCategorias();
            setFetchCategorias(response.data);
            setIsLoadingCategorias(false);
        };
        fetch();

        const fetchRadio = async () => {
            const response = await obtenerDatosDeRadio();
            setDatosRadio(response.data);
            setIsLoadingRadio(false);
        };
        fetchRadio();
    }, []);

    useEffect(() => {  
        const fetch = async () => {
            const response = await obtenerProgramas();
            setFetchProgramasSinCategoria(response.data);
            setIsLoadingProgramasSinCategoria(false);
        };
        fetch();
    }, []);

    let posicionDerecha = true; // Variable de control para alternar entre derecha e izquierda

    return (
        <div className="flex flex-col gap-12 lg:gap-16 xl:gap-24 pb-12 xl:pb-24">
            <Header color="bg-l_color_y-600" title="Programas" />
            <div className="flex flex-col gap-12 lg:gap-16 xl:gap-24">
                {isLoadingCategorias ? (
                    <div>Loading...</div>
                ) : (
                    fetchCategorias.map((categoria) => {
                        const posicion = posicionDerecha ? "derecha" : "izquierda";
                        posicionDerecha = !posicionDerecha; // Alternar entre derecha e izquierda

                        return (
                            <ProgramCard 
                                key={categoria._id}
                                color={categoria.color} 
                                title={categoria.nombre} 
                                img={categoria.imagenes ? categoria.imagenes : ImageNotFound}  
                                description={categoria.descripcion} 
                                posicion={posicion} 
                                link={`programas/${categoria.nombre}`}
                            />
                        );
                    })
                )}
                
                <ProgramCard 
                    key={datosRadio._id}
                    color="#589898" 
                    title={datosRadio.nombre} 
                    img={datosRadio.imagenes ? datosRadio.imagenes : ImageNotFound}  
                    description={datosRadio.descripcion} 
                    posicion={posicionDerecha ? "derecha" : "izquierda"}
                    link={`/programa/creciendo-en-familia`}
                />
                
                {fetchProgramasSinCategoria.map((programa) => {
                    if (!programa.categoria_id) {
                        const posicion = posicionDerecha ? "izquierda" : "derecha";
                        posicionDerecha = !posicionDerecha; // Alternar entre derecha e izquierda

                        return (
                            <ProgramCard 
                                key={programa._id}
                                color={programa.color} 
                                title={programa.titulo} 
                                img={programa.imagenes ? programa.imagenes : ImageNotFound}  
                                description={programa.descripcion} 
                                posicion={posicion}
                                enlace={programa.enlace != null}
                                link={programa.enlace != null ? programa.enlace : `programa/${programa.titulo}`}
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}

export default Programs;
