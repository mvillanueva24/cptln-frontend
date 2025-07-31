import { lazy } from "react";
const Header = lazy(() => import("@/pages/client/components/Header"));

export const NotFound = () => {
    return (
        <div className="flex flex-col gap-12 lg:gap-16 xl:gap-28 pb-12 lg:pb-16 xl:pb-28">
            <Header color="bg-l_color_v-600" title="Error 404" text="Página no encontrada"/>
            <p className="self-center font-normal text-[1.6em] leading-[1.5em] max-[1100px]:text-[1.3em] max-[1100px]:leading-[1.5em] px-10">La página que estás intentando visitar no existe u ocurrió un error</p>
        </div>
    )
}

export default NotFound;