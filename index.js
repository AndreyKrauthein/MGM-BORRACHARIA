const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const cors = require("cors")
const connection = require("./src/database/database")
const bodyParser = require("body-parser")
const session = require("express-session")

const UsersController = require("./src/controllers/UsersController")
const ProdutosController = require("./src/controllers/ProdutosController")

//Sessions
app.use(session({
    secret: "qualquercoisa",
    cookie: {maxAge: 30000000} //definindo o tempo do cookie em milisegundos (expiraçao da sessao)
}))

//cookie parser
app.use(cookieParser())

//cors
app.use(cors())

//receber e enviar json
app.use(express.json())

//body-parser
app.use(bodyParser.urlencoded({extended: false}))



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

app.get("/home", (req, res) => {
    if(req.session.user){
        return res.json({message: "Está logado"})
    }
    return res.json({message: "Não está logao"})
})

app.listen(5000, () => {
    console.log("Server working")
})