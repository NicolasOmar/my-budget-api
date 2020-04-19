const User = require('../../src/models/user')

const userMocks = [
  {
    "name": "Virgie",
    "lastName": "Greer",
    "email": "virgie@gmail.com",
    "password": "euautelaboris"
  },
  {
    "name": "Everett",
    "lastName": "Frank",
    "email": "everett@gmail.com",
    "password": "nullamagnaculpa"
  },
  {
    "name": "Kelly",
    "lastName": "Flores",
    "email": "kelly@gmail.com",
    "password": "ealaborisexcepteur"
  },
  {
    "name": "Miranda",
    "lastName": "Valentine",
    "email": "miranda@gmail.com",
    "password": "eualiquipconsectetur"
  },
  {
    "name": "Maldonado",
    "lastName": "Chapman",
    "email": "maldonado@gmail.com",
    "password": "laboreullamcosit"
  },
  {
    "name": "Hallie",
    "lastName": "Mccarthy",
    "email": "hallie@gmail.com",
    "password": "laborisquiea"
  },
  {
    "name": "Cole",
    "lastName": "Rowland",
    "email": "cole@gmail.com",
    "password": "occaecatsitdolore"
  },
  {
    "name": "Debra",
    "lastName": "Holder",
    "email": "debra@gmail.com",
    "password": "consequatanimsint"
  },
  {
    "name": "Justice",
    "lastName": "Knapp",
    "email": "justice@gmail.com",
    "password": "quitemporaute"
  }
]

const requiredProps = ['name', 'lastName', 'email', 'password']
const requiredNames = ['Name', 'Last Name', 'Email', 'Password']

const failedMock = (user, property) => {
  const obj = { ...user }
  delete obj[property]
  return obj
}

const setUpDatabase = async () => {
  await User.deleteMany()
}

module.exports = {
  userMocks,
  requiredProps,
  requiredNames,
  failedMock,
  setUpDatabase
}