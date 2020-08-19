const request = require('supertest')
const app = require('../src/app')
const mongoose = require('../src/db/mongoose')
const {
  mocks,
  requiredProps,
  requiredNames,
  failedMock,
  setUpDatabase
} = require('./mocks/users.mocks')
// ERROR CODES AND MESSAGES
const { ERROR_CODES, MESSAGES } = require('../config/errors')

const updateObj = {
  name: 'Updated Name',
  lastName: 'Updated LastName',
  email: 'test@testt.com'
}

beforeEach(async () => await setUpDatabase())

afterAll(() => mongoose.disconnect())

describe('USERS', () => {
  describe('HAPPY PATH', () => {
    test('Login a created one', async () => {
      await request(app).post('/users').send(mocks[0]).expect(201)
      const { body } =
        await request(app)
          .post('/users/login')
          .send({ email: mocks[0].email, password: mocks[0].password})
          .expect(200)

      Object.keys(mocks[0]).forEach(
        key => key !== 'password' && expect(body.userLogged[key]).toBe(mocks[0][key])
      )
    })

    test('Sign up a new one and check registred properties', async () => {
        const { body } = await request(app).post('/users').send(mocks[0]).expect(201)
        Object.keys(mocks[0]).forEach(
          key => key !== 'password' && expect(body.newUser[key]).toBe(mocks[0][key])
        )
        expect(body.token).not.toBeNull()
    })
    
    test('Update data of a created one', async () => {
        const response = await request(app).post('/users').send(mocks[0]).expect(201)
        const updated =
          await request(app)
            .patch('/users/me')
            .set('Authorization', `Bearer ${response.body.token}`)
            .send(updateObj)
            .expect(200)
        
        Object.keys(updateObj).forEach(
          prop => {
            expect(updated.body[prop]).toBe(updateObj[prop])
          }
        )
    })

    test('Delete a created one', async () => {
      const response = await request(app).post('/users').send(mocks[0]).expect(201)
      const { body } =
        await request(app)
          .delete('/users/me')
          .set('Authorization', `Bearer ${response.body.token}`)
          .send()
          .expect(200)
      
      Object.keys(body).forEach(
        key => key !== 'password' && expect(body[key]).toBe(mocks[0][key])
      )
    })

    test('Logout a created one', async () => {
      const response = await request(app).post('/users').send(mocks[0]).expect(201)

      await request(app)
          .post('/users/logout')
          .set('Authorization', `Bearer ${response.body.token}`)
          .expect(200)
    })
  })

  describe('SAD PATH', () => {
    test('Login a deleted one', async () => {
      const { body } = await request(app).post('/users').send(mocks[0]).expect(201)

      await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${body.token}`)
        .expect(200)

      const response = await request(app)
        .post('/users/login')
        .set('Authorization', `Bearer ${body.token}`)
        .expect(400)

      expect(response.body.message).toBe(MESSAGES.LOGIN)
    })

    test('Sign up a new one with certain required fields empty', async () => {
      requiredProps.forEach(
        async (prop, i) => {
          const mockFail = failedMock(mocks[0], prop)
          const response = await request(app).post('/users').send(mockFail).expect(400)
          
          expect(response.badRequest).toBeTruthy()
          expect(response.body.errors[prop].kind).toBe('required')
          expect(response.body.errors[prop].message).toBe(MESSAGES.MISSING(requiredNames[i]))
        }
      )
    })

    test('Sign up a new one with an invalid email (user validation)', async () => {
      const mockFailedEmail = { ...mocks[0], email: 'test'}
      const response = await request(app).post('/users').send(mockFailedEmail).expect(400)
      
      expect(response.badRequest).toBeTruthy()
      expect(response.body.errors.email.kind).toBe('user defined')
      expect(response.body.errors.email.message).toBe(MESSAGES.EMAIL)
    })

    test('Sign up a new one with an invalid password (minlength validation)', async () => {
      const mockFailedPass = { ...mocks[0], password: 'test'}
      const response = await request(app).post('/users').send(mockFailedPass).expect(400)
      
      expect(response.badRequest).toBeTruthy()
      expect(response.body.errors.password.kind).toBe('minlength')
      expect(response.body.errors.password.message).toBe(MESSAGES.PASSWORD(6))
    })
    
    test('Sign up twice the same user', async () => {
        await request(app).post('/users').send(mocks[0]).expect(201)
        const response = await request(app).post('/users').send(mocks[0]).expect(400)

        expect(response.badRequest).toBeTruthy()
        expect(response.body.driver).toBeTruthy()
        expect(response.body.code).toBe(ERROR_CODES.ALREADY_EXISTS)
    })

    test('Update a created user with invalid properties', async () => {
        const failedUpdate = { age: 15 }

        const response = await request(app).post('/users').send(mocks[0]).expect(201)
        const updated =
          await request(app)
            .patch('/users/me')
            .set('Authorization', `Bearer ${response.body.token}`)
            .send(failedUpdate)
            .expect(403)
        
        expect(updated.body.error).toBe(MESSAGES.UPDATES)
    })
  })
})