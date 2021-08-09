const express = require("express")
const router = express.Router()
const slugify = require("slugify")
const { body, validationResult } = require("express-validator")
const Produtos = require("../models/Produtos")

router.post("/api/register/product", [
    body("title").notEmpty().withMessage("enter a valid title"),
    body("description").notEmpty().withMessage("enter a description"),
    body("price").isNumeric().withMessage("enter a valid price"),
], (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {title, description, price} = req.body
    Produtos.findOne({where: {title:title}})
    .then((product) => {
        if(product == undefined){
            Produtos.create({
                title: title,
                description: description,
                price: price,
                slug: slugify(title)
            }).then(() => {
                return res.status(200).json({message: "successfully registered product"}) 
            }).catch(error => {
                return res.status(500).json({message: "error, try again later"})  
            })
        } else {
            return res.status(401).json({message: "title is already in use"}) 
        }

    })
    
})




module.exports = router