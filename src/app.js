const express = require('express')
const cors = require('cors')
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

app.get('/',
  (request, response) => {
    response.send('You have been connected')
  }
)

module.exports = app