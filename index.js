const express = require('express')
const cors = require('cors')
// REQUIRE ALL 'MONGOOSE' CODE
require('./src/db/mongoose')
// IMPORT AND SET EXPRESS SERVER
const app = express()
const port = process.env.PORT
// IMPORT ROUTERS
const usersRouter = require('./src/routes/users')

// MANAGE EXPRESS SERVER USING JSON
app.use(express.json())
// ALLOW REQUEST FROM ALL SITES
app.use(cors());
// INTEGRATE ROUTERS TO THE INDEX FILE
app.use(usersRouter)

app.get('/',
  (request, response) => {
    response.send('You have been connected')
  }
)

app.listen(
  port,
  () => console.log(`Server up and working on port ${port}`)
)