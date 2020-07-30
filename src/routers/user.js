const express = require('express')
const User = require('../models/user.js')
const Produto = require('../models/produto.js')
const mandarEmailPedido = require('../emails/account.js')
const router = new express.Router()
const bodyParser = require("body-parser")
const bcrypt = require('bcrypt')
const saltRounds = 11
const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static('public'))
module.exports = router