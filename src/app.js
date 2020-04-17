const express = require('express')
const cors = require('cors')
require('hbs')
const path = require('path')
// REQUIRE ALL 'MONGOOSE' CODE
const mongoose = require('./db/mongoose')
// IMPORT AND SET EXPRESS SERVER
const app = express()
// IMPORT ROUTERS
const usersRouter = require('./routes/users')
const transactionRouter = require('./routes/transaction')
// CONNECT TO MONGO DATABASE
app.connect(mongoose)
// MANAGE EXPRESS SERVER USING JSON
app.use(express.json())
// ALLOW REQUEST FROM ALL SITES
app.use(cors())
// INTEGRATE ROUTERS TO THE EXPRESS SERVER
app.use(usersRouter)
app.use(transactionRouter)

// SETUP PATHS
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
// SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set('view engine', 'hbs')
app.set('views', viewsPath)
// SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicPath))

app.get('/', (request, response) => {
  response.render('index', {
    repoUrl: process.env.REPOISTORY_URL,
    techDocsUrl: process.env.TECHNICAL_DOCS_URL,
    projDocsUrl: process.env.PROJECT_DOCS_URL,
    version: process.env.API_VERSION,
    environment: process.env.API_ENVIRONMENT
  })
})

module.exports = app
