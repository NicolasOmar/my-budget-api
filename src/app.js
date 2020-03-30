const express = require('express')
const cors = require('cors')
const hbs = require('hbs')
const path = require('path')
// REQUIRE ALL 'MONGOOSE' CODE
require('./db/mongoose')
// IMPORT AND SET EXPRESS SERVER
const app = express()
// IMPORT ROUTERS
const usersRouter = require('./routes/users')
const transactionRouter = require('./routes/transaction')

// MANAGE EXPRESS SERVER USING JSON
app.use(express.json())
// ALLOW REQUEST FROM ALL SITES
app.use(cors());
// INTEGRATE ROUTERS TO THE EXPRESS SERVER
app.use(usersRouter)
app.use(transactionRouter)

// SETUP PATH
const viewsPath = path.join(__dirname, '../templates/views')
// SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.get('/',
  (request, response) => {
    response.render('index')
  }
)

module.exports = app