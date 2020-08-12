const mongoose = require('mongoose')
// ERRORS
const { MESSAGES } = require('../../config/errors')

const transactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, MESSAGES.MISSING('Title')],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    amount: {
      type: Number,
      required: [true, MESSAGES.MISSING('Amount')]
    },
    date: {
      type: Date,
      required: [true, MESSAGES.MISSING('Date')],
      min: new Date('1/1/2000')
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction
