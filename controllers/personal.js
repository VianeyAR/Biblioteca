const{request, response} = require("express")
const pool = require("../db/connection")
const {modelpersonal, updatepersonal}= require("../models/personal")


const addpe = async (req = request, res = response) => {
    const {
        Nombre_completo,	
        Correo,	
        Direccion,	
        Telefono,	
        Activo} = req.body//URI params

    if(!Correo || !Activo){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }

    let conn;
    try {
        conn = await pool.getConnection()//Realizamos la conexión
        //generamos la consulta
        const [userExist] = await conn.query(modelpersonal.querypersonalExists,[Correo])
        
        if(userExist){
            res.status(400).json({msg: `El empleado '${Nombre_completo}' ya se encuentra registrado`})
            return
        }
                 //generamos la consulta
                    const result = await conn.query(modelpersonal.queryAddPersonal,
                        [   Nombre_completo,	
                            Correo,	
                            Direccion,	
                            Telefono,	
                            Activo], (error) => {if(error) throw error})
                        console.log(result.affectedRows)
                    if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
                    res.status(404).json({msg: `No se pudo agregar el empleado con el Nombre ${Nombre_completo}`})
                    return
                    }
                    res.json({msg:`Se agregó satisfactoriamente el empleado con Nombre ${Nombre_completo}`})//Se manda la lista de usuarios
    }catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}

const updatepeBycorreo = async (req = request, res = response) =>{
    const {
       
        Nombre_completo,	
        Correo,	
        Direccion,	
        Telefono,	
        Activo

    } = req.body

    if (
        !Nombre_completo||
        !Correo||
        !Activo      
    ){
        res.status(400).json({msg:"Falta datos"})
        return
    }

    let conn;
    try {
        conn = await pool.getConnection()
        const [user]=await conn.query(modelpersonal.querypersonalExists,[Correo])
        if (!user){
            res.status(403).json({msg: `El empleado ${Nombre_completo} no se encuentra registrado`})
        }
        const {affectedRows} = await conn.query(updatepersonal( 
            	
            Correo,	
            Direccion,	
            Telefono,	
            Activo
            
        ),(error)=>{throw new error})
        if (affectedRows === 0) {
            res.status(404).json({msg:`No se pudo actualizar el registro del empleado ${Nombre_completo}`})
            return
        }
        res.json({msg: `El empleado ${Nombre_completo} se actualizo correctamente.`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const getpe = async (req = request, res = response) => {
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const users = await conn.query(modelpersonal.queryGetPersonal, (error) => {if (error) throw error})

        if(!users){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: "NO existen empleados registrados"})
            return
        }
        res.json({users})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }
}


const getpeByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const [user] = await conn.query(modelpersonal.queryGetPersonal, [id], (error) => {if (error) throw error})
        console.log(user)

        if(!user){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: `NO existen empleados registrados con el ID ${id}`})
            return
        }
        res.json({user})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }


}

const deletepeByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const result = await conn.query(modelpersonal.queryDeletepersonalByID, [id], (error) => {if (error) throw error})
        console.log(result.affectedRows)

        if(result.affectedRows === 0){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: `NO existen empleados registrados con el ID ${id}`})
            return
        }

        res.json({msg:`Se elemino el empleado con el ID ${id}`})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }


}




module.exports = { addpe, updatepeBycorreo, getpe, getpeByID, deletepeByID}