const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// IMPORT STRINGS
const strings = require('../../config/strings')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String,
      unique: true, // CANNOT BE OTHER EQUAL THAT THIS VALUE
      required: true, // CANNOT AVOID INCLUDING THIS FIELD WHEN INSERT A NEW DOCUMENT
      trim: true, // REMOVE EMPTY SPACES BEFORE AND AFTER STRING
      lowercase: true, // CHANGE ENTIRE STRING INTO LOWERCASE
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error(strings.invalid.email)
        }
      }
    },
    age: {
      type: Number,
      validate: (value) => {
        if (value <= 18) {
          throw new Error(strings.invalid.age(18))
        }
      }
    },
    password: {
      type: String,
      trim: true,
      validate: (value) => {
        if (validator.contains(value, 'password') || value.lenght < 6) {
          throw new Error(strings.invalid.password(6))
        }
      }
    },
    tokens: [{
      token: {
        type: String,
        required: true
      }
    }],
    avatar: {
      type: Buffer
    }
  }, {
    timestamps: true // ADDED TO SET 'CREATEDAT' AND 'UPDATEDAT' FIELDS, HELPING SORTING FEATURE
  }
)

userSchema.statics.findByCredentials = async (email, password) => {
  const finded = await User.findOne({email})
  
  if (!finded) {
    throw new Error(strings.unableLogin)
  }

  const user = await bcrypt.compare(password, finded.password)

  if (!user) {
    throw new Error(strings.unableLogin)
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
userSchema.pre(
  'save',
  async function (next) {
    const user = this

    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8)
    }

    next()
  }
)

const User = mongoose.model('User', userSchema)

module.exports = User