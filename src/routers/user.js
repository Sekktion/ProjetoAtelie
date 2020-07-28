const express = require('express')
const User = require('../models/user.js')
const Produto = require('../models/produto.js')
const mandarEmailPedido = require('../emails/account.js')
const router = new express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 11

router.post('/cadastro', async (req, res) => {
    const senha = req.body.senha
    // const produtoPedido = await Produto.findOne({
    //     _id: user.produto
    // })
    // if (!produtoPedido)
    //     res.status(404).send()
    // mandarEmailPedido(produtoPedido, user)
    bcrypt.hash(senha, saltRounds).then((hash) => {
        const user = new User({
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            cpf: req.body.cpf,
            celular: req.body.celular,
            email: req.body.email,
            cep: req.body.cep,
            senha: hash, //SENHA COM HASH
            bairro: req.body.bairro,
            numero: req.body.numero,
            rua: req.body.rua,
            complemento: req.body.complemento,
            estado: req.body.estado,
            cidade: req.body.cidade,
            // produto: req.body.produto
        })
        user.save(user).then(() => {
            res.status(200).send('Deu certo')
        }).catch((err) => {
            res.send("Falha ao salvar o usuário").status(500)
        })
    }).catch((e) => {
        res.send("Falha ao encriptar a senha").status(500)
    })
})
module.exports = router