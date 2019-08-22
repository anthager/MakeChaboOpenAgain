const knex = require('../../db/knex')
const request = require('supertest')
const app = require('../../src/index')

describe('request testing', () => {
  beforeAll(async () => {
    await knex.migrate.latest()
    await knex.seed.run()
  })
  it('should succeed when hitting /unlock after fresh', async () => {
    const res = (await request(app)
      .get('/unlock')
      .expect(200)).res

    const resBody = JSON.parse(res.text)
    expect(resBody).toHaveProperty('success')
    expect(resBody.success).toEqual(true)
  })
  it('should fail when hitting /unlock again', async () => {
    const res = (await request(app)
      .get('/unlock')
      .expect(200)).res
    const resBody = JSON.parse(res.text)
    expect(resBody).toHaveProperty('success')
    expect(resBody).toHaveProperty('wait')
    expect(resBody.success).toEqual(false)
    expect(resBody.wait).toBeGreaterThan(0)
  })
  afterAll(async () => {
    // you're my wonderwall
    await knex.destroy()
  })
})
