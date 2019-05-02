const app = require('../app')
const supertest = require('supertest')

describe('route: thumbnail', () => {
  const server = app.listen()
  const request = supertest.agent(server)
  let authToken

  beforeAll(async () => {
    const { body: {
      token
    } } = await request.post('/auth')
      .send({
        username: 'admin',
        password: 'password'
      })
      .set('Accept', 'application/json')

    authToken = token
  })

  afterAll(() => {
    server.close();
  });

  it('should return 400 for sending a GET request with an invalid URL (not pointing to an image) as parameter', async () => {
    const response = await request
      .get('/thumbnail?image=https://www.google.com') // URL doesn't point to an actual image
      .set('Authorization', authToken)
      .set('Accept', 'application/json')

    expect(response.status).toEqual(400)
    expect(response.type).toEqual("application/json")
    expect(response.body).toEqual({
      message: 'Please provide a valid URL that is pointing to an image as a parameter'
    })
  })

  it('should return 200 along with the image for sending a GET request with a valid URL pointing to an image as parameter', async () => {
    const response = await request
      .get('/thumbnail/https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png')
      .set('Authorization', authToken)
      .set('Accept', 'image/*')

    expect(response.status).toEqual(200)
    expect(response.type).toEqual("image/*")
  })
})