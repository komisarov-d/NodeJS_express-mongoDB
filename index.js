const express = require('express')
const mongoose = require('mongoose')
const expressHandlebars = require('express-handlebars')
const todosRoutes = require('./routes/todos')
const PORT = process.env.PORT || 3000
const app = express()
const path = require('path')

const hbs = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))

app.use(todosRoutes)
app.use(express.static(path.join(__dirname, 'public')))

const start = async () => {
    // Проверка запуска сервера
    try {
        await mongoose.connect("mongodb+srv://dmitriykomis:komisarov123@cluster0.5gmd6.azure.mongodb.net/todos", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => {
            console.log(`App has been started on port ${PORT}`)
        })
    } catch (e) {
        console.log('Server error', e)
        // process.exit()
    }
}

start()