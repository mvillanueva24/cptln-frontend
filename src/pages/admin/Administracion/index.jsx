import React, { useState, useEffect } from 'react';
import OriginalLogo from "../../../assets/OriginalLogo.png";
import { Outlet } from "react-router-dom";
import { FaPrayingHands, FaNewspaper, FaCalendarDay, FaObjectGroup } from "react-icons/fa";
import { GiOpenBook } from "react-icons/gi";
import { TbCategoryFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import { MdCameraFront } from "react-icons/md";
import { ImBooks } from "react-icons/im";
import { IoIosArrowDown, IoIosRadio, IoIosPeople } from "react-icons/io";
import { MdCastForEducation } from "react-icons/md";
import { FaUserPen } from "react-icons/fa6";
import { useAuth } from '../../../context/AuthContext';
import { AiOutlineLogout } from "react-icons/ai";
import { logout } from '../../../Api/auth';



const Administracion = () => {

    const { user, LogoutUser } = useAuth()

    const [showSubmenu, setShowSubmenu] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false); // Estado para el tamaño del menú

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Función que maneja la expansión/contracción del menú y oculta el submenú
    const toggleMenu = () => {
        setIsExpanded(prev => !prev);
        if (isExpanded) setShowSubmenu(false); // Cierra el submenú si el menú se contrae
    };

    const logoutUser = async() => {
        await logout()
        window.location.reload()
    }

    return (
        <>
            <nav className="flex items-center justify-between w-full px-40 py-4 bg-l_color_r-600">
                <div className="flex items-center space-x-5">
                    <img src={OriginalLogo} alt="Logo" className="h-12" />
                    <span className="text-xl font-semibold text-white">
                        CPTL - PERÚ
                    </span>
                </div>
                <div className="flex items-center font-bold text-white">
                    {user ? (
                        <div className='flex items-center space-x-5'>
                            <p>
                                {user.nombres + ' ' + user.apellidos}
                            </p>
                            <button onClick={logoutUser}>
                                <AiOutlineLogout className='size-5'/>
                            </button>
                        </div>
                    )
                        :
                        (
                            <p></p>
                        )}
                </div>
            </nav>
            <div className="flex">
                {/* Menú lateral */}
                <div
                    className={`fixed bottom-0 left-0 transition-all duration-300 z-30 bg-white top-20 ${isExpanded ? 'w-96' : 'w-24'} group`}
                    onMouseEnter={() => setIsExpanded(true)} // Expande el menú al pasar el ratón
                    onMouseLeave={toggleMenu} // Contrae el menú y cierra el submenú al salir
                >
                    <ul>
                        <Link to="/admin" className="w-full">
                            <li className="flex items-center justify-center w-full py-4 transition-all duration-300 cursor-pointer group hover:bg-slate-400">
                                <span className="hidden ml-4 text-xl group-hover:inline-block">
                                    Eventos
                                </span>
                                <FaCalendarDay className="block group-hover:hidden size-8" />
                            </li>
                        </Link>
                        <Link to="/admin/tablanews" className="w-full">
                            <li className="flex items-center justify-center w-full py-4 transition-all duration-300 cursor-pointer group hover:bg-slate-400">
                                <span className="hidden ml-4 text-xl group-hover:inline-block">
                                    Noticias
                                </span>
                                <FaNewspaper className="block group-hover:hidden size-8" />
                            </li>
                        </Link>
                        <Link to="/admin/tabladevocional" className="w-full">
                            <li className="flex items-center justify-center w-full py-4 transition-all duration-300 cursor-pointer group hover:bg-slate-400">
                                <span className="hidden ml-4 text-xl group-hover:inline-block">
                                    Devocionales
                                </span>
                                <GiOpenBook className="block group-hover:hidden size-8" />
                            </li>
                        </Link>
                        <Link to="/admin/tablacategoria" className="w-full">
                            <li className="flex items-center justify-center w-full py-4 transition-all duration-300 cursor-pointer group hover:bg-slate-400">
                                <span className="hidden ml-4 text-xl group-hover:inline-block">
                                    Categorias
                                </span>
                                <TbCategoryFilled className="block group-hover:hidden size-8" />
                            </li>
                        </Link>
                        <Link to="/admin/tablaebooks" className="w-full">
                            <li className="flex items-center justify-center w-full py-4 transition-all duration-300 cursor-pointer group hover:bg-slate-400">
                                <span className="hidden ml-4 text-xl group-hover:inline-block">
                                    Ebook
                                </span>
                                <ImBooks className="block group-hover:hidden size-8" />
                            </li>
                        </Link>
                        <Link to="/admin/tablacursos" className="w-full">
                            <li className="flex items-center justify-center w-full py-4 transition-all duration-300 cursor-pointer group hover:bg-slate-400">
                                <span className="hidden ml-4 text-xl group-hover:inline-block">
                                    Cursos
                                </span>
                                <MdCastForEducation className="block group-hover:hidden size-8" />
                            </li>
                        </Link>

                        <Link to="/admin/tablaprogramas" className="w-full">
                            <li className="flex items-center justify-center w-full py-4 transition-all duration-300 cursor-pointer group hover:bg-slate-400">
                                <span className="hidden ml-4 text-xl group-hover:inline-block">
                                    Programas
                                </span>
                                <FaObjectGroup className="block group-hover:hidden size-8" />
                            </li>
                        </Link>

                        <Link to="/admin/radioconfig" className="w-full">
                            <li className="flex items-center justify-center w-full py-4 transition-all duration-300 cursor-pointer group hover:bg-slate-400">
                                <span className="hidden ml-4 text-xl group-hover:inline-block">
                                    Radio
                                </span>
                                <IoIosRadio className="block group-hover:hidden size-8" />
                            </li>
                        </Link>
                        <Link to="/admin/tablausuario" className="w-full">
                            <li className="flex items-center justify-center w-full py-4 transition-all duration-300 cursor-pointer group hover:bg-slate-400">
                                <span className="hidden ml-4 text-xl group-hover:inline-block">
                                    Usuarios
                                </span>

                                <FaUserPen className="block group-hover:hidden size-8" />
                            </li>
                        </Link>

                        {/* Menú desplegable de "Peticiones" */}
                        <Link to="#" className="w-full">
                            <li
                                className="flex items-center justify-center w-full py-4 transition-all duration-300 cursor-pointer group hover:bg-slate-400"
                                onClick={() => setShowSubmenu(prev => !prev)}
                            >
                                <span className="hidden ml-4 text-xl group-hover:inline-flex">
                                    Peticiones <IoIosArrowDown className='mt-1.5 ml-1' />
                                </span>
                                <IoIosPeople className="block group-hover:hidden size-8" />
                            </li>

                            {/* Submenú para "Peticiones" */}
                            {showSubmenu && (
                                <ul className="bg-white rounded-md shadow-md">
                                    <Link to="/admin/tablaoracion" className="w-full">
                                        <li className="flex items-center justify-start w-full px-4 py-2 transition-all duration-300 cursor-pointer hover:bg-slate-400">
                                            <span className="text-sm text-black">Oraciones</span>
                                        </li>
                                    </Link>
                                    <Link to="/admin/tablapeticionebooks" className="w-full">
                                        <li className="flex items-center justify-start w-full px-4 py-2 transition-all duration-300 cursor-pointer hover:bg-slate-400">
                                            <span className="text-sm text-black">Ebooks</span>
                                        </li>
                                    </Link>
                                    <Link to="/admin/tablacursosbi" className="w-full">
                                        <li className="flex items-center justify-start w-full px-4 py-2 transition-all duration-300 cursor-pointer hover:bg-slate-400">
                                            <span className="text-sm text-black">Cursos</span>
                                        </li>
                                    </Link>
                                    <Link to="/admin/tablacontactos" className="w-full">
                                        <li className="flex items-center justify-start w-full px-4 py-2 transition-all duration-300 cursor-pointer hover:bg-slate-400">
                                            <span className="text-sm text-black">Contactanos</span>
                                        </li>
                                    </Link>
                                </ul>
                            )}
                        </Link>

                    </ul>
                </div>
                <div className="flex flex-col w-full pl-24 transition-all duration-300 bg-[#EAE9E5] overflow-y-auto h-[calc(100vh-5rem)]">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Administracion;