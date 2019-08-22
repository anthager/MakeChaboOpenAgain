let isRunning = false
export async function openDoor() {
  let complete = false
  let triesBeforeGiveUp = 5
  // ensure the call isn't done more than once
  if (isRunning) {
    return
  }
  isRunning = true
  while (!complete) {
    // retry on fail
    const url = getAlohomoraEndpoint(window.location.host)

    try {
      return await (await fetch(url)).json()
    } catch (err) {
      if (--triesBeforeGiveUp === 0) {
        return false
      }
      await new Promise(res => {
        setTimeout(() => res(), 1500)
      })
    }
  }
}

export function getAlohomoraEndpoint(host) {
  if (process.env.NODE_ENV === 'development') {
    return process.env.ALOHOMORA_ENDPOINT || 'https://staging.api.open.anton.pizza/unlock'
  }
  return host.match(/staging/i)
    ? 'https://staging.api.open.anton.pizza/unlock'
    : 'https://api.open.anton.pizza/unlock'
}
