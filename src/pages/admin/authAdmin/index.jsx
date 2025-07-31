import OriginalLogo from "../../../../assets/OriginalLogo.png";
import { useState } from "react";
import { Transition } from "react-transition-group"; // Para animación

export const AuthAdmin = () => {
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre login y registro

  // Estados para almacenar los datos del usuario
  const [email, setEmail] = useState(""); // Almacenar el correo electrónico
  const [password, setPassword] = useState(""); // Almacenar la contraseña
  const [firstName, setFirstName] = useState(""); // Almacenar el nombre
  const [lastName, setLastName] = useState(""); // Almacenar el apellido
  const [confirmPassword, setConfirmPassword] = useState(""); // Almacenar la confirmación de la contraseña

  const toggleForm = () => {
    setIsLogin(!isLogin); // Alternar entre login y registro
  };

  const defaultStyle = {
    transition: `opacity 300ms ease-in-out, transform 300ms ease-in-out`,
    opacity: 0,
    transform: 'translateY(20px)',
  };

  const transitionStyles = {
    entering: { opacity: 1, transform: 'translateY(0)' },
    entered: { opacity: 1, transform: 'translateY(0)' },
    exiting: { opacity: 0, transform: 'translateY(20px)' },
    exited: { opacity: 0, transform: 'translateY(20px)' },
  };

  const handleLogin = (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario
    // Aquí puedes manejar la autenticación con el correo y la contraseña
    console.log("Iniciar sesión con:", { email, password });

    // Lógica de autenticación...
    // Si la autenticación es exitosa, limpiar los campos
    setEmail("");
    setPassword("");
  };

  const handleRegister = (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario
    // Aquí puedes manejar el registro con los datos de usuario
    if (password !== confirmPassword) {
      console.log("Las contraseñas no coinciden");
      return; // Salir si las contraseñas no coinciden
    }
    console.log("Registrarse con:", { firstName, lastName, email, password });

    // Lógica de registro...
    // Si el registro es exitoso, limpiar los campos
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EAE9E5]">
      <div className="w-full max-w-md p-6 bg-[#65633F] rounded-lg shadow-2xl">
        <div className="p-8 bg-[#EAE9E5] rounded-lg">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src={OriginalLogo}
              alt="Logo"
              className="w-16 h-16 sm:w-20 sm:h-20"
            />
          </div>

          {/* Botón para alternar entre Login y Register */}
          <div className="mb-6 text-center">
            <button
              onClick={toggleForm}
              className="text-sm transition-colors text-l_color_v-600 hover:text-l_color_v-700"
            >
              {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia Sesión"}
            </button>
          </div>

          {/* Transición del formulario */}
          <Transition in={isLogin} timeout={300}>
            {(state) => (
              <form
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state],
                }}
                onSubmit={handleLogin} // Manejo del envío del formulario para login
              >
                {/* Login Form */}
                {isLogin && (
                  <>
                    <div className="mb-4">
                      <input
                        type="email"
                        placeholder="Correo Electrónico"
                        value={email} // Vincular el valor del input al estado
                        onChange={(e) => setEmail(e.target.value)} // Actualizar el estado al escribir
                        className="w-full p-3 mb-4 bg-gray-100 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="password"
                        placeholder="Contraseña"
                        value={password} // Vincular el valor del input al estado
                        onChange={(e) => setPassword(e.target.value)} // Actualizar el estado al escribir
                        className="w-full p-3 mb-4 bg-gray-100 rounded-md"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full p-3 mt-4 text-white transition-all rounded-md bg-l_color_v-600 hover:bg-l_color_v-700"
                    >
                      Iniciar Sesión
                    </button>
                  </>
                )}
              </form>
            )}
          </Transition>

          <Transition in={!isLogin} timeout={300}>
            {(state) => (
              <form
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state],
                }}
                onSubmit={handleRegister} // Manejo del envío del formulario para registro
              >
                {/* Register Form */}
                {!isLogin && (
                  <>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Nombre"
                        value={firstName} // Vincular el valor del input al estado
                        onChange={(e) => setFirstName(e.target.value)} // Actualizar el estado al escribir
                        className="p-3 bg-gray-100 rounded-md"
                      />
                      <input
                        type="text"
                        placeholder="Apellido"
                        value={lastName} // Vincular el valor del input al estado
                        onChange={(e) => setLastName(e.target.value)} // Actualizar el estado al escribir
                        className="p-3 bg-gray-100 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="email"
                        placeholder="Correo Electrónico"
                        value={email} // Vincular el valor del input al estado
                        onChange={(e) => setEmail(e.target.value)} // Actualizar el estado al escribir
                        className="w-full p-3 mb-4 bg-gray-100 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="password"
                        placeholder="Contraseña"
                        value={password} // Vincular el valor del input al estado
                        onChange={(e) => setPassword(e.target.value)} // Actualizar el estado al escribir
                        className="w-full p-3 mb-4 bg-gray-100 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="password"
                        placeholder="Confirmar Contraseña"
                        value={confirmPassword} // Vincular el valor del input al estado
                        onChange={(e) => setConfirmPassword(e.target.value)} // Actualizar el estado al escribir
                        className="w-full p-3 mb-4 bg-gray-100 rounded-md"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full p-3 mt-4 text-white transition-all rounded-md bg-l_color_v-600 hover:bg-l_color_v-700"
                    >
                      Registrarse
                    </button>
                  </>
                )}
              </form>
            )}
          </Transition>
        </div>
      </div>
    </div>
  );
};

export default AuthAdmin;
