const express = require('express')
const User = require('../models/user.js')
const Produto = require('../models/produto.js')
const mandarEmailPedido = require('../emails/account.js')
const router = new express.Router()

router.post('/cadastro', async (req, res) => {
    const user = new User(req.body)
    const produtoPedido = await Produto.findOne({_id: user.produto})
    if (!produtoPedido) 
        res.status(404).send()
    mandarEmailPedido(produtoPedido, user)
    try {
        await user.save()
        res.status(201).send('deu certo')
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router