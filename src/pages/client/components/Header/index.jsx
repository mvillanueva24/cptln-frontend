import { useNavigate } from "react-router-dom";

export const Header = (props) => {
    const navigate = useNavigate()

    // Crear un objeto de estilo para el fondo dinámico
    const headerStyle = {
        backgroundColor: props.color.startsWith('bg-') ? undefined : props.color,
    };

    // Determinar la clase de fondo
    const backgroundClass = props.color.startsWith('bg-') ? props.color : '';

    return (
        <>
            <header style={headerStyle} className={`${backgroundClass} relative w-full max-[500px]:h-auto max-md:pt-[120px] max-md:pb-[50px] max-[600px]:h-[300px] max-md:h-[350px] md:h-[400px] md:pt-[160px] md:pb-[80px]  flex flex-col justify-center items-center gap-5 xl:gap-10`}>
                <h2 className="text-white max-[500px]:text-[1.625em] max-md:text-[2.1875em] max-lg:text-[2.5em] max-[1110px]:text-[2.8125em] min-[1110px]:text-[3.125em] font-bold leading-[1.2em] text-center px-2">{props.title}</h2>
                {props.text && <p className="text-white xl:text-3xl lg:text-2xl text-xl font-bold text-center">{props.text}</p>}
                {props.return && (
                    <button onClick={()=>navigate(props.linkReturn)} className="max-md:hidden left-20 z-50 text-white absolute top-32 lg:left-32 xl:left-52 flex text-xl ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 mr-2">
                            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                        </svg>
                        Volver a {props.returnText}
                    </button>
                )}

            </header>
        </>
    )
}

export default Header;