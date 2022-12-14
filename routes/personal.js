const{Router} = require("express")
const {addpe, updatepeBycorreo, getpe, getpeByID, deletepeByID} = require("../controllers/personal")

const router = Router()

//http://localhost:4000/api/v1/users/
//get
router.get("/", getpe)

router.get("/id/:id", getpeByID)

//delete
router.delete("/id/:id", deletepeByID)

//use
router.post("/", addpe)
//update
router.put("/", updatepeBycorreo)

module.exports = router