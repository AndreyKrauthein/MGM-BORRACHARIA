const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")

const User = require("../models/Users")

router.post("/api/register", (req, res) => {
    const {name, cnpj, email, password, phone} = req.body
    User.findOne({where: {email: email}})
    .then(user => {
        if(user == undefined){
            let salt = bcrypt.genSaltSync(10)
            let hash = bcrypt.hashSync(password, salt)
            User.create({
                name: name,
                cnpj: cnpj,
                email: email,
                password: hash,
                phone: phone,
            }).then((user) => {
                req.session.user = {
                    id: user.id,
                    name: user.name,
                    cnpj: user.cnpj,
                    email: user.email,
                    phone: user.phone
                } 
                return res.status(200)               
            }).catch(error => {
               return res.status(500)
            })
        } else{
            return res.status(500)
        }
    })
})

router.post("/api/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({
        where: {email: email}
    }).then(user => {
        if (user != undefined){
            let correct = bcrypt.compareSync(password, user.password)

            if (correct){  
                //COLOCAR A SESSÃO              
                return res.status(200).json(user)
            } else {
                //campos incorretos
                
                
            }
            
        } else {
            // nao encontrou email
            

        }
    })
})


module.exports = router