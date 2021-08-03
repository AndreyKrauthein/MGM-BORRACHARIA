const Sequelize = require("sequelize")

const connection = new Sequelize('heroku_989dff5fcd4f94a', 'bbbbcdbc9c7433', '36077584', {
    host: 'us-cdbr-east-04.cleardb.com',
    dialect: 'mysql',
})

module.exports = connection