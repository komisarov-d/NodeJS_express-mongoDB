const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/default.json')
const expressHandlebars = require('express-handlebars')
const PORT = process.env.PORT || 3000
const todosRoutes = require('./routes/todos')
const app = express()
//Конфигурации для шаблонизатора
const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'  //Расширение файлов handlebars
})

app.engine('hbs', handlebars.engine) //Регистрация движка по ключу hbs
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(todosRoutes) // new middleware
const start = async () => {
    // Проверка запуска сервера
    try {
        await mongoose.connect(config.mongoUri, {
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
        process.exit()
    }
}

start()