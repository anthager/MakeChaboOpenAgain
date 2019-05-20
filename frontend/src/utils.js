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
    const url =
      process.env.NODE_ENV === 'development'
        ? 'https://stagingopenapi.anton.pizza/'
        : 'https://openapi.anton.pizza/'
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
