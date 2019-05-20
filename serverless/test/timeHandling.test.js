const { getDates } = require('../src/openings/timeHandling')

describe('time', () => {
  it('should get time between 2019-05-01 and 2019-04-01', () => {
    const input = { startDate: '2019-05-01', endDate: '2019-04-01' }
    expect(getDates(input)).toEqual({ startDate: 1556661600000, endDate: 1554069599999 })
  })
  it('should get time between 2019-05-01 and 2019-04-01', () => {
    const input = { startDate: '2019-05-20T12:01:48', endDate: '2019-05-20T12:01:48' }
    expect(getDates(input)).toEqual({ startDate: 1558339308000, endDate: 1558339307999 })
  })
  it('should fail when invalid dates is sent in', () => {
    const input = { startDate: 'hej', endDate: 'då' }
    try {
      getDates(input)
    } catch (err) {
      var e = err
    }
    expect(e).toBeDefined()
  })
})
