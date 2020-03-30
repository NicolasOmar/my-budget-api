const express = require('express')
const router = new express.Router()
// IMPORT MIDDLEWARE
const authenticator = require('../middleware/auth')
// IMPORT MODEL
const Transcation = require('../models/transaction')

router.post(
  '/transactions',
  authenticator,
  async(request, response) => {
    const newTransaction = new Transcation({
      ...request.body,
      user: request.user._id  
    })

    try {
      await newTransaction.save()
      response.status(201).send(newTransaction)
    } catch (error) {
      response.status(400).send(error)
    }
  }
)

module.exports = router