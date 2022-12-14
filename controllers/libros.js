const{request, response} = require("express")
const pool = require("../db/connection")
const {modellibros, updatelibro}= require("../models/libros")


const addLibro = async (req = request, res = response) => {
    const {Titulo,
        Autor,	
        Edicion,	
        Idioma,
        Categoria,	
        Cantidad,	
        Activo} = req.body//URI params

    if(!Titulo || !Categoria || !Activo){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }

    let conn;
    try {
        conn = await pool.getConnection()//Realizamos la conexión
        //generamos la consulta
        const [userExist] = await conn.query(modellibros.queryLibroExists,[Titulo])
        
        if(userExist){
            res.status(400).json({msg: `El libro '${Titulo}' ya se encuentra registrado`})
            return
        }
                 //generamos la consulta
                    const result = await conn.query(modellibros.queryAddLibros,
                        [   Titulo,
                            Autor,	
                            Edicion,	
                            Idioma,
                            Categoria,	
                            Cantidad,	
                            Activo], (error) => {if(error) throw error})
                        console.log(result.affectedRows)
                    if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
                    res.status(404).json({msg: `No se pudo agregar el libro con el Nombre ${Titulo}`})
                    return
                    }
                    res.json({msg:`Se agregó satisfactoriamente el libro con Nombre ${Titulo}`})//Se manda la lista de usuarios
    }catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}

const updateLibroByTitulo = async (req = request, res = response) =>{
    const {
       
        Titulo,
        Autor,	
        Edicion,	
        Idioma,
        Categoria,	
        Cantidad,	
        Activo

    } = req.body

    if (
        !Titulo||
        !Categoria||
        !Activo      
    ){
        res.status(400).json({msg:"Falta datos"})
        return
    }

    let conn;
    try {
        conn = await pool.getConnection()
        const [user]=await conn.query(modellibros.queryLibroExists,[Titulo])
        if (!user){
            res.status(403).json({msg: `El libro ${Titulo} no se encuentra registrado`})
        }
        const {affectedRows} = await conn.query(updatelibro( 
        Titulo,     
        Autor,	
        Edicion,	
        Idioma,
        Categoria,	
        Cantidad,	
        Activo
            
        ),(error)=>{throw new error})
        if (affectedRows === 0) {
            res.status(404).json({msg:`No se pudo actualizar el registro del libro ${Titulo}`})
            return
        }
        res.json({msg: `El libro ${Titulo} se actualizo correctamente.`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const getLibros = async (req = request, res = response) => {
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const books = await conn.query(modellibros.queryGetLibros, (error) => {if (error) throw error})

        if(!books){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: "NO existen libros registrados"})
            return
        }
        res.json({books})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }
}


const getlibrosByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const [book] = await conn.query(modellibros.queryGetLibroByID, [id], (error) => {if (error) throw error})
        console.log(book)

        if(!book){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: `NO existen libros registrados con el ID ${id}`})
            return
        }
        res.json({book})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }


}

const deletelibrosByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const result = await conn.query(modellibros.queryDeletelibroByID, [id], (error) => {if (error) throw error})
        console.log(result.affectedRows)

        if(result.affectedRows === 0){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: `NO existen libros registrados con el ID ${id}`})
            return
        }

        res.json({msg:`Se elemino el libro con el ID ${id}`})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }


}




module.exports = { addLibro, updateLibroByTitulo, getLibros, getlibrosByID, deletelibrosByID}