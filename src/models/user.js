const mongoose = require('mongoose')
const validator = require('validator')

const User = new mongoose.Schema({
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
    nascimento: {
        type: Date,
        required: true,
        validate(value) {
            if(!validator.isDate)
                throw new Error('Data inválida')
        }
    },
    cpf: {
        type: String,
        required: true,
        trim: true
    },
    celular: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(!validator.isNumeric(value))
                throw new Error('Número de telefone só pode conter números')
            if(!validator.isMobilePhone(value,'pt-BR', {strictMode: true})) 
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
    senha: {
        type: String,
        required: true,
        trim: true
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
        type: Number,
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
    }
})