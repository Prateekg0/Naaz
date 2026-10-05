require('dotenv').config()

const express = require('express')
const path = require('path');
const { json } = require('stream/consumers');
const ejs = require('ejs')
const db = require('./config/mongooseConnection')
var cookieParser = require('cookie-parser')
const ownersRouter = require('./routes/ownersRouter')
const productsRouter = require('./routes/productRouter')
const usersRouter = require('./routes/usersRouter')
const indexRouter = require('./routes/indexRouter')
const expressSession = require('express-session')
const flash = require('connect-flash')


const app = express();


app.use(expressSession({
    resave: false,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET
}))
app.set('view engine ', 'ejs')
app.set("views", "./views");
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(flash() )


app.use('/',indexRouter)
app.use('/owners', ownersRouter)
app.use('/users', usersRouter)
app.use('/products', productsRouter)

app.get('/', (req, res) => {
    res.send('login page')
})



const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
