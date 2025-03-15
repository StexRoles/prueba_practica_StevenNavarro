import React from 'react'
import DashboardButton from '../components/DashboardButton'
import { useState, useEffect } from "react";
import API from "../axiosConfig";
import Swal from "sweetalert2";

function Beneficiarios() {
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [newBeneficiario, setNewBeneficiario] = useState({ cedula: "", nombre: "", direccion: "", poblacion: "" });
  const [editBeneficiario, setEditBeneficiario] = useState(null);

  // Obtener la lista de beneficiarios desde la API
  useEffect(() => {
    fetchBeneficiarios();
  }, []);

  const fetchBeneficiarios = async () => {
    try {
      const response = await API.get("/beneficiarios/");
      setBeneficiarios(response.data);
    } catch (error) {
      console.error("Error al obtener beneficiarios:", error);
    }
  };

  // Crear un beneficiario
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await API.post("/beneficiarios/", newBeneficiario);
      Swal.fire("Éxito", "Beneficiario creado correctamente", "success");
      setNewBeneficiario({ cedula: "", nombre: "", direccion: "", poblacion: "" });
      fetchBeneficiarios();
    } catch (error) {
      console.error("Error al crear beneficiario:", error);
      Swal.fire("Error", "No se pudo crear el beneficiario", "error");
    }
  };

  // Editar un beneficiario
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/beneficiarios/${editBeneficiario.cedula}/`, editBeneficiario);
      Swal.fire("Éxito", "Beneficiario actualizado correctamente", "success");
      setEditBeneficiario(null);
      fetchBeneficiarios();
    } catch (error) {
      console.error("Error al editar beneficiario:", error);
      Swal.fire("Error", "No se pudo actualizar el beneficiario", "error");
    }
  };

  // Eliminar un beneficiario con confirmación
  const handleDelete = async (cedula) => {
    const { isConfirmed } = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (isConfirmed) {
      try {
        await API.delete(`/beneficiarios/${cedula}/`);
        Swal.fire("Eliminado", "El beneficiario ha sido eliminado", "success");
        fetchBeneficiarios();
      } catch (error) {
        console.error("Error al eliminar beneficiario:", error);
        Swal.fire("Error", "No se pudo eliminar el beneficiario", "error");
      }
    }
  };

  return (
    <article className="w-full h-screen p-12 flex flex-col justify-center items-center bg-[url('/src/assets/banner.webp')] bg-cover bg-center">
      <div className="flex flex-col items-center p-8 bg-white/50 backdrop-blur-lg border border-white/60 w-3/5 h-full rounded-lg overflow-y-auto max-h-screen">
        <h1 className="text-3xl font-bold w-full text-center mb-4">Gestionar Beneficiarios</h1>

        <DashboardButton />

        {/* Tabla de beneficiarios */}
        <div className="bg-white p-4 rounded shadow-md mt-4 mb-4 w-full">
          <h2 className="text-xl font-semibold mb-2">Lista de Beneficiarios</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Cédula</th>
                <th className="border p-2">Nombre</th>
                <th className="border p-2">Dirección</th>
                <th className="border p-2">Población</th>
                <th className="border p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {beneficiarios.map((b) => (
                <tr key={b.cedula} className="text-center">
                  <td className="border p-2">{b.cedula}</td>
                  <td className="border p-2">{b.nombre}</td>
                  <td className="border p-2">{b.direccion}</td>
                  <td className="border p-2">{b.poblacion}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => setEditBeneficiario(b)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 transition-all"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(b.cedula)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Formulario para crear beneficiario */}
        <div className="bg-white p-4 rounded shadow-md mb-4 w-full">
          <h2 className="text-xl font-semibold mb-2">Agregar Beneficiario</h2>
          <form onSubmit={handleCreate} className="space-y-2">
            <input
              type="text"
              placeholder="Cédula"
              value={newBeneficiario.cedula}
              onChange={(e) => setNewBeneficiario({ ...newBeneficiario, cedula: e.target.value })}
              className="border-2 p-2 w-full rounded border-gray-400 bg-gray-100 outline-none focus:border-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Nombre"
              value={newBeneficiario.nombre}
              onChange={(e) => setNewBeneficiario({ ...newBeneficiario, nombre: e.target.value })}
              className="border-2 p-2 w-full rounded border-gray-400 bg-gray-100 outline-none focus:border-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Dirección"
              value={newBeneficiario.direccion}
              onChange={(e) => setNewBeneficiario({ ...newBeneficiario, direccion: e.target.value })}
              className="border-2 p-2 w-full rounded border-gray-400 bg-gray-100 outline-none focus:border-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Población"
              value={newBeneficiario.poblacion}
              onChange={(e) => setNewBeneficiario({ ...newBeneficiario, poblacion: e.target.value })}
              className="border-2 p-2 w-full rounded border-gray-400 bg-gray-100 outline-none focus:border-blue-500"
              required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all">
              Crear
            </button>
          </form>
        </div>

        {/* Formulario para editar beneficiario */}
        {editBeneficiario && (
          <div className="bg-white p-4 rounded shadow-md mb-4 w-full">
            <h2 className="text-xl font-semibold mb-2">Editar Beneficiario</h2>
            <form onSubmit={handleEdit} className="space-y-2">
              <input
                type="text"
                value={editBeneficiario.cedula}
                className="border p-2 w-full rounded bg-gray-200"
                disabled
              />
              <input
                type="text"
                value={editBeneficiario.nombre}
                onChange={(e) => setEditBeneficiario({ ...editBeneficiario, nombre: e.target.value })}
                className="border p-2 w-full rounded"
                required
              />
              <input
                type="text"
                value={editBeneficiario.direccion}
                onChange={(e) => setEditBeneficiario({ ...editBeneficiario, direccion: e.target.value })}
                className="border p-2 w-full rounded"
                required
              />
              <input
                type="text"
                value={editBeneficiario.poblacion}
                onChange={(e) => setEditBeneficiario({ ...editBeneficiario, poblacion: e.target.value })}
                className="border p-2 w-full rounded"
                required
              />
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all">
                Guardar cambios
              </button>
              <button
                type="button"
                onClick={() => setEditBeneficiario(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2 hover:bg-gray-600 transition-all"
              >
                Cancelar
              </button>
            </form>
          </div>
        )}
      </div>
    </article>
  )
}

export default Beneficiarios