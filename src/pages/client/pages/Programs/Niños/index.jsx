import { lazy } from "react";
import ProgramsImage from "../../../../../assets/ProgramsImage.jpg";
import JOELPhoto from "../../../../../assets/Joel_1.jpg";
import PASIPhoto from "../../../../../assets/PASI_3.jpg";

const Header = lazy(() => import("@/pages/client/components/Header"));
const ProgramCard = lazy(() => import("@/pages/client/pages/Programs/components/ProgramCard.jsx"));


export const Niños = () => {
    return(
        <div className="flex flex-col gap-12 lg:gap-16 xl:gap-24 pb-12 xl:pb-24">
            <Header color="bg-l_color_y-600" title="Programas de Niños y Adolescentes" return returnText="Programas" linkReturn="/programas"/>
            <div className="flex flex-col gap-12 lg:gap-16 xl:gap-24">
                <p className="standard-paragraph mx-10 sm:mx-auto md:mx-10 min-[930px]:mx-auto max-w-full max-md:max-w-[560px] max-lg:max-w-[800px] min-[880px]:mx-auto lg:mx-20 max-[1450px]:max-w-[1380px] xl:mx-24 min-[1700px]:mx-auto min-[1700px]:w-[1600px] min-[1800px]:w-[1550px]">Trabajamos con 3 proyectos relacionados a los niños, nuestro objetivo es poder enseñar valor y principios con fundamento bíblico sin descuidar temas actuales que tienen relevancia como lo es el abuso sexual infantil, cada tema tratado y lección aprendida están adecuadamente acompañados por una guía pedagógica escogida dependiendo de las edades de los menores. <br/> <br/> Cada programa está diseñado de cierta manera, diferenciándose por la cantidad de talleres, el tiempo por taller, la cantidad de audiencia, etc. Pero coinciden en el hecho de que para nosotros es importante también poder contar con el apoyo de los padres de familia y así reforzar lo enseñado en las clases dictadas en los diferentes programas.</p>
            <ProgramCard color="bg-l_color_y-700" title="JOEL" img={JOELPhoto} description="Trabajamos talleres basados en temas de valores con un enfoque bíblico,la enseñanza, también está acompañada de diversas dinámicas, para generar en cada niño y adolescente un aprendizaje significativo." link="niños-adolescentes/joel" posicion="izquierda"/>
            <ProgramCard color="bg-l_color_v-600" title="PASI" img={PASIPhoto} description="La finalidad es enseñar como actuar frente a una posible situacion de abuso sexual infantil, y de esta manera prevenir en ellos estos tipos de situaciones." link="niños-adolescentes/pasi"/>
            {/* <ProgramCard color="bg-l_color_r-600" title="Juntos en Comunidad" img={ProgramsImage} description="Este programa consiste en la realización de talleres de evangelización al aire libre, enfocados para niños, adolescentes y sus padres." link="niños-adolescentes/juntos-comunidad" posicion="izquierda"/> */}
            </div>
        </div>
    );
}

export default Niños