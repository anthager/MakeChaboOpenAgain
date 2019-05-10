let isRunning = false
export async function openDoor() {
  let complete = false
  let triesBeforeGiveUp = 5
  // ensure the call isn't done twice
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
      const { success } = await (await fetch(url)).json()
      return success
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
