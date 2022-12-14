const modellibros = {
    queryGetLibros: "SELECT * FROM Libros",
    queryGetLibroByID:`SELECT * FROM Libros WHERE id_libro = ?`,
    queryDeletelibroByID: `UPDATE Libros SET Activo = 'N' WHERE id_libro = ?`,
    queryLibroExists: `SELECT Titulo FROM Libros WHERE Titulo = ?`,
    queryAddLibros:
    `INSERT INTO Libros(
        Titulo,
        Autor,	
        Edicion,	
        Idioma,
        Categoria,	
        Cantidad,	
        Activo)
                VALUES (
                            ?, ?, ?, ?, ?, ?, ?)`
    
    }
    const updatelibro = (
        Titulo, 
        Autor,	
        Edicion,	
        Idioma,
        Categoria,	
        Cantidad,	
        Activo
    ) => {
        return `UPDATE Libros SET
                   
                    Autor = '${Autor}',
                    Edicion = '${Edicion}',
                    Idioma = '${Idioma}',
                    Categoria = '${Categoria}',
                    Cantidad = '${Cantidad}',
                    Activo = '${Activo}'
                WHERE Titulo = '${Titulo}'`
    }
    
    module.exports = {modellibros, updatelibro}