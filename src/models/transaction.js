const mongoose = require('mongoose')
// IMPORT STRINGS
const { missing } = require('../../config/strings')

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
      required: [true, missing('Amount')]
    },
    date: {
      type: Date,
      required: [true, missing('Date')],
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
