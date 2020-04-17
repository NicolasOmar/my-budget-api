const missing = value => `The user needs a valid ${value} to be created`

const invalid = {
  email: 'The user needs a valid mail format (@site.com) to be created',
  password: (min = 6) => `Password needs to have more that ${min} characters`,
  amount: 'The amount of the transaction should be composed by numbers only',
  date: 'The date of the transaction should be in a valid format (DD/MM/YYYY)',
  updates: 'Invalid update data',
}

module.exports = {
  missing,
  invalid,  
  unableLogin: 'Your email and/or password is incorrect. Try again with other credentials',
  authenticate: 'Please authenticate to keep using the app',
}