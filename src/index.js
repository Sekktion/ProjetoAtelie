//Arquivo setando o express pra rodar servidores locais
const path = require('path')
const express = require('express')
const userRouter = require('./routers/user.js')
const produtoRouter = require('./routers/produto.js')
require('./db/mongoose.js')
const bodyParser = require("body-parser")

const User = require('./controllers/userController')
const user = new User;

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
app.get('/login', async (req, res) => {
    res.sendFile(path.join(__dirname, path.normalize('../public/login.html')))
})


app.post('/cadastro', user.cadastro)

app.post('/login', user.login)
//Iniciando o servidor
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})