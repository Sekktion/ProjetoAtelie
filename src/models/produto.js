const mongoose = require('mongoose')
const validator = require('validator')

const produtoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    preco: {
        type: Number,
        required: true
    },
    cor: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    busto: {
        type: Number,
        required: true
    },
    quadril: {
        type: Number,
        required: true
    },
    cintura: {
        type: Number,
        required: true
    },
    comprimento: {
        type: Number,
        required: true
    },
    ombro: {
        type: Number,
        required: true
    },
    braco: {
        type: Number,
        required: true
    },
    manga: {
        type: Number,
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    }
})

const Produto = mongoose.model('Produto', produtoSchema)

module.exports = Produto