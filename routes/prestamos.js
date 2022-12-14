const{Router} = require("express")
const {addpre, updatepreByTitulo, getpre, getpreByID, deletepreByID} = require("../controllers/prestamos")

const router = Router()

//http://localhost:4000/api/v1/users/
//get
router.get("/", getpre)

router.get("/id/:id", getpreByID)

//delete
router.delete("/id/:id", deletepreByID)

//use
router.post("/", addpre)
//update
router.put("/", updatepreByTitulo)

module.exports = router