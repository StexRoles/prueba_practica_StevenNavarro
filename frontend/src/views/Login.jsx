import { useState } from "react";
import API from "../axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2'

function Login() {
  const [nombreusuario, setUsername] = useState("");
  const [contraseña, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await API.post("login/", { nombreusuario, contraseña });
      localStorage.setItem("token", response.data.token);

      Toast.fire({
        icon: "success",
        title: "Sesión iniciada",
      });

      navigate("/dashboard");

    } catch (err) {
      const errorMessage = err.response?.data?.error;
      setError(errorMessage);
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: errorMessage,
        confirmButtonText: 'Aceptar'
      });
    }
  };


  return (
    <>
      <main className='w-full h-screen flex'>
        <section className='w-1/2 h-full'>
          <img className='w-full h-full' src="/src/assets/banner.webp" alt="Banner" />
        </section>

        <section className='flex flex-col justify-center w-1/2 h-full bg-gray-100 p-24'>
          <p className='text-3xl font-bold'>Te damos la bienvenida</p>
          <p className='text-xl mb-6'>Ingresa tus credenciales.</p>

          <form onSubmit={handleSubmit} action="" className='flex flex-col w-full'>
            <label htmlFor="nombreusuario" className='text-sm mb-1.5'>Nombre de usuario</label>
            <input type="text"  value={nombreusuario} onChange={(e) => setUsername(e.target.value)} id='nombreusuario' placeholder='Ingresa tu usuario' className='h-12 p-2 mb-6 w-4/5 border-2 border-gray-300 rounded-lg bg-gray-200 outline-none focus:border-blue-500' />

            <label htmlFor="contraseña" className='text-sm mb-1.5'>Contraseña</label>
            <input type="password"  value={contraseña} onChange={(e) => setPassword(e.target.value)} id='contraseña' placeholder='Ingresa tu contraseña' className='h-12 p-2 mb-6 w-4/5 border-2 border-gray-300 rounded-lg bg-gray-200 outline-none focus:border-blue-500' />

            <button type="submit" className='h-12 p-2 w-4/5 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all  text-white font-bold'>Ingresar</button>
          </form>

          <Link to="/register" className='text-blue-600 mt-6'>¿No tienes cuenta? Regístrate</Link>
        </section>
      </main>
    </>
  )
}

export default Login
