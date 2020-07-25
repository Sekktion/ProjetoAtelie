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
    res.sendFile(path.join(__dirname, path.normalize('../public/home.html')))
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

//Iniciando o servidor
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})