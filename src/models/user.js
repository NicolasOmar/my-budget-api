const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// IMPORT STRINGS
const { missing, invalid, unableLogin } = require('../../config/strings')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, missing('Name')],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, missing('Last Name')],
      trim: true
    },
    email: {
      type: String,
      unique: true, // CANNOT BE OTHER EQUAL THAT THIS VALUE
      required: [true, missing('Email')], // CANNOT AVOID INCLUDING THIS FIELD WHEN INSERT A NEW DOCUMENT
      trim: true, // REMOVE EMPTY SPACES BEFORE AND AFTER STRING
      lowercase: true, // CHANGE ENTIRE STRING INTO LOWERCASE
      validate: value => {
        if (!validator.isEmail(value)) {
          throw new Error(invalid.email)
        }
      }
    },
    password: {
      type: String,
      required: [true, missing('Password')],
      trim: true,
      minlength: [6, invalid.password(6)]
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true // ADDED TO SET 'CREATEDAT' AND 'UPDATEDAT' FIELDS, HELPING SORTING FEATURE
  }
)

// VIRTUAL IS USED TO REALTE DOCUMENTS RELATED TO THIS USER (BUT ARE NOT RELATED BY PRIMARY/FOREIGN KEY RELATIONSHIP LIKE SQL)
userSchema.virtual(
  'transactions', // WHAT DOCUMENT CONTAINER YOU ARE MAKING REFERENCE IN THE VIRTUAL PROPERTY
  {
    ref: 'Transaction', // WHAT MODEL YOU ARE MAKING REFERENCE
    localField: '_id', // WHAT FIELD IN YOUR DOCUMENT IS USED TO MAKE THE RELATIONSHIP (LIKE A PRIMARY KEY)
    foreignField: 'user' // HOW IS CALLED YOUR LOCAL FIELD IN THE DOCUMENT WHICH YOU MADE THE RELATIONSHIP (LIKE A FOREIGN KEY)
  }
)

userSchema.statics.findByCredentials = async (email, password) => {
  const finded = await User.findOne({ email })

  if (!finded) {
    throw new Error(unableLogin)
  }

  const user = await bcrypt.compare(password, finded.password)

  if (!user) {
    throw new Error(unableLogin)
  }

  return finded
}

// ACCESIBLE TO INSTANCE
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

// ACCESIBLE TO MODEL. USED TO HASH THE PASSWORD BEFORE SAVING
userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
