const request = require('supertest')
const app = require('../src/app')
const mongoose = require('../src/db/mongoose')
const {
  firstUser,
  setUpDatabase
} = require('./mocks/users')

beforeEach(
  async () => await setUpDatabase()
)

afterAll(() => mongoose.disconnect())

test(
  'Node - Sign up a new user',
  async () => {
    await request(app).post('/users').send(firstUser).expect(201)
  }
)