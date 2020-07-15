//Arquivo setando o express pra rodar servidores locais
const path = require('path')
const express = require('express')
const request = require('postman-request')


const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, path.normalize('../public'))

//Setando path do diretorio estático publico para o servidor
app.use(express.static(publicDirectoryPath))

//Setando quais routers o express deve usar
app.use(express.json())

//Setando paths para todos os arquivos html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/index.html')))
})

app.get('/att_info', (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/att_info.html')))
})

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/cadastro.html')))
})

app.get('/carrinho', (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/carrinho.html')))
})

app.get('/evase', (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/evasê.html')))
})

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/home.html')))
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/login.html')))
})

app.get('/medidas', (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/medidas.html')))
})

app.get('/minha_conta', (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/minha_conta.html')))
})

app.get('/princesa', (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/princesa.html')))
})

app.get('/rastreio', (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/rastreio.html')))
})

app.get('/rec_senha', (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/rec_senha.html')))
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