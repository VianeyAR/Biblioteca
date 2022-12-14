const{Router} = require("express")
const {addLibro, updateLibroByTitulo, getLibros, getlibrosByID, deletelibrosByID} = 
require("../controllers/libros")

const router = Router()

//http://localhost:4000/api/v1/users/
//get
router.get("/", getLibros)

router.get("/id/:id", getlibrosByID)

//delete
router.delete("/id/:id", deletelibrosByID)

//use
router.post("/", addLibro)
//update
router.put("/", updateLibroByTitulo)

module.exports = router