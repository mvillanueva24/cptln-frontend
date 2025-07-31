import { useState, useEffect } from "react";
import OriginalLogo from "../../../../assets/OriginalLogo.png";
import {Outlet} from "react-router-dom";
import WhiteIcon from "../../../../assets/WhiteIcon.png";

import { obtenerProgramas } from "@/Api/programas";
import { obtenerCategorias } from "@/Api/categorias";
// Importar los iconos de react-icons
import {
  FaHome,
  FaUsers,
  FaBuffer,
  FaBook,
  FaNewspaper,
  FaPhone,
  FaHeart,
  FaPrayingHands,
  FaChevronDown,
} from "react-icons/fa";

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false); // Estado para el submenú de "Programas"
  const [isResourcesOpen, setIsResourcesOpen] = useState(false); // Estado para el submenú de "Recursos"
  const [timeoutId, setTimeoutId] = useState(null); // Para almacenar el ID del timeout
  const [isHoveringMenu, setIsHoveringMenu] = useState(false); // Estado para saber si el mouse está sobre el menú desplegable
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para el menú móvil
  const [fetchProgramas, setFetchProgramas] = useState([]);
  const [isLoadingPrograms, setIsLoadingPrograms] = useState(true);
  const [ fetchCategorias, setFetchCategorias ] = useState([])
  const [ isLoadingCategorias, setIsLoadingCategorias ] = useState(true);

  function convertirTexto(texto) {
    return texto ? texto.trim().toLowerCase().replace(/\s+/g, '-') : '';
  }

  useEffect(() => {  
    const fetch = async () => {
    const response = await obtenerCategorias()
        // console.log(response)
        setFetchCategorias(response.data)
        setIsLoadingCategorias(false);
    }
    fetch();
  }, []);

  useEffect(() => {  
      const fetch = async () => {
      const response = await obtenerProgramas()
          // console.log(response)
          setFetchProgramas(response.data)
          setIsLoadingPrograms(false);
      }
      fetch();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;

      if (currentPosition > scrollPosition) {
        setIsHidden(true);
        setIsScrolledUp(false);
      } else {
        setIsHidden(false);
        if (currentPosition > 0) {
          setIsScrolledUp(true);
        } else {
          setIsScrolledUp(false);
        }
      }

      setScrollPosition(currentPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  const handleMouseEnterPrograms = () => {
    if (isResourcesOpen) {
      setIsResourcesOpen(false);
    }
    clearTimeout(timeoutId);
    setIsProgramsOpen(true);
  };

  const handleMouseLeavePrograms = () => {
    const id = setTimeout(() => {
      setIsProgramsOpen(false);
    }, 1000);
    setTimeoutId(id);
  };

  const handleMouseEnterResources = () => {
    if (isProgramsOpen) {
      setIsProgramsOpen(false);
    }
    clearTimeout(timeoutId);
    setIsResourcesOpen(true);
  };

  const handleMouseLeaveResources = () => {
    const id = setTimeout(() => {
      setIsResourcesOpen(false);
    }, 1000);
    setTimeoutId(id);
  };

  // Función para abrir/cerrar el menú móvil
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
      <nav
        className={`fixed top-0 w-full transition-transform duration-300 ${
          isHidden ? "-translate-y-full bg-white text-black" : "translate-y-0"
        } ${isScrolledUp ? "bg-white text-black shadow-md py-4" : "bg-logo_color_3-600 text-white py-4"} z-50`}
      >
        {/* ${isScrolledUp ? "py-1" : "py-2"} */}
        <div className={`md:container flex items-center justify-between px-6 mx-auto ${isScrolledUp ? "py-1 xl:py-3" : "py-2 xl:py-6"}`}>
          <a href="/" className="flex items-center space-x-3 cursor-pointer">
            <img src={OriginalLogo} alt="Logo" className="h-12" />
            <span
              className={`font-semibold max-[500px]:text-md min-[500px]:text-xl ${
                isScrolledUp ? "text-black" : "text-white"
              }`}
            >
              CPTLN - PERÚ
            </span>
          </a>

          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none ${
                isScrolledUp ? "text-black" : "text-white"
              }`}
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              )}
            </button>
          </div>

          <ul className="hidden ml-2 space-x-7 lg:space-x-8 xl:space-x-10 font-bold lg:flex 2xl:text-[17px]">
          <li className={`hover:text-gray-300 ${isScrolledUp ? "text-black" : "text-white"}`}>
              <a href="/">Inicio</a>
            </li>
            <li className={`hover:text-gray-300 ${isScrolledUp ? "text-black" : "text-white"}`}>
              <a href="/aboutus">Conócenos</a>
            </li>

            {/* Menú desplegable de Programas */}
            <li className="relative" onMouseLeave={handleMouseLeavePrograms} onMouseEnter={handleMouseEnterPrograms}>
              <a href="/programas">
              <button
                
                className={`flex items-center space-x-2 focus:outline-none ${
                  isScrolledUp ? "text-black" : "text-white"
                }`}
              >
                <span>Programas</span>
                <FaChevronDown />
              </button>
              </a>

              {isProgramsOpen && (
                <div
                  className="absolute left-0 w-48 py-2 mt-2 bg-white rounded-md shadow-lg"
                >
                  {isLoadingCategorias // Mientras está cargando, muestra los skeletons
                    ? Array(1) // Crear 6 skeletons como placeholders
                        .fill()
                        .map((_) => (
                          <span
                              className="block px-4 py-2 text-black hover:bg-[#dfdfdf]"
                            >
                              Loading...
                          </span>
                        ))
                    : fetchCategorias.map((categoria, index) => {
                      //console.log(program); // Para ver si los datos son correctos
                      // console.log(fetchProgramas)
                      return (
                        
                        <a
                          href={`/programas/${convertirTexto(categoria.nombre)}`}
                          className="block px-4 py-2 text-black hover:bg-[#dfdfdf]"
                          key={index}
                        >
                          {categoria.nombre}
                        </a>
                      );
                    })
                  }
                  <a
                    href={`/programa/creciendo-en-familia`}
                    className="block px-4 py-2 text-black hover:bg-[#dfdfdf]"
                  >
                    Creciendo en Familia
                  </a>
                  {isLoadingPrograms // Mientras está cargando, muestra los skeletons
                    ? Array(1) // Crear 6 skeletons como placeholders
                        .fill()
                        .map((_) => (
                          <span
                              className="block px-4 py-2 text-black hover:bg-[#dfdfdf]"
                            >
                              Loading...
                          </span>
                        ))
                    : fetchProgramas.map((program, index) => {
                      return(
                        program.categoria == "" && (
                          <a
                            href={`/programa/${convertirTexto(program.titulo)}`}
                            className="block px-4 py-2 text-black hover:bg-[#dfdfdf]"
                            key={index}
                          >
                            {program.abreviatura}
                          </a>
                        )
                      )

                    })
                  }
                  {/* <a
                    href="/programas/niños-adolescentes"
                    className="block px-4 py-2 text-black hover:bg-[#dfdfdf]"
                  >
                    Niños y Adolescentes
                  </a>
                  <a
                    href="/programas/familia"
                    className="block px-4 py-2 text-black hover:bg-[#dfdfdf]"
                  >
                    Familia
                  </a>
                  <a
                    href="/programas/creciendo-en-familia"
                    className="block px-4 py-2 text-black hover:bg-[#dfdfdf]"
                  >
                    Creciendo en Familia
                  </a> */}
                </div>
              )}
            </li>

            {/* Menú desplegable de Recursos */}
            <li className="relative" onMouseLeave={handleMouseLeaveResources} onMouseEnter={handleMouseEnterResources}>
              <button
                className={`flex items-center space-x-2 focus:outline-none ${
                  isScrolledUp ? "text-black" : "text-white"
                }`}
              >
                <span>Recursos</span>
                <FaChevronDown />
              </button>

              {isResourcesOpen && (
                <div
                  className="absolute left-0 w-48 py-2 mt-2 bg-white rounded-md shadow-lg"
                >
                  <a
                    href="/recursos/ebooks"
                    className="block px-4 py-2 text-black hover:bg-[#dfdfdf]"
                  >
                    Ebooks
                  </a>
                  <a
                    href="/recursos/devocional-diario"
                    className="block px-4 py-2 text-black hover:bg-[#dfdfdf]"
                  >
                    Devocional diario
                  </a>
                  <a
                    href="/recursos/cursos-biblicos"
                    className="block px-4 py-2 text-black hover:bg-[#dfdfdf]"
                  >
                    Cursos Bíblicos
                  </a>
                </div>
              )}
            </li>

            <li className={`hover:text-gray-300 ${isScrolledUp ? "text-black" : "text-white"}`}>
              <a href="/noticias-y-eventos">Noticias</a>
            </li>
            <li className={`hover:text-gray-300 ${isScrolledUp ? "text-black" : "text-white"}`}>
              <a href="/contactanos">Contáctanos</a>
            </li>
            <li className={`hover:text-gray-300 ${isScrolledUp ? "text-black" : "text-white"}`}>
              <a href="/donate">Cómo apoyar</a>
            </li>
            <li className={`hover:text-gray-300 ${isScrolledUp ? "text-black" : "text-white"}`}>
              <a href="/oracion">Oración</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Menú móvil */}
      <div
        className={`fixed top-0 right-0 w-full md:w-72 h-full bg-[#dfdfdf] shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className={`absolute top-4 right-4 focus:outline-none ${
            isScrolledUp ? "text-gray-800" : "text-gray-600"
          }`}
          aria-label="Close Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <ul className="flex flex-col items-start p-4 space-y-5">
          <li className="mt-4 flex items-center space-x-2 text-gray-900 hover:text-gray-500">
            <FaHome />
            <a href="/" onClick={() => setIsOpen(false)}>
              Inicio
            </a>
          </li>
          <li className="flex items-center space-x-2 text-gray-800 hover:text-gray-600">
            <FaUsers />
            <a href="/aboutus" onClick={() => setIsOpen(false)}>
              Conócenos
            </a>
          </li>
          <li className="flex w-full items-center justify-between text-gray-800 hover:text-gray-600 cursor-pointer" >
            <div className="flex items-center space-x-2">
              <FaBuffer />
              <a href="/programas">
                Programas
              </a>
            </div>
            <FaChevronDown onClick={() => setIsProgramsOpen(!isProgramsOpen)}/>
          </li>

          {/* Submenú de Programas */}
          {isProgramsOpen && (
            <ul className="pl-6 space-y-2">
              
              {isLoadingCategorias // Mientras está cargando, muestra los skeletons
                    ? Array(1) // Crear 6 skeletons como placeholders
                        .fill()
                        .map((_) => (
                          <li
                              className="flex items-center space-x-2 text-gray-800 hover:text-gray-600"
                            >
                              Loading...
                          </li>
                        ))
                    : fetchCategorias.map((categoria, index) => {
                      //console.log(program); // Para ver si los datos son correctos
                      // console.log(fetchProgramas)
                      return (
                        
                        <a
                          href={`/programas/${convertirTexto(categoria.nombre)}`}
                          className="flex items-center space-x-2 text-gray-800 hover:text-gray-600"
                          key={index}
                        >
                          {categoria.nombre}
                        </a>
                      );
                    })
                  }
                  <a
                    href={`/programa/creciendo-en-familia`}
                    className="block px-4 py-2 text-black hover:bg-[#dfdfdf]"
                  >
                    Creciendo en Familia
                  </a>
                  {isLoadingPrograms // Mientras está cargando, muestra los skeletons
                    ? Array(1) // Crear 6 skeletons como placeholders
                        .fill()
                        .map((_) => (
                          <li
                              className="flex items-center space-x-2 text-gray-800 hover:text-gray-600"
                            >
                              Loading...
                          </li>
                        ))
                    : fetchProgramas.map((program, index) => {
                      return(
                        program.categoria == "" && (
                          <a
                            href={`/programa/${convertirTexto(program.titulo)}`}
                            className="flex items-center space-x-2 text-gray-800 hover:text-gray-600"
                            key={index}
                          >
                            {program.abreviatura}
                          </a>
                        )
                      )

                    })
                  }
            </ul>
          )}

          <li className="flex w-full items-center justify-between text-gray-800 hover:text-gray-600 cursor-pointer" onClick={() => setIsResourcesOpen(!isResourcesOpen)}>
            <div className="flex items-center space-x-2">
              <FaBook />
              <span>
                Recursos
              </span>
            </div>
            <FaChevronDown />
          </li>

          {/* Submenú de Recursos */}
          {isResourcesOpen && (
            <ul className="pl-6 space-y-2">
              <li className="flex items-center space-x-2 text-gray-800 hover:text-gray-600">
                <a href="/recursos/ebooks" onClick={() => setIsOpen(false)}>
                  Ebooks
                </a>
              </li>
              <li className="flex items-center space-x-2 text-gray-800 hover:text-gray-600">
                <a href="/recursos/devocional-diario" onClick={() => setIsOpen(false)}>
                  Devocional diario
                </a>
              </li>
              <li className="flex items-center space-x-2 text-gray-800 hover:text-gray-600">
                <a
                  href="/recursos/cursos-biblicos"
                  onClick={() => setIsOpen(false)}
                >
                  Cursos Bíblicos
                </a>
              </li>
            </ul>
          )}

          <li className="flex items-center space-x-2 text-gray-800 hover:text-gray-600">
            <FaNewspaper />
            <a href="/noticias-y-eventos" onClick={() => setIsOpen(false)}>
              Noticias y Eventos
            </a>
          </li>
          <li className="flex items-center space-x-2 text-gray-800 hover:text-gray-600">
            <FaPhone />
            <a href="/contactanos" onClick={() => setIsOpen(false)}>
              Contáctanos
            </a>
          </li>
          <li className="flex items-center space-x-2 text-gray-800 hover:text-gray-600">
            <FaHeart />
            <a href="/donate" onClick={() => setIsOpen(false)}>
              Ayúdanos
            </a>
          </li>
          <li className="flex items-center space-x-2 text-gray-800 hover:text-gray-600">
            <FaPrayingHands />
            <a href="/oracion" onClick={() => setIsOpen(false)}>
              Oración
            </a>
          </li>
        </ul>
      </div>
      <Outlet/>
      <div className="flex md:flex-col bg-[#222126] text-white justify-center py-10">
            <div className="items-center flex flex-col gap-4">
                <img src={WhiteIcon} alt="qhite-icon" className="w-12 xl:w-16"/>
                <span className="text-[1.25em] leading-[1.5em] max-[1100px]:text-[1.125em] max-[1100px]:leading-[1.2em]">Cristo para Todas las Naciones - Perú</span>
                {/* <span className="font-bold text-[1.25em] leading-[1.5em] max-[1100px]:text-[1.125em] max-[1100px]:leading-[1.2em]">Síguenos en:</span> */}
                {/* <div className="flex flex-col">
                  <svg className="e-font-icon-svg e-fab-facebook" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                      <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
                  </svg>
                  <svg className="e-font-icon-svg e-fab-instagram" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                  </svg>
                  <svg className="e-font-icon-svg e-fab-x-twitter" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                  </svg>
                  <svg className="e-font-icon-svg e-fab-tiktok" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"></path>
                  </svg>
                  <svg id="whatsapp" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                  <svg id="youtube" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/></svg>
                </div> */}
            </div>
            <div>

            </div>
            

        </div>
    </div>
  );
};
export default Navbar;