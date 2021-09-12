const db = require('../database/dbConfig')

const {
  getAllPossibleMatchesQuery,
  getFilteredFriendsQuery,
  getFilteredGoalsQuery,
  getFilteredMatchesQuery,
  getFilteredRadiusQuery,
  getFilteredAvailabilityQuery
} = require('../helpers/feedQuery')

const getAllPossibleMatches = async sokaQuery => {
  try {
    return await db.any(getAllPossibleMatchesQuery(sokaQuery))
  } catch (err) {
    return console.error(err.message)
  }
}

const getFilteredFriends = async id => {
  try {
    const friendsList =
      '' + Object.values(await db.one(getFilteredFriendsQuery(id)))
    if (!friendsList) {
      return []
    }
    if (!friendsList.includes(',')) {
      return await db.many(
        `SELECT * FROM users WHERE id = ${friendsList}`,
        friendsList
      )
    }

    return await db.tx(t => {
      const queries = friendsList
        .split(',')
        .map(friend =>
          t.many(`SELECT * FROM users WHERE id = ${friend}`, friend)
        )
      return t.batch(queries)
    })
  } catch (err) {
    return console.error(err.message)
  }
}

const getFilteredGoals = async id => {
  try {
    const goalsList =
      '' + Object.values(await db.one(getFilteredGoalsQuery(id)))
    if (!goalsList) {
      return []
    }
    if (!goalsList.includes(',')) {
      return await db.many(
        `SELECT id, username, goals FROM users WHERE jsonb_path_exists(goals, '$.goals[*] ? (@ == "${goalsList}")') AND id != ${id}`,
        goalsList
      )
    }

    return await db.tx(t => {
      const queries = goalsList
        .split(',')
        .map(goal =>
          t.many(
            `SELECT id, username, goals FROM users WHERE jsonb_path_exists(goals, '$.goals[*] ? (@ == "${goal}")') AND id != ${id}`,
            goal
          )
        )
      return t.batch(queries)
    })
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
      '' + Object.values(await db.any(getFilteredMatchesQuery(id)))
    if (!matchesList) {
      return []
    }
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
    const daysList =
      '' + Object.values(await db.any(getFilteredAvailabilityQuery(id)))
    if (!daysList) {
      return []
    }
    if (!daysList.includes(',')) {
      return await db.many(
        `SELECT id, username, availability FROM users WHERE jsonb_path_exists(availability, '$.days[*] ? (@ == "${daysList}")') AND id != ${id}`,
        daysList
      )
    }

    return await db.tx(t => {
      const queries = daysList
        .split(',')
        .map(day =>
          t.many(
            `SELECT id, username, availability FROM users WHERE jsonb_path_exists(availability, '$.days[*] ? (@ == "${day}")') AND id != ${id}`,
            day
          )
        )
      return t.batch(queries)
    })
  } catch (err) {
    return console.error(err.message)
  }
}

module.exports = {
  getAllPossibleMatches,
  getFilteredFriends,
  getFilteredGoals,
  getFilteredMatches,
  getFilteredRadius,
  getFilteredAvailability
}
