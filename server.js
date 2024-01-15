const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const session = require('express-session')

const indexRouter = require('./routes/index')

const port = process.env.PORT || 3000

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))

app.use(
  session({
    secret: 'JSuTn1qvmGbGNBp2LcRDQvoUIe432vw/nWrlpao1ABk=',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
)

app.use((req, res, next) => {
  res.locals.url = req.originalUrl
  next()
})

app.use('/', indexRouter)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
