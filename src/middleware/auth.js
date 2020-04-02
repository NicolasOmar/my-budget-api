const jwt = require('jsonwebtoken')
// IMPORT MODELS
const User = require('../models/user')
// IMPORT STRINGS
const strings = require('../../config/strings')

const auth = async (request, response, next) => {
  try {
    const token = request.header('Authorization').replace('Bearer ', '')
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const finded = await User.findOne({ _id: decodedToken._id, 'tokens.token': token })

    if (!finded) {
      throw new Error()
    }

    request.token = token
    request.user = finded
    next()
  } catch (error) {
    response.status(401).send({ ...error, msg: strings.authenticate })
  }
}

module.exports = auth
