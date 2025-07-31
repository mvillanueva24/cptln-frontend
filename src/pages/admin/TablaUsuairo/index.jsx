import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import React, { useEffect, useState } from 'react';
import { obtenerUsuarios, eliminarUsuario } from '../../../Api/auth';
import { MdEditDocument, MdDeleteForever } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";

const TablaUsuario = () => {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState([]);
    const [loading, setIsLoading] = useState(true)

    const fetchUsuario = async (page) => {
        try {
            setIsLoading(true)
            const response = await obtenerUsuarios();
            setUsuario(response.data)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false); // Finalizar estado de carga
        }
    };

    useEffect(() => {
        fetchUsuario();
    }, []);

    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor('nombres', {
            header: "Nombre",
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('apellidos', {
            header: "Apellidos",
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('correo', {
            header: "Correo",
            cell: info => info.getValue(),
        })
    ];

    const table = useReactTable({
        data: usuario,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleDelete = async (id, nombres) => {
        const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar "${nombres}"?`);
        if (confirmDelete) {
            try {
                await eliminarUsuario(id); // Llamada a la API para eliminar el usuario
                setUsuario(prevUsuarios => prevUsuarios.filter(user => user._id !== id)); // Elimina el usuario de la lista en el frontend
                alert("Usuario eliminado exitosamente.");
            } catch (error) {
                console.error("Error eliminando el Usuario:", error);
                alert("Hubo un error al eliminar el Usuario.");
            }
        }
    };
    return (
        <div className="flex justify-center mt-10">
            <div className="w-full max-w-5xl p-6 rounded-lg shadow-lg bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-700">Usuarios</h3>
                    <button
                        onClick={() => navigate('/admin/users/cptln/register')}
                        className="flex items-center px-4 py-2 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600"
                    >
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
                                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>

                                    {row.getVisibleCells().map(cell => (
                                        <td
                                            key={cell.id}
                                            className={`px-4 py-2 border border-gray-300 ${cell.column.id === '_id' ? 'hidden' : ''}`}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}

                                    <td className="w-20 px-4 py-2 text-center border border-gray-300">
                                        <button
                                            type='button'
                                            onClick={() => EditarUsuario(row.original._id)}
                                            className="text-blue-500 transition-colors hover:text-blue-600">
                                            <MdEditDocument size={20} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(row.original._id, row.original.nombres)} // Pasar tanto el id como el nombre
                                            className="text-red-500 transition-colors hover:text-red-600"
                                        >
                                            <MdDeleteForever size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TablaUsuario;