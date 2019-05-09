export async function openDoor() {
  let complete = false
  let triesBeforeGiveUp = 5
  while (!complete) {
    // retry on fail
    try {
      const { success } = await (await fetch('https://openapi.anton.pizza/')).json()
      complete = true
    } catch (err) {
      if (--triesBeforeGiveUp === 0) {
        complete = true
      }
      await new Promise(res => {
        setTimeout(() => res({ success: true }), 1500)
      })
    }
  }
}
