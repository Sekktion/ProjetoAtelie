const express = require('express')
const Produto = require('../models/produto.js')
const router = new express.Router()

router.post('/produtos', async (req, res) => {
    const produto = new Produto(req.body)
    
    try {
        await produto.save()
        res.status(201).send(produto)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/produtos', async (req, res) => {
    try {
        const produtos = await Produto.find({})
        res.send(produtos)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/produtos/:id', async (req, res) => {
    try{
        const produto = await Produto.findByIdAndDelete(req.params.id)
        if(!produto)
            res.status(404).send()
        res.status(200).send(produto)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router