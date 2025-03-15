import React, { useState } from 'react';
import DashboardButton from '../components/DashboardButton';
import axios from 'axios';
import Swal from 'sweetalert2';

function Filtro() {
  const [query, setQuery] = useState("");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setError(null);
      const response = await axios.get(`http://127.0.0.1:8000/api/search_beneficiarios/?query=${query}`);
      if (response.data.length === 0) {
        setResultado(null);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se encontraron beneficiarios',
        });
      } else {
        setResultado(response.data);
      }
    } catch (err) {
      setResultado(null);
      setError("No se encontraron beneficiarios");
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se encontraron beneficiarios',
      });
    }
  };

  return (
    <article className="w-full h-screen p-12 flex flex-col justify-center items-center bg-[url('/src/assets/banner.webp')] bg-cover bg-center">
      <div className="flex flex-col items-center p-8 bg-white/50 backdrop-blur-lg border border-white/60 w-3/5 h-3/4 rounded-lg">
        <h1 className="text-3xl font-bold w-full text-center mb-4">Filtrar Chalecos</h1>

        <DashboardButton />

        <div className='w-full flex flex-col mt-4 justify-center items-center'>
          <div className='mt-2 flex space-x-2 bg-white p-4 rounded shadow-md mb-4 w-full'>
            <input
              type="text"
              placeholder="Ingrese nombre o cédula"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-2 p-2 w-full rounded border-gray-400 bg-gray-100 outline-none focus:border-blue-500"
            />
            <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all">Buscar</button>
          </div>

          {resultado && (
            <div className='bg-white p-4 rounded shadow-md mt-4 mb-4 w-full'>
              <table border="1" className="mt-4 w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">Cédula</th>
                    <th className="border p-2">Nombre</th>
                    <th className="border p-2">Cantidad de Chalecos</th>
                  </tr>
                </thead>
                <tbody>
                  {resultado.map((b) => (
                    <tr key={b.cedula} className="text-center"> 
                      <td className="border p-2">{b.cedula}</td>
                      <td className="border p-2">{b.nombre}</td>
                      <td className="border p-2">{b.chalecos_count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default Filtro;