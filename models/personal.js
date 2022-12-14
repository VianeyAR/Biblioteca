const modelpersonal = {
    queryGetPersonal: "SELECT * FROM Personal",
    queryGetPersonalByID:`SELECT * FROM Personal WHERE id_empleado = ?`,
    queryDeletepersonalByID: `UPDATE Personal SET Activo = 'N' WHERE id_empleado = ?`,
    querypersonalExists: `SELECT Correo FROM Personal WHERE Correo = ?`,
    queryAddPersonal:
    `INSERT INTO Personal(
        Nombre_completo,	
        Correo,	
        Direccion,	
        Telefono,	
        Activo)
                VALUES (
                            ?, ?, ?, ?, ?)`
    
    }

    const updatepersonal = (
        	
        Correo,	
        Direccion,	
        Telefono,	
        Activo
        
        
    ) => {
        return `UPDATE Personal SET
                   
                    
                    Direccion = '${Direccion}',
                    Telefono = '${Telefono}',
                    Activo = '${Activo}'
                WHERE Correo = '${Correo}'`
    }
    
    module.exports = {modelpersonal, updatepersonal}