const express = require("express")
const router = express.Router()
const slugify = require("slugify")

const Produtos = require("../models/Produtos")

router.get("/api/produtos/list", (req, res) => {
    Produtos.findAll({order: [["id", "desc"]]}).then(produtos => {
        res.json(produtos)
    })
})

router.post("/api/produtos/new", (req, res) => {
    const {title, description, price} = req.body
    Produtos.findOne({where: {title: title}}).then(produto => {
        if (produto == undefined){
            Produtos.create({
                title: title,
                description: description,
                price: price,
                slug: slugify(title)
            }).then(() => {
                res.status(200).json(produto)
            })
        } else {
            res.status(400)
        }
    })
})

module.exports = router