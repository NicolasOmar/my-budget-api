const mongoose = require('mongoose')
const validator = require('validator')
// IMPORT STRINGS
const { missing, invalid } = require('../../config/strings')

const transactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, missing('Title')],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    amount: {
      type: Number,
      required: [true, missing('Amount')],
      validate: value => {
        if (!validator.isNumeric(value)) {
          throw new Error(invalid.amount)
        }
      }
    },
    date: {
      type: Date,
      required: [true, missing('Date')],
      min: new Date('1/1/2000'),
      validate: value => {
        if (!validator.isDate(value)) {
          throw new Error(invalid.date)
        }
      }
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
