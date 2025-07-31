import { lazy } from "react";
import imgPasi1 from '../../../../../assets/PASI_2.jpg'
import imgPasi2 from '../../../../../assets/PASI_1.jpg'
import imgNoticia from '../../../../../assets/Día_del_Nino_3.jpg'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NewsCard from "../../../components/NewsCard";

const Header = lazy(() => import("@/pages/client/components/Header"));

const ProgramSelect = () => {

    const settings = {
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 3.5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1150,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 950,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 755,
                settings: {
                    slidesToShow: 1.5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    };

    return (
        <>
            <div className="flex flex-col gap-12 lg:gap-16 xl:gap-24 pb-12 xl:pb-24">
                <Header color="bg-l_color_y-700" title="Prevención del Abuso Sexual e Infantil" return returnText="Programas de niños y Adolescentes" linkReturn="/programas/niños-adolescentes"/>
                {/* flex justify-between max-md:flex-col gap-10 max-w-[1280px] box-content px-10 max-[600px]:px-[30px] md:items-center md:mx-auto */}
                <div className="flex flex-col gap-12 lg:gap-16 xl:gap-24 pb-12 xl:pb-24 px-10 max-[600px]:px-[30px] md:items-center md:mx-auto max-w-[1280px]">
                    <div className="flex justify-between max-md:flex-col gap-10 box-content md:items-center">
                        <div className="flex-1 max-w-[498px] max-md:w-full max-md:max-w-full max-md:flex max-md:justify-center">
                            <img src={imgPasi1} alt=""
                                className="bg-cover 2xl:h-80 xl:h-64 md:h-54 max-md:w-full rounded-2xl shadow-md shadow-gray-400" />
                                {/* bg-cover w-full rounded-2xl */}
                        </div>
                        <div className="flex-1">
                            <h3 className="h3-subtitles">¿Qué es PASI?</h3>
                            <p className="mt-[15px] standard-paragraph text-[#555656] text-justify">
                            Es un programa que enseña en Instituciones Educativas sobre la prevención del abuso sexual infantil resaltando la importancia de la identificación de su o sus abusadores y brindando herramientas para poder evitar posibles situaciones de abuso, así mismo, los incentivamos a rechazar por completo estas acciones y denunciar si es que en alguna ocasión vivió o presenció una situación de abuso sexual infantil.
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-between max-md:flex-col gap-10 box-content md:items-center">
                        <div className="flex-1 max-w-[498px] max-md:w-full max-md:max-w-full max-md:flex max-md:justify-center order-2 max-md:order-1">
                            <img src={imgPasi2} alt=""
                                className="bg-cover 2xl:h-80 xl:h-64 md:h-54 max-md:w-full rounded-2xl shadow-md shadow-gray-400" />
                        </div>
                        <div className="flex-1 order-1 max-md:order-2">
                            <h3 className="h3-subtitles">¿Cómo de organiza?</h3>
                            <p className="mt-[15px] standard-paragraph text-[#555656] text-justify">
                            La enseñanza inculca el gran valor que cada uno de ellos tiene indiferentemente de su condición social, racial, económica, etc. y el derecho sobre su cuerpo para prevenir situaciones de esta índole. 
                            </p>
                        </div>
                    </div>
                </div>
                <div className="px-10 max-[600px]:px-[30px] md:px-[50px] lg:px-[80px] 2xl:mx-auto max-w-[1580px]">
                <h3 className="h3-subtitles mb-6">Eventos pasados de PASI</h3>
                    <Slider {...settings}>
                        <NewsCard
                            imageSrc={imgNoticia}
                            title={'Noticia 1'}
                            date={'15 Agosto, 2024'}
                            description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.'} />
                        <NewsCard
                            imageSrc={imgNoticia}
                            title={'Noticia 1'}
                            date={'15 Agosto, 2024'}
                            description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.'} />
                        <NewsCard
                            imageSrc={imgNoticia}
                            title={'Noticia 1'}
                            date={'15 Agosto, 2024'}
                            description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.'} />
                        <NewsCard
                            imageSrc={imgNoticia}
                            title={'Noticia 1'}
                            date={'15 Agosto, 2024'}
                            description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.'} />
                        <NewsCard
                            imageSrc={imgNoticia}
                            title={'Noticia 1'}
                            date={'15 Agosto, 2024'}
                            description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.'} />
                        <NewsCard
                            imageSrc={imgNoticia}
                            title={'Noticia 1'}
                            date={'15 Agosto, 2024'}
                            description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.'} />
                        <NewsCard
                            imageSrc={imgNoticia}
                            title={'Noticia 1'}
                            date={'15 Agosto, 2024'}
                            description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.'} />
                        <NewsCard
                            imageSrc={imgNoticia}
                            title={'Noticia 1'}
                            date={'15 Agosto, 2024'}
                            description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.'} />
                    </Slider>
                </div>
            </div>
        </>
    )
}
export default ProgramSelect