const bcrypt = require('bcrypt')
const validator = require('validator')

const Teste = require('./../models/teste')

const saltRounds = 11

class User {
  cadastro(req, res) {
    const senha = req.body.senha
    bcrypt.hash(senha, saltRounds).then((hash) => {
      const user = new Teste({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        cpf: req.body.cpf,
        celular: req.body.celular,
        email: req.body.email,
        cep: req.body.cep,
        senha: hash, //SENHA COM HASH
        bairro: req.body.bairro,
        numero: req.body.numero,
        rua: req.body.rua,
        complemento: req.body.complemento,
        estado: req.body.estado,
        cidade: req.body.cidade,
        // produto: req.body.produto
      })
      user.save().then(() => {
        res.status(200).redirect('/')
      }).catch((err) => {
        res.status(400)
      })
    }).catch((err) => {
      res.status(500)
    })
  }
  login(req, res) {
    const email = req.body.email
    if (!validator.isEmail(email)) return res.send('Invalid email')
    Teste.findOne({
      email: email,
    }).then((foundUser) => {
      if (!foundUser) {
        return res.status(404).send("Usuário não encontrado")
      }
      const match = bcrypt.compare(req.body.password, foundUser.senha)
      if (match) {
        console.log("entrou na conta");
        res.redirect('/')
      } else {
        console.log("Senha errada");
      }
    })
  }
}

module.exports = User