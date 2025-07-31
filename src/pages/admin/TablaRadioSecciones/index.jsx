import React, { useEffect, useState } from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { FaPlus } from "react-icons/fa";
import { MdEditDocument, MdEditNote, MdDeleteForever } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { obtenerSecciones, eliminarSeccion } from '../../../Api/radio';

const TablaRadioSecciones = () => {
    const navigate = useNavigate();
    const [secciones, setSecciones] = useState([]);

    // Función para obtener las secciones y actualizar el estado
    const fetchSecciones = async () => {
        const response = await obtenerSecciones();
        setSecciones(response.data);
    };

    // Cargar las secciones al montar el componente
    useEffect(() => {
        fetchSecciones();
    }, []);

    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor('nombre', {
            header: "Nombre",
            cell: info => info.getValue(),
        }),
    ];

    // Función para manejar la eliminación de una sección y refrescar los datos
    const handleDelete = async (id, nombre) => {
        const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar "${nombre}"?`);
        if (confirmDelete) {
            const success = await eliminarSeccion({ id });
            if (success) {
                fetchSecciones(); // Refresca la tabla después de eliminar
            }
        }
    };

    const table = useReactTable({
        data: secciones,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <div className="flex justify-center mt-10">
                <div className="w-full max-w-5xl p-6 rounded-lg shadow-lg bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-700">Secciones</h3>
                        <button
                            onClick={() => navigate('agregar')}
                            className="flex items-center px-4 py-2 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600">
                            Agregar
                            <FaPlus className="ml-1" size={13} />
                        </button>
                    </div>

                    {/* Tabla */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-collapse border-gray-300 table-auto">
                            <thead>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id} className="text-left bg-gray-200">
                                        {headerGroup.headers.map(header => (
                                            <th
                                                key={header.id}
                                                className={`px-4 py-2 border border-gray-300`}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </th>
                                        ))}
                                        <th className="px-4 py-2 border border-gray-300">Acciones</th>
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map((row, index) => (
                                    <tr
                                        key={row.id}
                                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                    >
                                        {row.getVisibleCells().map(cell => (
                                            <td
                                                key={cell.id}
                                                className={`px-4 py-2 border border-gray-300`}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                        <td className="w-20 px-4 py-2 text-center border border-gray-300">
                                            <div className='grid w-full grid-cols-3 gap-2'>
                                                <button
                                                    title='Modificar Seccion'
                                                    type='button'
                                                    onClick={() => navigate(`${row.original._id}`)}
                                                    className="flex justify-center w-full text-blue-500 transition-colors hover:text-blue-600">
                                                    <MdEditDocument size={20} className='fill-yellow-400' />
                                                </button>
                                                <button
                                                    title='Ver contenido'
                                                    type='button'
                                                    onClick={() => navigate(`${row.original._id}/tablacontenidoseccion`)}
                                                    className="flex justify-center w-full text-blue-500 transition-colors hover:text-blue-600">
                                                    <MdEditNote size={20} />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(row.original._id, row.original.nombre)} // Pasa el id y el titulo
                                                    className="w-full text-red-500 transition-colors hover:text-red-600">
                                                    <MdDeleteForever size={20} />
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    )
}

export default TablaRadioSecciones