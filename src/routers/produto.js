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
router.post('/produto/:id/foto', upload.single('foto'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).png().toBuffer()
    const user = await Produto.findOne({_id: req.params.id})
    user.foto = buffer
    await user.save()
    res.status(200).send()
}, (err, req, res, next) => {
    res.status(400).send({error: err.message})
})

router.get('/produto/:id/foto', async (req, res) => {
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

//Rota para devolver UM produto em específico
router.get('/produto/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const produto = await Produto.findOne({_id})
        res.status(200).send(produto)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Rota para devolver vestidos especificos
router.get('/produtos/:modelo', async (req, res) => {
    const modelo = req.params.modelo
    try {
        const produtos = await Produto.find({modelo})
        res.status(200).send(produtos)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/produto', async (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../../public/vestido.html')))
})

module.exports = router