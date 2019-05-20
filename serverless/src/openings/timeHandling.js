const getUTCFromCEST = (date, end = false) => {
  const timestamp = +new Date(date)
  if (isNaN(timestamp)) {
    throw new Error('date is not valid')
  }
  return timestamp - (end ? 7200001 : 7200000)
}

// will throw exception if it is unsuccessful
const getDates = query => {
  try {
    const startDate = query.startDate ? getUTCFromCEST(query.startDate) : +new Date(0)
    const endDate = query.endDate ? getUTCFromCEST(query.endDate, true) : +new Date() - 1
    return { startDate, endDate }
  } catch (err) {
    // console.error(err)
    throw new Error('invalid dates')
  }
}
// this does not work flawlessly
// const getStartOfDayCEST = (date = new Date()) => date.setUTCHours(22, 0, 0, 0) - 86400000
// const getEndOfDayCEST = (date = new Date()) => date.setUTCHours(22, 0, 0, 0)

module.exports = { getDates }
