import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { MdEditDocument, MdDeleteForever } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { obtenerSeccionContenidos, obtenerSeccion, eliminarContenido } from "../../../Api/radio"

const TablaRadioSeccionContenidoAdmin = () => {
    const navigate = useNavigate()
    const { idseccion } = useParams()
    const [allContenidos, setAllContenidos] = useState([])
    const [paginatedContenidos, setPaginatedContenidos] = useState([])
    const [seccion, setSeccion] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const itemsPerPage = 10

    const fetchContenidos = async () => {
        try {
            setIsLoading(true)
            const response = await obtenerSeccionContenidos(idseccion)
            setAllContenidos(response.data)
            updatePaginatedData(response.data, 1)
        } catch (error) {
            console.error(error)
            setAllContenidos([])
            setPaginatedContenidos([])
        } finally {
            setIsLoading(false)
        }
    }

    const updatePaginatedData = (data, page) => {
        const startIndex = (page - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        setPaginatedContenidos(data.slice(startIndex, endIndex))
    }

    useEffect(() => {
        fetchContenidos()
    }, [idseccion])

    useEffect(() => {
        updatePaginatedData(allContenidos, currentPage)
    }, [currentPage])

    useEffect(() => {
        const fetchSeccion = async () => {
            const response = await obtenerSeccion(idseccion)
            setSeccion(response.data.nombre)
        }
        fetchSeccion()
    }, [idseccion])

    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('descripcion', {
            header: "Descripcion",
            cell: info => <div className="line-clamp-2" dangerouslySetInnerHTML={{ __html: info.getValue()}}/>,
        }),
    ]

    const table = useReactTable({
        data: paginatedContenidos,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const handleDelete = async (idcontenido) => {
        const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar este contenido?`)
        if (confirmDelete) {
            try {
                await eliminarContenido(idseccion, idcontenido)
                fetchContenidos()
            } catch (error) {
                console.error("Error eliminando el contenido:", error)
            }
        }
    }

    const totalPages = Math.ceil(allContenidos.length / itemsPerPage)

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(curr => curr + 1)
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(curr => curr - 1)
        }
    }

    return (
        <div className="flex justify-center mt-10">
            <div className="w-full max-w-5xl p-6 rounded-lg shadow-lg bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-700">Contenido de {seccion}</h3>
                    <button
                        onClick={() => navigate('agregar')}
                        className="flex items-center px-4 py-2 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600">
                        Agregar
                        <FaPlus className="ml-1" size={13} />
                    </button>
                </div>

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
                                        <div className='grid w-full grid-cols-2 place-content-center'>
                                            <button
                                                title='Modificar Contenido'
                                                type='button'
                                                onClick={() => navigate(`${row.original._id}`)}
                                                className="flex justify-center text-blue-500 transition-colors hover:text-blue-600">
                                                <MdEditDocument size={20} className='fill-yellow-400' />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(row.original._id)}
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

                <div className="flex items-center justify-between mt-6">
                    <button
                        className={`px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-l_color_r-600 transition-colors ${currentPage === 1 || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1 || isLoading}
                    >
                        Anterior
                    </button>
                    <button
                        className={`px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-l_color_r-600 transition-colors ${currentPage === totalPages || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages || isLoading}
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TablaRadioSeccionContenidoAdmin