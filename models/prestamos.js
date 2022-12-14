const modelprestamos = {
    queryGetpre: "SELECT * FROM Prestamos",
    queryGetpreByID:`SELECT * FROM Prestamos WHERE id_cliente = ?`,
    queryDeletepreByID: `UPDATE Prestamos SET Activo = 'N' WHERE id_cliente = ?`,
    querypreExists: `SELECT Correo FROM Prestamos WHERE Correo = ?`,
    queryAddpre:
    `INSERT INTO Prestamos(
        Nombre_completo,	
        Direccion,	
        Correo,	
        Titulo_Libro,	
        Fecha_Salida,	
        Fecha_Devolucion,	
        Dias_Retardo,	
        Multa,		
        Activo)
                VALUES (
                            ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    
    }

    const updateprestamo = (
        Nombre_completo,	
        Direccion,	
        Correo,	
        Titulo_Libro,	
        Fecha_Salida,	
        Fecha_Devolucion,	
        Dias_Retardo,	
        Multa,		
        Activo
        
        
    ) => {
        return `UPDATE Prestamos SET
                   
                    Nombre_Completo = '${Nombre_completo}',
                    Direccion = '${Direccion}',
                    Titulo_Libro = '${Titulo_Libro}',
                    Fecha_Salida = '${Fecha_Salida}',
                    Fecha_Devolucion = '${Fecha_Devolucion}',
                    Dias_Retardo = '${Dias_Retardo}',
                    Multa = '${Multa}',
                    Activo = '${Activo}'
                WHERE Correo = '${Correo}'`
    }
    
    module.exports = {modelprestamos, updateprestamo}