const express = require('express')
const router = new express.Router()
// MIDDLEWARE
const authenticator = require('../middleware/auth')
// MODEL
const User = require('../models/user')
// ERROR CODES AND MESSAGES
const { MESSAGES } = require('../../config/errors')
// ROUTES
const { USERS_ROUTES } = require('../../config/routes')

// INSERT A NEW USER
router.post(USERS_ROUTES.main, async (request, response) => {
  const newUser = new User(request.body)

  try {
    await newUser.save()
    const token = await newUser.generateAuthToken()
    response.status(201).send({ newUser, token })
  } catch (error) {
    response.status(400).send(error)
  }
})

// FIND YOUR USER DATA
router.get(USERS_ROUTES.me, authenticator, async (request, response) => {
  try {
    response.send(request.user)
  } catch (error) {
    response.status(400).send(error)
  }
})

// UPDATE YOUR USER DATA
router.patch(USERS_ROUTES.me, authenticator, async (request, response) => {
  const updates = Object.keys(request.body)
  const allowedUpdates = ['name', 'lastName', 'email', 'password']

  const isValidOperation = Object.keys(request.body).every(update =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation) {
    response.status(403).send({ error: MESSAGES.UPDATES })
  }

  try {
    updates.forEach(update => (request.user[update] = request.body[update]))
    await request.user.save()

    !request.user && response.status(404).send()
    response.send(request.user)
  } catch (error) {
    response.status(400).send()
  }
})

// DELETE YOUR USER
router.delete(USERS_ROUTES.me, authenticator, async (request, response) => {
  try {
    await request.user.remove()
    response.send(request.user)
  } catch (error) {
    response.status(400).send(error)
  }
})

// LOGIN AN USER
router.post(USERS_ROUTES.login, async (request, response) => {
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
  USERS_ROUTES.logout,
  authenticator,
  async (request, response) => {
    try {
      request.user.tokens = request.user.tokens.filter(token => token.token !== request.token)
      await request.user.save()
      response.send(true)
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
router.post(USERS_ROUTES.logoutAll, authenticator, async (request, response) => {
  try {
    request.user.tokens = []
    await request.user.save()
    response.send(true)
  } catch (error) {
    response.status(500).send()
  }
})

module.exports = router
