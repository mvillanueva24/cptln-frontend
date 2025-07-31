import { useState, useEffect } from "react";
import OriginalLogo from "../../../../assets/OriginalLogo.png";

const Navbar = (props) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;

      // Si estamos desplazándonos hacia abajo, ocultar el navbar
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

  return (
    <>
      <nav
        className={`fixed top-0 w-full transition-transform duration-300 ${
          isHidden ? "-translate-y-full bg-white text-black" : "translate-y-0"
        } ${isScrolledUp ? "bg-white text-black shadow-md py-4" : "bg-logo_color_3-600 text-white py-4"} z-50`}
      >
        <div className={`container flex items-center justify-between px-6 mx-auto ${isScrolledUp ? "py-3" : "py-6"}`}>
          {/* Logo y Nombre de la Web */}
          <a href="/" className="flex items-center space-x-3 cursor-pointer">
            <img src={OriginalLogo} alt="Logo" className="h-12" />
            <span className={`font-semibold max-[500px]:text-md min-[500px]:text-xl ${isScrolledUp ? "text-black" : "text-white"}`}>
              CPTL - PERÚ
            </span>
          </a>

          {/* Botón del Menú Hamburguesa para pantallas pequeñas */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none ${isScrolledUp ? "text-black" : "text-white"}`}
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

          {/* Lista de Navegación para pantallas grandes */}
          <ul className="hidden space-x-10 lg:flex font-bold 2xl:text-[17px]">
            <li className={`hover:text-gray-300 ${isScrolledUp ? "text-black" : "text-white"}`}>
              <a href="/">Inicio</a>
            </li>
            <li className={`hover:text-gray-300 ${isScrolledUp ? "text-black" : "text-white"}`}>
              <a href="/aboutus">Conócenos</a>
            </li>
            <li className={`hover:text-gray-300 ${isScrolledUp ? "text-black" : "text-white"}`}>
              <a href="/programas">Programas</a>
            </li>
            <li className={`hover:text-gray-300 ${isScrolledUp ? "text-black" : "text-white"}`}>
              <a href="/contacto">Recursos</a>
            </li>
            <li className={`hover:text-gray-300 ${isScrolledUp ? "text-black" : "text-white"}`}>
              <a href="/noticias-y-eventos">Noticias y Eventos</a>
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

      {/* Menú Deslizante para pantallas pequeñas */}
      <div
        className={`fixed top-0 right-0 w-full md:w-64 h-full bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className={`absolute top-4 right-4 focus:outline-none ${isScrolledUp ? "text-gray-800" : "text-gray-600"}`}
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
        <ul className="flex flex-col items-start p-4 space-y-4">
          <li className={`text-gray-800 hover:text-gray-600 ${isScrolledUp ? "text-black" : "text-gray-800"}`}>
            <a href="/" onClick={() => setIsOpen(false)}>Inicio</a>
          </li>
          <li className={`text-gray-800 hover:text-gray-600 ${isScrolledUp ? "text-black" : "text-gray-800"}`}>
            <a href="/aboutus" onClick={() => setIsOpen(false)}>Conócenos</a>
          </li>
          <li className={`text-gray-800 hover:text-gray-600 ${isScrolledUp ? "text-black" : "text-gray-800"}`}>
            <a href="/programas" onClick={() => setIsOpen(false)}>Programas</a>
          </li>
          <li className={`text-gray-800 hover:text-gray-600 ${isScrolledUp ? "text-black" : "text-gray-800"}`}>
            <a href="/contacto" onClick={() => setIsOpen(false)}>Recursos</a>
          </li>
          <li className={`text-gray-800 hover:text-gray-600 ${isScrolledUp ? "text-black" : "text-gray-800"}`}>
            <a href="/noticias-y-eventos" onClick={() => setIsOpen(false)}>Noticias y Eventos</a>
          </li>
          <li className={`text-gray-800 hover:text-gray-600 ${isScrolledUp ? "text-black" : "text-gray-800"}`}>
            <a href="/contactanos" onClick={() => setIsOpen(false)}>Contáctanos</a>
          </li>
          <li className={`text-gray-800 hover:text-gray-600 ${isScrolledUp ? "text-black" : "text-gray-800"}`}>
            <a href="/donate" onClick={() => setIsOpen(false)}>Cómo apoyar</a>
          </li>
          <li className={`text-gray-800 hover:text-gray-600 ${isScrolledUp ? "text-black" : "text-gray-800"}`}>
            <a href="/oracion" onClick={() => setIsOpen(false)}>Oración</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;