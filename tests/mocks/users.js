const User = require('../../src/models/user')

const firstUser = {
  name: 'First User',
  email:'first@gmail.com',
  password: 'dsagrtyh'
}

const setUpDatabase = async () => {
  await User.deleteMany()
}

module.exports = {
  firstUser,
  setUpDatabase
}