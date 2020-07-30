//Arquivo setando o express pra rodar servidores locais
const path = require('path')
const express = require('express')
const userRouter = require('./routers/user.js')
const produtoRouter = require('./routers/produto.js')
require('./db/mongoose.js')
const bodyParser = require("body-parser")
const bcrypt = require('bcrypt')
const User = require('./models/user')
const saltRounds = 11

const app = express()
const port = 3000
const publicDirectoryPath = path.join(__dirname, path.normalize('../public'))

//Setando path do diretorio estático publico para o servidor
app.use(express.static(publicDirectoryPath))

//Setando quais routers o express deve usar
app.use(express.json())
app.use(userRouter)
app.use(produtoRouter)
app.use(bodyParser.urlencoded({
    extended: true
}))

//Setando paths para todos os arquivos html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/home.html')))
})

app.get('/local', (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/local.html')))
})

app.get('/pedido', (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/info.html')))
})

app.get('/anunciar', (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/upload_info.html')))
})

//Rota para ver vestidos específicos
app.get('/vestidos', async (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/vestidos.html')))
})
app.get('/cadastro', async (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/cadastro.html')))
})
app.post('/teste', (req, res) => {
    console.log("chegou em teste");
    console.log(req.body.username, req.body.password);
})


app.post('/cadastro', (req, res) => {
    console.log("chegou no cadastro");
    const senha = req.body.senha

    console.log(senha);
    bcrypt.hash(senha, saltRounds).then((hash) => {
        const user = new User({
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
        user.save(user).then(() => {
            res.status(200).send('Deu certo')
        }).catch((err) => {
            res.send("Falha ao salvar o usuário").status(500)
        })
    }).catch((e) => {
        res.send("Falha ao encriptar a senha").status(500)
    })

    res.redirect('/')
})
//Iniciando o servidor
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})