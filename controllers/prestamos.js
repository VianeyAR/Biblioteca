const{request, response} = require("express")
const pool = require("../db/connection")
const {modelprestamos, updateprestamo}= require("../models/prestamos")


const addpre = async (req = request, res = response) => {
    const {
        Nombre_completo,	
        Direccion,	
        Correo,	
        Titulo_Libro,	
        Fecha_Salida,	
        Fecha_Devolucion,	
        Dias_Retardo,	
        Multa,		
        Activo
    } = req.body//URI params

    if(!Nombre_completo || !Direccion || !Titulo_Libro){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }

    let conn;
    try {
        conn = await pool.getConnection()//Realizamos la conexión
        //generamos la consulta
        const [userExist] = await conn.query(modelprestamos.querypreExists,[Correo])
        
        if(userExist){
            res.status(400).json({msg: `La persona con correo '${Correo}' ya se encuentra registrada`})
            return
        }
                 //generamos la consulta
                    const result = await conn.query(modelprestamos.queryAddpre,
                        [   Nombre_completo,	
                            Direccion,	
                            Correo,	
                            Titulo_Libro,	
                            Fecha_Salida,	
                            Fecha_Devolucion,	
                            Dias_Retardo,	
                            Multa,		
                            Activo], (error) => {if(error) throw error})
                        console.log(result.affectedRows)
                    if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
                    res.status(404).json({msg: `No se pudo agregar la persona con el Nombre ${Nombre_completo}`})
                    return
                    }
                    res.json({msg:`Se agregó satisfactoriamente la persona con Nombre ${Nombre_completo}`})//Se manda la lista de usuarios
    }catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}

const updatepreByTitulo = async (req = request, res = response) =>{
    const {
       
        Nombre_completo,	
        Direccion,	
        Correo,	
        Titulo_Libro,	
        Fecha_Salida,	
        Fecha_Devolucion,	
        Dias_Retardo,	
        Multa,		
        Activo

    } = req.body

    if (
        !Nombre_completo||
        !Correo||
        !Titulo_Libro||
        !Fecha_Salida||
        !Fecha_Devolucion||
        !Activo      
    ){
        res.status(400).json({msg:"Falta datos"})
        return
    }

    let conn;
    try {
        conn = await pool.getConnection()
        const [user]=await conn.query(modelprestamos.querypreExists,[Correo])
        if (!user){
            res.status(403).json({msg: `La persona con correo ${Correo} no se encuentra registrado`})
        }
        const {affectedRows} = await conn.query(updateprestamo( 
            Nombre_completo,	
            Direccion,	
            Correo,	
            Titulo_Libro,	
            Fecha_Salida,	
            Fecha_Devolucion,	
            Dias_Retardo,	
            Multa,		
            Activo
            
        ),(error)=>{throw new error})
        if (affectedRows === 0) {
            res.status(404).json({msg:`No se pudo actualizar el registro de ${Nombre_completo}`})
            return
        }
        res.json({msg: `La persona con correo ${Correo} se actualizo correctamente.`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const getpre = async (req = request, res = response) => {
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const persons = await conn.query(modelprestamos.queryGetpre, (error) => {if (error) throw error})

        if(!persons){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: "NO existen personas registradas"})
            return
        }
        res.json({persons})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }
}


const getpreByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const [person] = await conn.query(modelprestamos.queryGetpreByID, [id], (error) => {if (error) throw error})
        console.log(person)

        if(!person){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: `NO existen personas registradas con el ID ${id}`})
            return
        }
        res.json({person})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }


}

const deletepreByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const result = await conn.query(modelprestamos.queryDeletepreByID, [id], (error) => {if (error) throw error})
        console.log(result.affectedRows)

        if(result.affectedRows === 0){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: `NO existen personas registrados con el ID ${id}`})
            return
        }

        res.json({msg:`Se elemino la persona con el ID ${id}`})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }


}




module.exports = { addpre, updatepreByTitulo, getpre, getpreByID, deletepreByID}