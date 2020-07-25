const path = require('path')
const express = require('express')
const Produto = require('../models/produto.js')
const multer = require('multer')
const sharp = require('sharp')
const router = new express.Router()

//Função para upload de imagem
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/))
            return cb(new Error('Favor fazer upload de uma imagem'))
        cb(undefined,true)
    }
})

//Rotas para trabalhar com imagens
router.post('/produtos/:id/foto', upload.single('foto'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).png().toBuffer()
    const user = await Produto.findOne({_id: req.params.id})
    user.foto = buffer
    await user.save()
    res.status(200).send()
}, (err, req, res, next) => {
    res.status(400).send({error: err.message})
})

router.get('/produtos/:id/foto', async (req, res) => {
    try {
        const user = await Produto.findById(req.params.id)
        if (!user || !user.foto) {
            throw new Error()
        }

        res.set('Content-Type', 'image/jpg')
        res.send(user.foto)
    } catch (e) {
        res.status(404).send()
    }
})

router.post('/produtos', async (req, res) => {
    const produto = new Produto(req.body)
    
    try {
        await produto.save()
        res.status(201).send(produto)
    } catch (e) {
        res.status(400).send(e)
    }
})

//Rota para devolver todos os produtos
router.get('/produtos', async (req, res) => {
    try {
        const produtos = await Produto.find({})
        res.send(produtos)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Rotas para devolver vestidos especificos
router.get('/produtos/evase', async (req, res) => {
    const modelo = 'evase'
    try {
        const produtos = await Produto.find({modelo})
        res.send(produtos)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/produtos/sereia', async (req, res) => {
    const modelo = 'sereia'
    try {
        const produtos = await Produto.find({modelo})
        res.send(produtos)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/produtos/semisereia', async (req, res) => {
    const modelo = 'semisereia'
    try {
        const produtos = await Produto.find({modelo})
        res.send(produtos)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/produtos/princesa', async (req, res) => {
    const modelo = 'princesa'
    try {
        const produtos = await Produto.find({modelo})
        res.send(produtos)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/produtos/reto', async (req, res) => {
    const modelo = 'reto'
    try {
        const produtos = await Produto.find({modelo})
        res.send(produtos)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Rota para devolver UM produto em específico
router.get('/produtos/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const produto = await Produto.find({_id})
        res.send(produto)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/produto', async (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../../public/vestido.html')))
})

module.exports = router