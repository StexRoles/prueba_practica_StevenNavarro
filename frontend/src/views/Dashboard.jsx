import { Link } from "react-router-dom";
import Logout from "../components/Logout";

const Dashboard = () => {
    return (
        <article className="w-full h-screen flex flex-col justify-center items-center  bg-[url('/src/assets/banner.webp')] bg-cover bg-center">
            <div className="flex flex-col justify-evenly items-center p-8 bg-white/50 backdrop-blur-lg border border-white/60 w-1/3 h-1/2 rounded-lg">
                <h1 className="text-3xl font-bold">Menú Opciones</h1>
                <nav className="mt-4 w-full">
                    <ul className="space-y-2 flex flex-col items-center">
                        <li className="w-4/5 hover:bg-blue-500 transition-all rounded-sm group">
                            <Link to="/beneficiarios" className="w-full text-center h-full p-2 block font-bold group-hover:text-white transition-all">Gestión de Beneficiarios</Link>
                        </li>
                        <li className="w-4/5 hover:bg-blue-500 transition-all rounded-sm group">
                            <Link to="/chalecos" className="w-full text-center h-full p-2 block font-bold group-hover:text-white transition-all">Gestión de Chalecos</Link>
                        </li>
                        <li className="w-4/5 hover:bg-blue-500 transition-all rounded-sm group">
                            <Link to="/filtro" className="w-full text-center h-full p-2 block font-bold group-hover:text-white transition-all">Filtrar Información</Link>
                        </li>
                    </ul>
                </nav>

                <Logout />
            </div>
        </article>
    );
};

export default Dashboard;
