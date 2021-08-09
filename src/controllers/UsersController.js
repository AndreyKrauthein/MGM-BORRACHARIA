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
                    email: user.email,
                    password: user.password,
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

router.post("/api/login", [
    body("email").isEmail().withMessage("inform the email"),
    body("password").isLength({min: 5}).withMessage("enter the password with at least 5 characters")
], (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {email, password} = req.body
    User.findOne({where: {email: email}})
    .then((user) => {
        if(user != undefined){
            let correct = bcrypt.compareSync(password, user.password)
            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email,
                    password: user.password,
                }
                return res.status(200).json({message: "user logged in successfully"}) 
            } else {
                return res.status(401).json({message: "incorrect user information"}) 
            }
        } else {
            return res.status(404).json({message: "User not found"}) 
        }
    }).catch(err => {
        return res.status(500).json({message: "error, try again later"})  
    })
   
})

router.post("/api/logout", (req, res) => {
    if(req.session.user != undefined){
        req.session.user = undefined
        return res.status(500).json({message: "successfully disconnected"}) 
    }else {
        return res.status(500).json({message: "you are already logged out"})  
    }
})

module.exports = router