import { useNavigate } from "react-router-dom";

const DashboardButton = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/dashboard");
  };

  return (
    <button 
      onClick={handleRedirect} 
      className="w-1/4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all"
    >
      Volver
    </button>
  );
};

export default DashboardButton;
