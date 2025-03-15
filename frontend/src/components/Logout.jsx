import API from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Logout = () => {
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

    const handleLogout = () => {
            Toast.fire({
                icon: "success",
                title: "Sesión cerrada"
            });

            localStorage.removeItem("token");
            navigate("/login");
    };

    return (
        <button onClick={handleLogout} type="button" className="bg-red-500 text-white font-bold px-4 py-2 rounded hover:scale-[1.01] transition-all">
            Cerrar sesión
        </button>
    );
};

export default Logout;