const express = require('express')
const chalk = require('chalk')
// REQUIRE ALL 'MONGOOSE' CODE
require('./db/mongoose')
// IMPORT AND SET EXPRESS SERVER
const app = express()
const port = process.env.PORT
// IMPORT ROUTERS
const usersRouter = require('./routes/users')

// MANAGE EXPRESS SERVER USING JSON
app.use(express.json())
// INTEGRATE ROUTERS TO THE INDEX FILE
app.use(usersRouter)

app.listen(
  port,
  () => chalk ?
    console.log(chalk.white.bold.bgGreen(`Server up and working on port ${port}`)) :
    console.log(`Server up and working on port ${port}`)
)