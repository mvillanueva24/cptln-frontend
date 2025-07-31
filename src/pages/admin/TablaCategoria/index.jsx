import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import React, { useEffect, useState } from 'react';
import { obtenerCategoriasPag, EliminarCategoria } from '../../../Api/categorias';
import { MdEditDocument, MdDeleteForever } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";


const TablaCategoria = () => {

    const [categoria, setCategoria] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false); // Estado de carga


 // Función para obtener los eventos con paginación
 const fetchCategoria = async (page) => {
    try {
        setIsLoading(true); // Iniciar estado de carga
        const response = await obtenerCategoriasPag({ params: { page: Number(page), limit: 10 } });
        if (response.data.categorias){
            setCategoria(response.data.categorias); // Actualizar el estado con los categorias
        } else{
            setCategoria([]);
        }
        setCategoria(response.data.categorias);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
    } catch (error) {
        console.log(error);
    } finally {
        setIsLoading(false); // Finalizar estado de carga
    }
};
   
    // Llamada inicial para cargar los datos al montar el componente
    useEffect(() => {
        fetchCategoria(currentPage);
    }, [currentPage]);

    const columnHelper = createColumnHelper();
    
    const stripHtml = (html) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        return tempDiv.innerText;
    };

    const columns = [
        columnHelper.accessor('_id', {
            header: 'ID',
            cell: info => null, // No muestra el valor en la celda
            enableColumnFilter: false,
            size: 0, // Mantén el tamaño en 0 para ocupar menos espacio
            meta: {
                hidden: true, // Puedes usar esta propiedad para marcar que está oculta
            },
        }),
        columnHelper.accessor('nombre', {
            header: "Nombre",
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('descripcion', {
            header: "Descripcion",
            cell: info => (
                <div className="line-clamp-2">
                    {stripHtml(info.getValue())}
                </div>)
        }),
    ];

    const table = useReactTable({
        data: categoria,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const navigate = useNavigate();

    

    const handleDelete = async (id, nombre) => {
        const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar la categoria "${nombre}"?`);
        
        if (confirmDelete) {
            try {
                // Llamada a la función de eliminación de la noticia
                const success = await EliminarCategoria({ id });
                
                if (success) {
                    // Refresca los datos después de eliminar
                    fetchCategoria(currentPage);
                   
                } 
            } catch (error) {
                console.error(error);
                
            }
        }
    };
    const EditarCategorias = (id) => {
        navigate(`${id}`);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="flex justify-center mt-10">
            <div className="w-full max-w-5xl p-6 rounded-lg shadow-lg bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-700">Categorias</h3>
                    <button
                        onClick={() => navigate('/admin/categorias')}
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
                                            className={`px-4 py-2 border border-gray-300 ${header.column.id === '_id' ? 'hidden' : ''}`}
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
                                            className={`px-4 py-2 border border-gray-300 ${cell.column.id === '_id' ? 'hidden' : ''}`}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                    <td className="px-4 py-2 text-center border border-gray-300">
                                        <button
                                            type='button'
                                            onClick={() => EditarCategorias(row.original._id)}
                                            className="text-blue-500 transition-colors hover:text-blue-600">

                                            <MdEditDocument size={20} />
                                            
                                        </button>
                                        <button
                                            type='button'
                                            onClick={() => handleDelete(row.original._id, row.original.nombre)} // Uso de la función handleDelete
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

                {/* Paginación */}
                <div className="flex items-center justify-between mt-6">
                    <button
                        className={`px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-l_color_r-600 transition-colors ${currentPage === 1 || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1 || isLoading}
                    >
                        Anterior
                    </button>
                    <button
                        className={`px-4 py-2 text-sm rounded-md  bg-red-500 text-white hover:bg-l_color_r-600 transition-colors ${currentPage === totalPages || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages || isLoading}
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
}
export default TablaCategoria;