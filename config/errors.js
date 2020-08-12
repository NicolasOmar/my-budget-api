const ERROR_CODES = {
  ALREADY_EXISTS: 11000
}

const MESSAGES = {
  EMAIL: 'The user needs a valid mail format (@site.com) to be created',
  PASSWORD: (min = 6) => `Password needs to have more that ${min} characters`,
  AMOUNT: 'The amount of the transaction should be composed by numbers only',
  DATE: 'The date of the transaction should be in a valid format (DD/MM/YYYY)',
  UPDATES: 'Invalid update data',
  LOGIN: 'Your email and/or password is incorrect. Try again with other credentials',
  AUTHENTICATE: 'Please authenticate to keep using the app',
  MISSING: value => `The user needs a valid ${value} to be created`
}

module.exports = {
  ERROR_CODES,
  MESSAGES
}