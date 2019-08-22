import { getBackendEndpoint } from './OpenDoor'

describe('OpenDoor helper', () => {
  beforeEach(() => {
    process.env.NODE_ENV = ''
    process.env.BACKEND_ENDPOINT = ''
    jest.resetModules()
  })
  it('should get the endpoint set by the env BACKEND_ENDPOINT if NODE_ENV is development', () => {
    process.env.NODE_ENV = 'development'
    process.env.BACKEND_ENDPOINT = 'http://localhost:8080'
    const url = getBackendEndpoint()
    expect(url).toEqual('http://localhost:8080')
  })
  it('should get https://staging.api.open.anton.pizza if NODE_ENV is development', () => {
    process.env.NODE_ENV = 'development'
    const url = getBackendEndpoint()
    expect(url).toEqual('https://staging.api.open.anton.pizza')
  })
  it('should get https://staging.api.open.anton.pizza for the host staging.open.anton.pizza', () => {
    const host = 'staging.open.anton.pizza'
    const url = getBackendEndpoint(host)
    expect(url).toEqual('https://staging.api.open.anton.pizza')
  })
  it('should get https://staging.api.open.anton.pizza for the host staging.open.anton.pizza where the nodeEnv and endpointFromEnv is set to undefined', () => {
    const host = 'staging.open.anton.pizza'
    const url = getBackendEndpoint(host)
    expect(url).toEqual('https://staging.api.open.anton.pizza')
  })
  it('should get https://api.open.anton.pizza for the host open.anton.pizza', () => {
    const host = 'open.anton.pizza'
    const url = getBackendEndpoint(host)
    expect(url).toEqual('https://api.open.anton.pizza')
  })
  it('should get https://api.open.anton.pizza for the host open.anton.pizza where the nodeEnv and endpointFromEnv is set to undefined', () => {
    const host = 'open.anton.pizza'
    const url = getBackendEndpoint(host)
    expect(url).toEqual('https://api.open.anton.pizza')
  })
})
