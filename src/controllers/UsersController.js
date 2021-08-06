const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const { body, validationResult } = require("express-validator")
const User = require("../models/Users")



router.post("/api/register", [
    body("name").notEmpty().withMessage("inform the name"),
    body("cnpj").isLength({min: 14, max: 14}).withMessage("inform the CNPJ correctly"),
    body("email").isEmail().withMessage("inform the email"),
    body("password").isLength({min: 5}).withMessage("enter the password with at least 5 characters"),
    body("phone").isLength({min: 10}).withMessage("inform the PHONE correctly")
], (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
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
                    password: user.password,
                    phone: user.phone
                }
                return res.status(200).json({message: "created user"})         
            }).catch(error => {
                return res.status(500).json({message: "error, try again later"})  
            })
        } else{
            return res.status(400).json({message: "already registered user"})
        }
    })
})

router.post("/api/login", (req, res) => {
   
})


module.exports = router