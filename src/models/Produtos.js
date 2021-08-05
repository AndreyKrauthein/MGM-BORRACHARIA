const Sequelize = require("sequelize")
const connection = require("../database/database")

const Produtos = connection.define("produtos", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    description: {
        type: Sequelize.STRING,
        allowNull: false
    },

    price: {
        type: Sequelize.STRING,
        allowNull: false
    },

    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

Produtos.sync({force: false}).then(() => {})
module.exports = Produtos