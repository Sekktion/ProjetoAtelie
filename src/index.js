//Arquivo setando o express pra rodar servidores locais
const path = require('path')
const express = require('express')
const userRouter = require('./routers/user.js')
const produtoRouter = require('./routers/produto.js')
require('./db/mongoose.js')

const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, path.normalize('../public'))

//Setando path do diretorio estático publico para o servidor
app.use(express.static(publicDirectoryPath))

//Setando quais routers o express deve usar
app.use(express.json())
app.use(userRouter)
app.use(produtoRouter)

//Setando paths para todos os arquivos html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/index.html')))
})

app.get('/pedido', (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/cadastro.html')))
})

app.get('/evase', (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/evasê.html')))
})

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/home.html')))
})

app.get('/princesa', (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/princesa.html')))
})

app.get('/reta', (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/reta.html')))
})

app.get('/semi_sereia', (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/semi_sereia.html')))
})

app.get('/sereia', (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/sereia.html')))
})

app.get('/vestido', (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/vestido.html')))
})

//Iniciando o servidor
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})