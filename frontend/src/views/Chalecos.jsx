import React, { useState, useEffect } from 'react';
import DashboardButton from '../components/DashboardButton';
import API from "../axiosConfig";
import Swal from "sweetalert2";

function Chalecos() {
  const [chalecos, setChalecos] = useState([]);
  const [beneficiarios, setBeneficiarios] = useState([]); // Lista de beneficiarios
  const [newChaleco, setNewChaleco] = useState({ serial: "", beneficiario_cedula: "" });

  useEffect(() => {
    fetchChalecos();
    fetchBeneficiarios();
  }, []);

  const fetchChalecos = async () => {
    try {
      const response = await API.get("/chalecos/");
      setChalecos(response.data);
    } catch (error) {
      console.error("Error al obtener chalecos:", error);
    }
  };

  const fetchBeneficiarios = async () => {
    try {
      const response = await API.get("/beneficiarios/");
      setBeneficiarios(response.data);
    } catch (error) {
      console.error("Error al obtener beneficiarios:", error);
    }
  };

  const handleCreateChaleco = async () => {
    const { serial, beneficiario_cedula } = newChaleco;

    // Validar que la cédula ingresada exista en la lista de beneficiarios
    const cedulaExiste = beneficiarios.some((b) => String(b.cedula) === String(beneficiario_cedula));
    if (!cedulaExiste) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "La cédula ingresada no corresponde a ningún beneficiario.",
      });
    }

    try {
      await API.post("/chalecos/", { serial, beneficiario_cedula });
      Swal.fire("Éxito", "Chaleco creado correctamente", "success");
      fetchChalecos(); // Recargar lista
      setNewChaleco({ serial: "", beneficiario_cedula: "" });
    } catch (error) {
      console.error("Error al crear chaleco:", error);
    }
  };

  const handleEditChaleco = async (serial) => {
    const chaleco = chalecos.find((c) => c.serial === serial);
    const { value: beneficiario_cedula } = await Swal.fire({
      title: "Editar Cédula",
      input: "text",
      inputValue: chaleco?.beneficiario_cedula || "",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value || !beneficiarios.some((b) => String(b.cedula) === String(value))) {
          return "Debes ingresar una cédula válida.";
        }
      },
    });

    if (beneficiario_cedula) {
      try {
        await API.put(`/chalecos/${serial}/`, { serial, beneficiario_cedula });
        Swal.fire("Éxito", "Chaleco actualizado correctamente", "success");
        fetchChalecos();
      } catch (error) {
        console.error("Error al actualizar chaleco:", error);
      }
    }
  };

  const handleDeleteChaleco = async (serial) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        await API.delete(`/chalecos/${serial}/`);
        Swal.fire("Eliminado", "El chaleco ha sido eliminado.", "success");
        fetchChalecos();
      } catch (error) {
        console.error("Error al eliminar chaleco:", error);
      }
    }
  };

  return (
    <article className="w-full h-screen p-12 flex flex-col justify-center items-center bg-[url('/src/assets/banner.webp')] bg-cover bg-center">
      <div className="flex flex-col items-center p-8 bg-white/50 backdrop-blur-lg border border-white/60 w-3/5 h-full rounded-lg overflow-y-auto max-h-screen">
        <h1 className="text-3xl font-bold w-full text-center mb-4">Gestionar Chalecos</h1>

        <DashboardButton />

        {/* Tabla de Chalecos */}
        <div className='bg-white p-4 rounded shadow-md mt-4 mb-4 w-full'>
          <table className="w-full bg-white border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Serial</th>
                <th className="border p-2">Beneficiario Cédula</th>
                <th className="border p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {chalecos.map((chaleco) => (
                <tr key={chaleco.serial} className="border text-center">
                  <td className="border p-2">{chaleco.serial}</td>
                  <td className="border p-2">{chaleco.beneficiario_cedula}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEditChaleco(chaleco.serial)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600 transition-all"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteChaleco(chaleco.serial)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-all"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Formulario de Crear Chaleco */}
        <h2 className="text-xl font-bold mt-6">Agregar Chaleco</h2>
        <div className="mt-2 flex space-x-2 bg-white p-4 rounded shadow-md mb-4 w-full">
          <input
            type="text"
            placeholder="Serial"
            value={newChaleco.serial}
            onChange={(e) => setNewChaleco({ ...newChaleco, serial: e.target.value })}
            className="border-2 p-2 w-full rounded border-gray-400 bg-gray-100 outline-none focus:border-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Cédula del Beneficiario"
            value={newChaleco.beneficiario_cedula}
            onChange={(e) => setNewChaleco({ ...newChaleco, beneficiario_cedula: e.target.value })}
            className="border-2 p-2 w-full rounded border-gray-400 bg-gray-100 outline-none focus:border-blue-500"
            required
          />
          <button
            onClick={handleCreateChaleco}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
          >
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}

export default Chalecos;
