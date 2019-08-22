import { getAlohomoraEndpoint } from './OpenDoor'

describe('OpenDoor helper', () => {
  beforeEach(() => {
    process.env.NODE_ENV = ''
    process.env.ALOHOMORA_ENDPOINT = ''
    jest.resetModules()
  })
  it('should get the endpoint set by the env ALOHOMORA_ENDPOINT if NODE_ENV is development', () => {
    process.env.NODE_ENV = 'development'
    process.env.ALOHOMORA_ENDPOINT = 'http://localhost:8080/unlock'
    const url = getAlohomoraEndpoint()
    expect(url).toEqual('http://localhost:8080/unlock')
  })
  it('should get https://staging.api.open.anton.pizza/unlock if NODE_ENV is development', () => {
    process.env.NODE_ENV = 'development'
    const url = getAlohomoraEndpoint()
    expect(url).toEqual('https://staging.api.open.anton.pizza/unlock')
  })
  it('should get https://staging.api.open.anton.pizza/unlock for the host staging.open.anton.pizza', () => {
    const host = 'staging.open.anton.pizza'
    const url = getAlohomoraEndpoint(host)
    expect(url).toEqual('https://staging.api.open.anton.pizza/unlock')
  })
  it('should get https://staging.api.open.anton.pizza/unlock for the host staging.open.anton.pizza where the nodeEnv and endpointFromEnv is set to undefined', () => {
    const host = 'staging.open.anton.pizza'
    const url = getAlohomoraEndpoint(host)
    expect(url).toEqual('https://staging.api.open.anton.pizza/unlock')
  })
  it('should get https://api.open.anton.pizza/unlock for the host open.anton.pizza', () => {
    const host = 'open.anton.pizza'
    const url = getAlohomoraEndpoint(host)
    expect(url).toEqual('https://api.open.anton.pizza/unlock')
  })
  it('should get https://api.open.anton.pizza/unlock for the host open.anton.pizza where the nodeEnv and endpointFromEnv is set to undefined', () => {
    const host = 'open.anton.pizza'
    const url = getAlohomoraEndpoint(host)
    expect(url).toEqual('https://api.open.anton.pizza/unlock')
  })
})
