const express = require('express')
const User = require('../models/user.js')
const auth = require('../middleware/auth.js')
const router = new express.Router()

router.post('/cadastro', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.gerarToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.buscarPorCredenciais(req.body.email, req.body.senha)
        const token = await user.gerarToken()
        res.send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token === req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/minha_conta', auth, async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/minha_conta', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.status(200).send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router