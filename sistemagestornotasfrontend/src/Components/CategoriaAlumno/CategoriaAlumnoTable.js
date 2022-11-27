function CategoriaAlumnoTable({categoriasAlumno, handleDeleteCategoriaAlumno, handleEditCategoriaAlumno}) {



    return (
        <table 
            className="table-custom text-sm text-left text-gray-500 dark:text-gray-400"
        >
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope = "col" className = "px-6 py-3">Codigo Categoria</th>
                    <th scope = "col" className = "px-6 py-3">Nombre Categoria</th>
                    <th scope = "col" className = "px-6 py-3">Opciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    categoriasAlumno.map( (categoriaAlumno) => {
                        return (
                            <tr key = {categoriaAlumno.id} className = "bg-white border-b dark:bg-gray-800 dark:border-gray-700 py-10">
                                <th 
                                    scope = "row" 
                                    className = "px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                                >
                                    {categoriaAlumno.codigo_categoria_alumno}
                                </th>
                                <td 
                                    className = "px-6 py-4"
                                >
                                    {categoriaAlumno.nombre_categoria_alumno}
                                </td>
                                <td className = "px-6 py-4">
                                    <button 
                                        className = "formCustom__button mx-2"
                                        onClick={() => handleEditCategoriaAlumno({id: categoriaAlumno.id})}
                                    >
                                        Editar
                                    </button> 
                                    <button 
                                        onClick={() => handleDeleteCategoriaAlumno({id: categoriaAlumno.id})}
                                        className = "formCustom__button formCustom__button--red"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>

        </table>

    );
}

export { CategoriaAlumnoTable };
