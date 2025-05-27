"use client";
import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import PageButtonList from "./PageButtonList";

interface FacturasProps { }

const mockFacturas = Array.from({ length: 45 }, (_, i) => ({
  id: i + 1,
  nombreCliente: `Cliente ${i + 1}`,
  codigoCliente: `C00${(i + 1).toString().padStart(2, "0")}`,
  fecha: `2024-05-${(i % 30 + 1).toString().padStart(2, "0")}`,
}));

const Facturas: FC<FacturasProps> = () => {
  const router = useRouter();
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleRedirection = (path: string) => {
    router.push(path);
  };

  const filteredFacturas = mockFacturas.filter(
    (factura) =>
      factura.codigoCliente.includes(filter) ||
      factura.id.toString().includes(filter) ||
      factura.fecha.includes(filter)
  );

  const itemsPerPage = 20;
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filteredFacturas.slice(start, start + itemsPerPage);
  const pageCount = Math.ceil(filteredFacturas.length / itemsPerPage);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Facturas</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-row">
          <input
            type="text"
            placeholder="Buscar por código, ID o fecha"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2" style={{"width":"300px"}}
          />
          <button className="ml-4 px-4 py-2 bg-white shadow hover:border  hover:border-gray-100 rounded">
          Buscar
          </button>
        </div>

        <button
          onClick={() => handleRedirection("/logged/facturas/crearfactura")}
          className="ml-4 px-4 py-2 bg-white shadow hover:border  hover:border-gray-100 rounded"
        >
          Crear factura
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID Factura</th>
              <th className="px-4 py-2 border">Nombre Cliente</th>
              <th className="px-4 py-2 border">Código Cliente</th>
              <th className="px-4 py-2 border">Fecha</th>
              <th className="px-4 py-2 border">Descargar</th>
              <th className="px-4 py-2 border">Borrar</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((factura) => (
              <tr key={factura.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{factura.id}</td>
                <td className="px-4 py-2 border">{factura.nombreCliente}</td>
                <td className="px-4 py-2 border">{factura.codigoCliente}</td>
                <td className="px-4 py-2 border">{factura.fecha}</td>
                <td className="px-4 py-2 border">
                  <button className="text-blue-600 hover:underline">PDF</button>
                </td>
                <td className="px-4 py-2 border">
                  <button className="text-red-600 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center">
        <PageButtonList
          currentPage={currentPage}
          totalPages={pageCount}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Facturas;
