module.exports = {
  invalid: {
    email: 'The user needs a valid mail to be created',
    age: (age = 0) => `The ingresed age is below ${age} years`,
    password: (min = 6) => `Password needs to have more that ${min} characters and not include 'password' word`,
    updates: 'Invalid update data',
    fileType: 'The app only accepts image type files (jpg, jepg and png)'
  },
  unableLogin: 'Your email and/or password is incorrect. Try again with other credentials',
  authenticate: 'Please authenticate to keep using the app'
}