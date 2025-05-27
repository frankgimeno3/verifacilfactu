"use client";
import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import PageButtonList from "./PageButtonList";

interface ServiciosProps { }

const mockServicios = Array.from({ length: 48 }, (_, i) => ({
  id: i + 1,
  medio: ["Web", "TV", "Radio", "Prensa"][i % 4],
  producto: `Producto ${i + 1}`,
  precio: (Math.random() * 1000).toFixed(2),
}));

const Servicios: FC<ServiciosProps> = () => {
  const router = useRouter();
  const [idSearch, setIdSearch] = useState("");
  const [medioSearch, setMedioSearch] = useState("");
  const [productoSearch, setProductoSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleRedirection = (path: string) => {
    router.push(path);
  };

  const filteredServicios = mockServicios.filter((servicio) => {
    if (idSearch) return servicio.id.toString() === idSearch;
    return (
      servicio.medio.toLowerCase().includes(medioSearch.toLowerCase()) &&
      servicio.producto.toLowerCase().includes(productoSearch.toLowerCase())
    );
  });

  const itemsPerPage = 20;
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filteredServicios.slice(start, start + itemsPerPage);
  const totalPages = Math.ceil(filteredServicios.length / itemsPerPage);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Servicios</h1>

      <div className="flex justify-between items-start   mb-4">
        <div className="flex flex-col gap-2" >
          <div className="flex flex-row">
            <input
              type="text"
              placeholder="Buscar por ID exacto"
              value={idSearch}
              onChange={(e) => setIdSearch(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
              style={{"width":"500px"}}
            />
            <button className="ml-4 px-4 py-2 bg-white shadow hover:border  hover:border-gray-100 rounded"
                        onClick={() => setCurrentPage(1)}
>
              Buscar
            </button>
          </div>
          <div className="flex flex-row">
            <input
              type="text"
              placeholder="Filtrar por Medio"
              value={medioSearch}
              onChange={(e) => setMedioSearch(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
              style={{"width":"500px"}}
            />
            <button className="ml-4 px-4 py-2 bg-white shadow hover:border  hover:border-gray-100 rounded"
                        onClick={() => setCurrentPage(1)}
>
              Buscar
            </button>
          </div>
          <div className="flex flex-row">
            <input
              type="text"
              placeholder="Filtrar por Producto"
              value={productoSearch}
              onChange={(e) => setProductoSearch(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
              style={{"width":"500px"}}
            />
            <button className="ml-4 px-4 py-2 bg-white shadow hover:border  hover:border-gray-100 rounded"
                        onClick={() => setCurrentPage(1)}
>
              Buscar
            </button>
          </div>


 
        </div>

        <button
          onClick={() => handleRedirection("/logged/servicios/crearservicio")}
          className="ml-4 px-4 py-2 bg-white shadow hover:border  hover:border-gray-100 rounded"
        >
          Crear servicio
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID Servicio</th>
              <th className="px-4 py-2 border">Medio</th>
              <th className="px-4 py-2 border">Producto</th>
              <th className="px-4 py-2 border">Precio</th>
              <th className="px-4 py-2 border">Editar</th>
              <th className="px-4 py-2 border">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((servicio) => (
              <tr key={servicio.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{servicio.id}</td>
                <td className="px-4 py-2 border">{servicio.medio}</td>
                <td className="px-4 py-2 border">{servicio.producto}</td>
                <td className="px-4 py-2 border">€{servicio.precio}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() =>
                      handleRedirection(
                        `/logged/servicios/editarservicio/${servicio.id}`
                      )
                    }
                  >
                    Editar
                  </button>
                </td>
                <td className="px-4 py-2 border">
                  <button className="text-red-600 hover:underline">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center">
        <PageButtonList
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Servicios;
