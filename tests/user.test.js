const request = require('supertest')
const bcrypt = require('bcryptjs')
const app = require('../src/app')
const mongoose = require('../src/db/mongoose')
const {
  userMocks,
  requiredProps,
  requiredNames,
  failedMock,
  setUpDatabase
} = require('./mocks/users.mocks')
const { missing, invalid } = require('../config/strings')

const updateObj = {
  name: 'Updated Name',
  lastName: 'Updated LastName',
  email: 'test@testt.com'
}

beforeEach(async () => await setUpDatabase())

afterAll(() => mongoose.disconnect())

describe('USERS', () => {
  describe('HAPPY PATH', () => {
    test('Sign up a new one and check registred properties', async () => {
        const { body } = await request(app).post('/users').send(userMocks[0]).expect(201)
        Object.keys(userMocks[0]).forEach(
          key => key !== 'password' && expect(body.newUser[key]).toBe(userMocks[0][key])
        )
        const comparePass = await bcrypt.compare(userMocks[0]['password'], body.newUser['password'])
        
        expect(comparePass).toBeTruthy()
        expect(body.token).not.toBeNull()
    })
    
    test('Update data of a created one', async () => {
        const response = await request(app).post('/users').send(userMocks[0]).expect(201)
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
      const response = await request(app).post('/users').send(userMocks[0]).expect(201)
      const { body } =
        await request(app)
          .delete('/users/me')
          .set('Authorization', `Bearer ${response.body.token}`)
          .send()
          .expect(200)
      
      Object.keys(userMocks[0]).forEach(
        key => key !== 'password' && expect(body[key]).toBe(userMocks[0][key])
      )
      const comparePass = await bcrypt.compare(userMocks[0]['password'], body['password'])
      
      expect(comparePass).toBeTruthy()
    })

    test('Login a created one', async () => {
      await request(app).post('/users').send(userMocks[0]).expect(201)
      const { body } =
        await request(app)
          .post('/users/login')
          .send({ email: userMocks[0].email, password: userMocks[0].password})
          .expect(200)

      Object.keys(userMocks[0]).forEach(
        key => key !== 'password' && expect(body.userLogged[key]).toBe(userMocks[0][key])
      )
      const comparePass = await bcrypt.compare(userMocks[0]['password'], body.userLogged['password'])

      expect(comparePass).toBeTruthy()
    })

    test('Logout a created one', async () => {
      const response = await request(app).post('/users').send(userMocks[0]).expect(201)

      await request(app)
          .post('/users/logout')
          .set('Authorization', `Bearer ${response.body.token}`)
          .expect(200)
    })
  })

  describe('SAD PATH', () => {
    test('Sign up a new one with certain required fields empty', async () => {
      requiredProps.forEach(
        async (prop, i) => {
            const mockFail = failedMock(userMocks[0], prop)
            const response = await request(app).post('/users').send(mockFail).expect(400)
            
            expect(response.badRequest).toBeTruthy()
            expect(response.body.errors[prop].kind).toBe('required')
            expect(response.body.errors[prop].message).toBe(missing(requiredNames[i]))
          }
        )
    })
    
    test('Sign up twice the same user', async () => {
        await request(app).post('/users').send(userMocks[0]).expect(201)
        const response = await request(app).post('/users').send(userMocks[0]).expect(400)

        expect(response.badRequest).toBeTruthy()
        expect(response.body.driver).toBeTruthy()
    })

    test('Update a created user with invalid properties', async () => {
        const failedUpdate = { age: 15 }

        const response = await request(app).post('/users').send(userMocks[0]).expect(201)
        const updated =
          await request(app)
            .patch('/users/me')
            .set('Authorization', `Bearer ${response.body.token}`)
            .send(failedUpdate)
            .expect(402)
        
        expect(updated.body.error).toBe(invalid.updates)
    })

    test('Login a deled one', async () => {
      const { body } = await request(app).post('/users').send(userMocks[0]).expect(201)
      await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${body.token}`)
        .expect(200)
      await request(app)
        .post('/users/login')
        .set('Authorization', `Bearer ${body.token}`)
        .expect(400)
    })
  })
})