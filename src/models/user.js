const mongoose = require('mongoose')
const validator = require('validator')
const validaCPF = require('../utils/cpf.js')

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    sobrenome: {
        type: String,
        required: true,
        trim: true
    },
    cpf: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(!validaCPF(value))
                throw new Error('CPF inválido')
        }
    },
    celular: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(!validator.isNumeric(value))
                throw new Error('Número de telefone só pode conter números')
            if(!validator.isMobilePhone(value,'pt-BR')) 
                throw new Error('Número de telefone é inválido')
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('Email inválido')
        }
    },
    cep: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isPostalCode(value,'BR'))
                throw new Error('CEP inválido')
        }
    },
    bairro: {
        type: String,
        required: true,
        trim: true
    },
    numero: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isNumeric(value))
                throw new Error('Número só pode conter números')
        }
    },
    rua: {
        type: String,
        required: true,
        trim: true
    },
    complemento: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: String,
        required: true,
        trim: true
    },
    cidade:{
        type: String,
        required: true,
        trim: true
    },
    produto: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Produto'
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User