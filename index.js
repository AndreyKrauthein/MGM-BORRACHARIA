const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const cors = require("cors")
const path = require("path")
const connection = require("./src/database/database")
const session = require("express-session")

const UsersController = require("./src/controllers/UsersController")
const ProdutosController = require("./src/controllers/ProdutosController")
//cookie parser

app.use(cookieParser())

//cors
app.use(cors())

//receber e enviar json
app.use(express.json())

//connection
connection
    .authenticate()
    .then(() => {
        console.log("Conexao feita com banco de dados")
    })
    .catch((error) => {
        console.log("Conexao não feita com banco de dados")
    })



//rotas
app.use("/", UsersController)
app.use("/", ProdutosController)

app.listen(5000, () => {
    console.log("Server working")
})