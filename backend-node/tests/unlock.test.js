const knex = require('../knexfile')
const { getTimeOfLastSuccessful } = require('../src/services/unlock.service')

describe('request testing', () => {
  beforeAll(async () => {
    await knex.migrate.latest()
    await knex.seed.run()
  })
  it('latest should be a date', async () => {
    const latest = await getTimeOfLastSuccessful()
    expect(+new Date(latest)).toBeGreaterThan(0)
  })
  afterAll(async () => {
    // you're my wonderwall
    await knex.destroy()
  })
})
