const mongoose = require('mongoose')
const validator = require('validator')
const validaCPF = require('../utils/cpf.js')

const testeSchema = new mongoose.Schema({
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
    trim: true
  },
  celular: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isNumeric(value))
        throw new Error('Número de telefone só pode conter números')
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
    validate(value) {
      if (!validator.isPostalCode(value, 'BR'))
        throw new Error('CEP inválido')
    }
  },
  senha: {
    type: String,
    required: true,
    trim: true,
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
      if (!validator.isNumeric(value))
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
    required: false,
    trim: true
  },
  estado: {
    type: String,
    required: true,
    trim: true
  },
  cidade: {
    type: String,
    required: true,
    trim: true
  },
})

const Teste = mongoose.model('Teste', testeSchema)

module.exports = Teste