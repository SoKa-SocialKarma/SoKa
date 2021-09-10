const db = require('../database/dbConfig')

const {
  getAllPossibleMatchesQuery,
  getFilteredGoalsQuery,
  getFilteredRadiusQuery,
  getFilteredMatchesQuery,
  getFilteredAvailabilityQuery
} = require('../helpers/feedQuery')

const getAllPossibleMatches = async sokaQuery => {
  try {
    return await db.any(getAllPossibleMatchesQuery(sokaQuery))
  } catch (err) {
    return console.error(err.message)
  }
}

const getFilteredGoals = async id => {
  try {
    return await db.any(getFilteredGoalsQuery(id))
  } catch (err) {
    return console.error(err.message)
  }
}

const getFilteredRadius = async id => {
  try {
    return await db.any(getFilteredRadiusQuery(id))
  } catch (err) {
    return console.error(err.message)
  }
}

const getFilteredMatches = async id => {
  try {
    const matchesList =
      '' + Object.values(await db.one(getFilteredMatchesQuery(id)))
    if (!matchesList.includes(',')) {
      return await db.one('SELECT * FROM users WHERE id=$1', matchesList)
    }
    return await db.tx(t => {
      const queries = matchesList
        .split(',')
        .map(id => t.one('SELECT * FROM users WHERE id=$1', id))
      return t.batch(queries)
    })
  } catch (err) {
    return console.error(err.message)
  }
}

const getFilteredAvailability = async id => {
  try {

    const daysList ='' + Object.values(await db.one(getFilteredAvailabilityQuery(id)))
  console.log(daysList)
    if (!daysList.includes(',')) {
      return await db.many(`SELECT id, username, availability FROM users WHERE jsonb_path_exists(availability, '$.days[*] ? (@ == "${daysList}")') AND id != ${id}`, daysList)
    }

    return await db.tx(t => {
      const queries = daysList
        .split(',')
        .map(day =>  t.many(`SELECT id, username, availability FROM users WHERE jsonb_path_exists(availability, '$.days[*] ? (@ == "${day}")') AND id != ${id}`, day))
      return t.batch(queries)
    })

  } catch (err) {
    return console.error(err.message)
  }
}

module.exports = {
  getAllPossibleMatches,
  getFilteredGoals,
  getFilteredRadius,
  getFilteredMatches,
  getFilteredAvailability
}
