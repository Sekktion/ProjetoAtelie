const mongoose = require('mongoose')
const validator = require('validator')

const produtoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
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
        required: true,
        lowercase: true,
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
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('Email inválido')
        }
    },
    foto: {
        type: Buffer
    },
})

produtoSchema.virtual('pedidos', {
    ref: 'User',
    localField: '_id',
    foreignField: 'produto'
})

const Produto = mongoose.model('Produto', produtoSchema)

module.exports = Produto