const multer = require('multer')
const express = require('express')
const router = new express.Router()
// IMPORT MIDDLEWARE
const authenticator = require('../middleware/auth')
// IMPORT MODEL
const User = require('../models/user')
// IMPORT STRINGS
const strings = require('../../config/strings')

const upload = multer({
  limits: 1000000,
  fileFilter(request, file, callback) {
    if (!file.originalname.endsWith('.jpg')) {
      return callback(new Error(strings.invalid.fileType))
    }

    callback(undefined, true)
  }
})

// FIND YOUR USER DATA
router.get('/users/me', authenticator, async (request, response) => {
  try {
    response.send(request.user)
  } catch (error) {
    response.status(400).send(error)
  }
})

// INSERT A NEW USER
router.post('/users', async (request, response) => {
  const newUser = new User(request.body)

  try {
    await newUser.save()
    const token = await newUser.generateAuthToken()
    response.status(201).send({ newUser, token })
  } catch (error) {
    response.status(400).send(error)
  }
})

// UPDATE YOUR USER DATA
router.patch('/users/me', authenticator, async (request, response) => {
  const updates = Object.keys(request.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']

  const isValidOperation = Object.keys(request.body).every(update =>
    allowedUpdates.includes(update)
  )

  !isValidOperation && response.status(400).send({ error: strings.invalid.updates })

  try {
    updates.forEach(update => (request.user[update] = request.body[update]))
    await request.user.save()

    !request.user && response.status(404).send()
    response.send(request.user)
  } catch (error) {
    response.status(400).send(error)
  }
})

// DELETE YOUR USER
router.delete('/users/me', authenticator, async (request, response) => {
  try {
    await request.user.remove()
    response.send(request.user)
  } catch (error) {
    response.status(400).send(error)
  }
})

// LOGIN AN USER
router.post('/users/login', async (request, response) => {
  try {
    const { email, password } = request.body
    const userLogged = await User.findByCredentials(email, password)
    const token = await userLogged.generateAuthToken()
    response.send({ userLogged, token })
  } catch (error) {
    response.status(400).send(error)
  }
})

// LOGOUT YOUR USER FROM ONE DEVICE USING ITS TOKEN
router.post(
  '/users/logout',
  authenticator,
  async (request, response) => {
    try {
      request.user.tokens = request.user.tokens.filter(token => token.token !== request.token)
      await request.user.save()
      response.send()
    } catch (error) {
      response.status(500).send(error)
    }
  },
  (error, request, response) => {
    // IN CASE OF A MIDDLEWARE ERROR, THE ROUTER USES A SECOND ARGUMENT TO HANDLE SUCH ERRORS (LIKE A THEN <> CATCH STRUCTURE)
    response.status(400).send({ error: error.message })
  }
)

// LOGOUT YOUR USER FROM ALL CONNECTED DEVICES
router.post('/users/logoutAll', authenticator, async (request, response) => {
  try {
    request.user.tokens = []
    await request.user.save()
    response.send()
  } catch (error) {
    response.status(500).send()
  }
})

// ADD AN AVATAR IMAGE TO THE AUTHENTICATED USER
router.post(
  '/users/me/avatar',
  authenticator,
  upload.single('avatar'),
  async (request, response) => {
    request.user.avatar = request.file.buffer
    await request.user.save()
    response.send()
  },
  (error, request, response) => {
    // IN CASE OF A MIDDLEWARE ERROR, THE ROUTER USES A SECOND ARGUMENT TO HANDLE SUCH ERRORS (LIKE A THEN <> CATCH STRUCTURE)
    response.status(400).send({ error: error.message })
  }
)

// REMOVE THE AVATAR IMAGE OF THE AUTHENTICATED USER
router.delete('/users/me/avatar', authenticator, async (request, response) => {
  request.user.avatar = undefined
  await request.user.save()
  response.send()
})

module.exports = router
