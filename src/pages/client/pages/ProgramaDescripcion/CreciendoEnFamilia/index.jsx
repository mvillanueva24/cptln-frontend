import { lazy, useState, useEffect } from "react";
import {RadioCard} from "../components/RadioCard";
import {MediaSlider} from "./components/MediaSlider";
import { obtenerRadioDataCliente, obtenerDatosDeRadio } from "@/Api/radio";

const Header = lazy(() => import("@/pages/client/components/Header"));

export const CreciendoEnFamilia = () => {

    const [ datosRadio, setDatosRadio ] = useState();
    const [ isLoadingDatos, setIsLoadingDatos ] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const response = await obtenerRadioDataCliente({"limit":3});
            // console.log(response)
            setDatosRadio(response.data);
            // console.log(response.data[0].nombre)
            setIsLoadingDatos(false);
        };
        fetch();
    }, [])


    return(
        <div className="flex flex-col gap-12 lg:gap-16 xl:gap-24 pb-12 xl:pb-24">
            {isLoadingDatos ? (
                <Header color={`#C3C3C3`} title="Cargando..." />
            ) : (
                <Header color="bg-[#589898]" title={datosRadio && datosRadio.nombre}/>
            ) }
            {/* <Header color="bg-[#589898]" title={datosRadio && datosRadio.nombre}/> */}
            <div className="flex flex-col gap-12 lg:gap-16 xl:gap-24">
                <p className="standard-paragraph mx-6 sm:mx-auto md:mx-10 min-[930px]:mx-auto max-w-full max-md:max-w-[560px] max-lg:max-w-[800px] min-[880px]:mx-auto lg:mx-20 max-[1450px]:max-w-[1380px] xl:mx-24 min-[1700px]:mx-auto min-[1700px]:w-[1600px] min-[1800px]:w-[1550px]"  dangerouslySetInnerHTML={{ __html: datosRadio && datosRadio.descripcion}}></p>

                {
                    !isLoadingDatos && datosRadio.secciones && datosRadio.secciones.map((radio, index) => (
                        <div className="mx-6 min-[450px]:mx-auto md:mx-10 min-[930px]:mx-auto max-w-full max-md:max-w-[560px] max-lg:max-w-[800px] min-[880px]:mx-auto lg:mx-20 max-[1450px]:max-w-[1380px] xl:mx-24 min-[1700px]:mx-auto min-[1700px]:w-[1600px] min-[1800px]:w-[1550px]" key={index}>
                            <div className=" mb-6 flex items-center gap-4">
                                <h3 className="h3-subtitles">{radio.nombre}</h3>
                                <a href={`/programa/creciendo-en-familia/${radio._id}`}>
                                    <button className="px-4 py-1 border rounded border-[#46797A] hover:bg-[#46797A] hover:text-white transition-colors duration-300">
                                        Ver todo
                                    </button>
                                </a>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {
                                    radio.contenidos && radio.contenidos.map((cont, index2) => (
                                        <RadioCard key={index2} descripcion={cont.descripcion} contenido={cont.archivos}/>
                                    ))
                                }
                                {/* <RadioCard descripcion="akjdna akjsndaskjd aosndak andasd alkdnad admkasdm askdasdkan akdasdn adklsd akdaskd akdnaskd kas askjdbaskj ajsbdasnd ua kasjbdans dakhsd a,nd aisjkdmnasd hiaskn dasknd asnl,d ashikdasn,da a ks ksnd alsdkjasnd lkjasdn ksand jlkandadlakjs l ilajde alskdm alskdj ahwriea rfladkjna oaih flasknfr aalofdn aaskjd basdhf qwourfh"/>
                                <RadioCard descripcion="akjdna akjsndaskjd aosndak andasd alkdnad admkasdm askdasdkan akdasdn adklsd akdaskd akdnaskd na ks ksnd alsdkjasnd lkjasdn ksand jlkandadlakjs l ilajde alskdm alskdj ahwriea rfladkjna oaih flasknfr aalofdn aaskjd basdhf qwourfh"/>
                                <RadioCard descripcion="akjdna akjsndaskjd aosndak andasd alkdnad admkasdm askdasdkan akdasdn adklsd akdaskd akdnaskd kasdaksd ksadks alkdna ks ksnd alsdkjasnd lkjasdn ksand jlkandadlakjs l ilajde alskdm alskdj ahwriea rfladkjna oaih flasknfr aalofdn aaskjd basdhf qwourfh"/>
                                <RadioCard descripcion="akjdna akjsndaskjd aosndak andasd alkdnad admkasdm askdasdkan akdasdn adklsd akdaskd akdnaskd kasdaksd ksadksald kandkad klasdnasd lkasdnasd lkndas dlkansd aslkadmnas lkasdnask alkdna ks ksnd alsdkjasnqwourfh"/>
                                <RadioCard descripcion="akjdna akjsndaskjd aosndak andasd alkdnad admkasdm askdasdkan akdasdn adklsd akdaskd akdnaskd kasdaksd ksadksald kandkad klasdnasd lkasdnasd lkndas dlkansd aslkadmnas lkasdnask alkdna ks ksnd alsdkjasnqwourfh"/> */}
                            </div>
                        </div>
                    ))
                }

                {/* <div className="mx-6 min-[450px]:mx-auto md:mx-10 min-[930px]:mx-auto max-w-full max-md:max-w-[560px] max-lg:max-w-[800px] min-[880px]:mx-auto lg:mx-20 max-[1450px]:max-w-[1380px] xl:mx-24 min-[1700px]:mx-auto min-[1700px]:w-[1600px] min-[1800px]:w-[1550px]">
                    <h3 className="h3-subtitles mb-3">GAAAAAA</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <RadioCard descripcion="akjdna akjsndaskjd aosndak andasd alkdnad admkasdm askdasdkan akdasdn adklsd akdaskd akdnaskd kas askjdbaskj ajsbdasnd ua kasjbdans dakhsd a,nd aisjkdmnasd hiaskn dasknd asnl,d ashikdasn,da a ks ksnd alsdkjasnd lkjasdn ksand jlkandadlakjs l ilajde alskdm alskdj ahwriea rfladkjna oaih flasknfr aalofdn aaskjd basdhf qwourfh"/>
                        <RadioCard descripcion="akjdna akjsndaskjd aosndak andasd alkdnad admkasdm askdasdkan akdasdn adklsd akdaskd akdnaskd na ks ksnd alsdkjasnd lkjasdn ksand jlkandadlakjs l ilajde alskdm alskdj ahwriea rfladkjna oaih flasknfr aalofdn aaskjd basdhf qwourfh"/>
                        <RadioCard descripcion="akjdna akjsndaskjd aosndak andasd alkdnad admkasdm askdasdkan akdasdn adklsd akdaskd akdnaskd kasdaksd ksadks alkdna ks ksnd alsdkjasnd lkjasdn ksand jlkandadlakjs l ilajde alskdm alskdj ahwriea rfladkjna oaih flasknfr aalofdn aaskjd basdhf qwourfh"/>
                        <RadioCard descripcion="akjdna akjsndaskjd aosndak andasd alkdnad admkasdm askdasdkan akdasdn adklsd akdaskd akdnaskd kasdaksd ksadksald kandkad klasdnasd lkasdnasd lkndas dlkansd aslkadmnas lkasdnask alkdna ks ksnd alsdkjasnqwourfh"/>
                        <RadioCard descripcion="akjdna akjsndaskjd aosndak andasd alkdnad admkasdm askdasdkan akdasdn adklsd akdaskd akdnaskd kasdaksd ksadksald kandkad klasdnasd lkasdnasd lkndas dlkansd aslkadmnas lkasdnask alkdna ks ksnd alsdkjasnqwourfh"/>
                    </div>
                </div>

                <div className="mx-6 min-[450px]:mx-auto md:mx-10 min-[930px]:mx-auto max-w-full max-md:max-w-[560px] max-lg:max-w-[800px] min-[880px]:mx-auto lg:mx-20 max-[1450px]:max-w-[1380px] xl:mx-24 min-[1700px]:mx-auto min-[1700px]:w-[1600px] min-[1800px]:w-[1550px]">
                    <h3 className="h3-subtitles mb-3">Testimonios</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <RadioCard descripcion="akjdna akjsndaskjd aosndak andasd alkdnad admkasdm askdasdkan akdasdn adklsd akdaskd akdnaskd kas askjdbaskj ajsbdasnd ua kasjbdans dakhsd a,nd aisjkdmnasd hiaskn dasknd asnl,d ashikdasn,da a ks ksnd alsdkjasnd lkjasdn ksand jlkandadlakjs l ilajde alskdm alskdj ahwriea rfladkjna oaih flasknfr aalofdn aaskjd basdhf qwourfh"/>
                        <RadioCard descripcion="akjdna akjsndaskjd aosndak andasd alkdnad admkasdm askdasdkan akdasdn adklsd akdaskd akdnaskd na ks ksnd alsdkjasnd lkjasdn ksand jlkandadlakjs l ilajde alskdm alskdj ahwriea rfladkjna oaih flasknfr aalofdn aaskjd basdhf qwourfh"/>
                        <RadioCard descripcion="akjdna akjsndaskjd aosndak andasd alkdnad admkasdm askdasdkan akdasdn adklsd akdaskd akdnaskd kasdaksd ksadks alkdna ks ksnd alsdkjasnd lkjasdn ksand jlkandadlakjs l ilajde alskdm alskdj ahwriea rfladkjna oaih flasknfr aalofdn aaskjd basdhf qwourfh"/>
                        <RadioCard descripcion="akjdna akjsndaskjd aosndak andasd alkdnad admkasdm askdasdkan akdasdn adklsd akdaskd akdnaskd kasdaksd ksadksald kandkad klasdnasd lkasdnasd lkndas dlkansd aslkadmnas lkasdnask alkdna ks ksnd alsdkjasnqwourfh"/>
                        <RadioCard descripcion="akjdna akjsndaskjd aosndak andasd alkdnad admkasdm askdasdkan akdasdn adklsd akdaskd akdnaskd kasdaksd ksadksald kandkad klasdnasd lkasdnasd lkndas dlkansd aslkadmnas lkasdnask alkdna ks ksnd alsdkjasnqwourfh"/>
                    </div>
                </div> */}
            
            </div>
        </div>
    );
}

export default CreciendoEnFamilia