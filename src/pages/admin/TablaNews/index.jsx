import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import React, { useEffect, useState } from 'react';
import { obtenerNoticiasPagAdmin, EliminarNoticia } from '../../../Api/noticias';
import { MdEditDocument } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { obtenerProgramas } from '../../../Api/programas';


const TablaNews = () => {

    const [categoria, setCategoria] = useState([]);

    const [noticias, setNoticias] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);


    // Función para obtener los eventos con paginación
    const fetchNoticias = async (page) => {
        try {
            setIsLoading(true); // Iniciar estado de carga
            const response = await obtenerNoticiasPagAdmin({ params: { page: Number(page), limit: 10 } });
            if (response.data.noticias){
                setNoticias(response.data.noticias); // Actualizar el estado con los eventos
            } else{
                setNoticias([]);
            }
            setCurrentPage(response.data.currentPage); // Actualizar la página actual
            setTotalPages(response.data.totalPages); // Actualizar el total de páginas
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false); // Finalizar estado de carga
        }
    };
    // Llamada inicial para cargar los datos al montar el componente
    useEffect(() => {
        fetchNoticias(currentPage);
    }, [currentPage]);

    const columnHelper = createColumnHelper();

    const truncateText = (text, maxLength) => {
        if (!text) return '';
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    useEffect(() => {
        const fetch = async () => {
            const response = await obtenerProgramas()
            setCategoria(response.data)
        }
        fetch()
    }, [])

    const stripHtml = (html) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        return tempDiv.innerText;
    };

    const columns = [
        columnHelper.accessor('_id', {
            header: 'ID',
            cell: info => null,
            enableColumnFilter: false,
            size: 0,
            meta: {
                hidden: true,
            },
        }),
        columnHelper.accessor('titulo', {
            header: "Titulo",
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('cuerpo', {
            header: "Cuerpo",
            cell: info => (
                <div className="line-clamp-2">
                    {stripHtml(info.getValue())}
                </div>)
        }),
        columnHelper.accessor('fecha', {
            header: "Fecha",
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('programa_id', {
            header: "Programa",
            cell: info => {
                const programagaa = categoria.find(programa => programa._id.toString() === info.getValue())
                return programagaa ? programagaa.titulo : ''
            }

        })
    ];

    const table = useReactTable({
        data: noticias,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const navigate = useNavigate();

    const handleDelete = async (id, titulo) => {
        const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar la noticia "${titulo}"?`);
        
        if (confirmDelete) {
            try {
                // Llamada a la función de eliminación de la noticia
                const success = await EliminarNoticia({ id });
                
                if (success) {
                    // Refresca los datos después de eliminar
                    fetchNoticias(currentPage);
                   
                } 
            } catch (error) {
                console.error(error);
                
            }
        }
    };
    
    
    const EditarNoticias = (id) => {
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
                    <h3 className="text-xl font-semibold text-gray-700">Noticias</h3>
                    <button
                        onClick={() => navigate('/admin/newsad')}
                        className="flex items-center px-4 py-2 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                        Agregar
                        <FaPlus className="ml-1" size={13} />
                    </button>
                </div>

                {/* Tabla */}
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 table-auto">
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id} className="text-left bg-gray-200">
                                    {headerGroup.headers.map(header => (
                                        <th
                                            key={header.id}
                                            className={`px-2 py-2 text-sm font-semibold text-gray-600 border border-gray-300 ${header.column.id === '_id' ? 'hidden' : ''}`}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </th>
                                    ))}
                                    <th className="px-2 py-2 text-sm font-semibold text-gray-600 border border-gray-300">Acciones</th>
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
                                            className={`px-2 py-2 text-sm text-gray-700 border border-gray-300 ${cell.column.id === '_id' ? 'hidden' : ''}`}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                    <td className="px-4 py-2 text-center border border-gray-300">
                                        <button
                                            type='button'
                                            onClick={() => EditarNoticias(row.original._id)}
                                            className="text-blue-500 transition-colors hover:text-blue-600">

                                            <MdEditDocument size={20} />

                                        </button>
                                        <button
                                            type='button'
                                            onClick={() => handleDelete(row.original._id, row.original.titulo)} // Uso de la función handleDelete
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

                {/* PaginaciÃ³n */}
                <div className="flex items-center justify-between mt-6">
                    <button
                        className={`px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors ${currentPage === 1 || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1 || isLoading}
                    >
                        Anterior
                    </button>
                    <button
                        className={`px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors ${currentPage === totalPages || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
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

export default TablaNews;