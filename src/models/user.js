const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
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
    nascimento: {
        type: Date,
        required: true,
        validate(value) {
            if(!validator.isDate(value))
                throw new Error('Data inválida')
        }
    },
    cpf: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            console.log(value)
            if(!validaCPF(value))
                throw new Error('CPF inválido')
        }
    },
    celular: {
        type: String,
        required: true,
        trim: true,
        unique: true,
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
        unique: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('Email inválido')
        }
    },
    senha: {
        type: String,
        required: true,
        trim: true,
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
        type:String,
        required: true,
        trim: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.methods.gerarToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'segredo')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

//Sistema de login
userSchema.statics.buscarPorCredenciais = async (email, senha) => {
    const user = await User.findOne({email})
    if(!user)
        throw new Error ('Não foi possível efetuar login')
    const isMatch = await bcrypt.compare(senha, user.senha)
    if(!isMatch)
        throw new Error ('Não foi possível efetuar login')
    
    return user
}

//Converte a senha em uma hash para segurança
userSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('senha'))
        user.senha =  await bcrypt.hash(user.senha, 8)

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User