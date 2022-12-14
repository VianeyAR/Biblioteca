const express = require('express')
const librosRouter = require('./routes/libros')
const personalRouter = require('./routes/personal')
const prestamosRouter = require('./routes/prestamos')


const cors = require('cors')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            libros: "/api/v1/libros",
            personal: "/api/v1/personal",
            prestamos: "/api/v1/prestamos"
            
        }
        this.middlewares()
        this.routes()
    }
    routes(){ ','
        
       this.app.use(this.paths.libros, librosRouter)
       this.app.use(this.paths.personal, personalRouter)
       this.app.use(this.paths.prestamos, prestamosRouter)
      
 }
    middlewares(){
        this.app.use(cors())// habilita origen curzado
        this.app.use(express.json())
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port)
        })
    }
}
module.exports = Server



