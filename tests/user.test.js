const request = require('supertest')
const app = require('../src/app')
const {
  firstUser,
  setUpDatabase
} = require('./mocks/users')

beforeEach(
  async () => await setUpDatabase()
)

test(
  'Node - Sign up a new user',
  async () => {
    await request(app).post('/users').send(firstUser).expect(201)
  }
)