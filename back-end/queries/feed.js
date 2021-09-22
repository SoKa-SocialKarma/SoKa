const db = require('../database/dbConfig')

const {
  getAllPossibleMatchesQuery,
  getFilteredFriendsQuery,
  getFilteredGoalsQuery,
  getFilteredMatchesQuery,
  getFilteredRadiusQuery,
  getFilteredAvailabilityQuery
} = require('../helpers/feedQuery')

const columns = `id, name, lastname, username, location, gender, radius, 
karma, image, badges, goals->'goals' AS goals, experience->'experience' AS experience, availability->'days' AS availableDays,
matchrequests AS requests, pendingreview AS toDoReview`

const getAllPossibleMatches = async sokaQuery => {
  try {
    const usersMatchList =
      '' + Object.values(await db.one(getAllPossibleMatchesQuery(sokaQuery)))
    if (!usersMatchList) {
      return []
    }
    if (!usersMatchList.includes(',')) {
      return await db.many(
        `SELECT ${columns} FROM users WHERE id = ${usersMatchList}`,
        usersMatchList
      )
    }

    return await db.tx(t => {
      const queries = usersMatchList
        .split(',')
        .map(id => t.many(`SELECT ${columns} FROM users WHERE id = ${id}`, id))
      return t.batch(queries)
    })
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
        `SELECT ${columns} FROM users WHERE id = ${friendsList}`,
        friendsList
      )
    }

    return await db.tx(t => {
      const queries = friendsList
        .split(',')
        .map(friend =>
          t.many(`SELECT ${columns} FROM users WHERE id = ${friend}`, friend)
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
        `SELECT ${columns} FROM users WHERE jsonb_path_exists(goals, '$.goals[*] ? (@ == "${goalsList}")') AND id != ${id}`,
        goalsList
      )
    }

    return await db.tx(t => {
      const queries = goalsList
        .split(',')
        .map(goal =>
          t.many(
            `SELECT ${columns} FROM users WHERE jsonb_path_exists(goals, '$.goals[*] ? (@ == "${goal}")') AND id != ${id}`,
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
      '' + Object.values(await db.one(getFilteredMatchesQuery(id)))
    if (!matchesList) {
      return []
    }
    if (!matchesList.includes(',')) {
      return await db.one(`SELECT ${columns} FROM users WHERE id=$1`, matchesList)
    }
    return await db.tx(t => {
      const queries = matchesList
        .split(',')
        .map(id => t.one(`SELECT ${columns} FROM users WHERE id=$1`, Number(id)))
      return t.batch(queries)
    })
  } catch (err) {
    return console.error(err.message)
  }
}

const getFilteredAvailability = async id => {
  try {
    const daysList =
      '' + Object.values(await db.one(getFilteredAvailabilityQuery(id)))
    if (!daysList) {
      return []
    }
    if (!daysList.includes(',')) {
      return await db.many(
        `SELECT ${columns} FROM users WHERE jsonb_path_exists(availability, '$.days[*] ? (@ == "${daysList}")') AND id != ${id}`,
        daysList
      )
    }

    return await db.tx(t => {
      const queries = daysList
        .split(',')
        .map(day =>
          t.many(
            `SELECT ${columns} FROM users WHERE jsonb_path_exists(availability, '$.days[*] ? (@ == "${day}")') AND id != ${id}`,
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
