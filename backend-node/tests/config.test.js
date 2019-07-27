let config

describe('config', () => {
  beforeEach(() => {
    const configService = require('../src/config')
    configService.load()
    config = configService.config
  })
  it('should load config', () => {
    expect(typeof config).toEqual('object')
  })
  it('should come with the test in for the key nice', () => {
    expect(config.nice).toEqual('test')
  })
  it("should return 'nice' when the nice is overwritten from environment", () => {
    process.env.nice = 'nice'
    const configService = require('../src/config')
    configService.load()
    config = configService.config
    expect(config.nice).toEqual('nice')
  })
})
