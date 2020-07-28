const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/projeto-atelie", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})