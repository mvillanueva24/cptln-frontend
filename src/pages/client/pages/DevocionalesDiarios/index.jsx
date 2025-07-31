import { lazy, useEffect, useState } from "react";

const Header = lazy(() => import("@/pages/client/components/Header"));

const Devocionales = lazy(() => import("@/pages/client/components/Devocionales"));
const DevocionalLoader = lazy(() => import("@/pages/client/components/Loaders/DevocionalLoader.jsx"));

import { obtenerDevocional } from "@/Api/devocionales";

export const DevocionalesDiarios = () => {

    const [fetchDevocionales, setFetchDevocionales] = useState([])
    const [isDevocionalLoading, setDevocionalLoading] = useState(true);

    useEffect(() => {
        const fetchDevocional = async () =>{
            const response = await obtenerDevocional()
            setFetchDevocionales(response.data)
            setDevocionalLoading(false)
        }
        fetchDevocional()
    }, [])

    return (
        <div className="flex flex-col gap-12 lg:gap-16 xl:gap-28 pb-12 lg:pb-16 xl:pb-28">
            <Header title={'Devocionales Diarios'} color="bg-l_color_y-600" />
            <div className="flex mx-5 sm:mx-10 md:mx-10 md:max-w-[1000px] lg:mx-10 min-[1110px]:mx-auto min-[1110px]:max-w-[1000px] max-xl:flex-col gap-10 xl:mx-24 xl:max-w-[1500px] 2xl:gap-12 2xl:max-w-[1880px] 2xl:mx-24 min-[1650px]:mx-auto min-[1650px]:max-w-[1520px]  ">
                <div className={`grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 order-2 xl:order-1 justify-center w-full ${isDevocionalLoading ? "gap-24" : "gap-10"} `}>
                    {/* {
                        fetchDevocionales.map((devocional) => (
                            <Devocionales key={devocional._id} title={devocional.titulo} fecha={devocional.fecha} versiculo={devocional.versiculo}/>
                        ))

                    } */}

                    {isDevocionalLoading // Mientras está cargando, muestra los skeletons
                        ? Array(6) // Crear 6 skeletons como placeholders
                            .fill()
                            .map((_, index) => (
                                <DevocionalLoader key={index} /> // loading={true} activa los skeletons
                            ))
                        : fetchDevocionales.map((devocional, index) => (
                            <a className="w-full" href={`/recursos/devocional/${devocional._id}`} key={devocional._id}>
                                <Devocionales title={devocional.titulo} fecha={devocional.fecha} versiculo={devocional.versiculo}/>
                            </a>
                    ))}

                    {/* <Devocionales/>
                    <Devocionales/>
                    <Devocionales/>
                    <Devocionales/>
                    <Devocionales/>
                    <Devocionales/>
                    <Devocionales/>
                    <Devocionales/> */}
                </div>
                {/* <div className="flex flex-col  max-w-[500px] xl:max-w-[300px] w-full max-xl:self-center h-max order-1 xl:order-2 max-xl:float">
                    <span className="font-bold text-2xl text-nowrap">Filtrar Devocionales</span>
                    <label className="font-semibold mt-3">Mes</label>
                    <select name="" id="" className="p-2 rounded-md accent-white">
                        <option value="" className="p-1">Enero</option>
                        <option value="">Febrero</option>
                        <option value="">Marzo</option>
                        <option value="">Abril</option>
                        <option value="">Mayo</option>
                        <option value="">Junio</option>
                        <option value="">Julio</option>
                        <option value="">Agosto</option>
                        <option value="">Septiembre</option>
                        <option value="">Octubre</option>
                        <option value="">Noviembre</option>
                        <option value="">Diciembre</option>
                    </select>

                    <label className="font-semibold mt-4">Año</label>
                    <input type="text" placeholder="Ingrese un año" className="p-2 placeholder:ml-2 mb-4"/>
                    <button className="p-1 text-white bg-[#46797A] rounded-md">
                        Filtrar
                    </button>
                </div> */}
            </div>
        </div>
    )
}

export default DevocionalesDiarios