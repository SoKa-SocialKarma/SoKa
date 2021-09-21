const db = require('../database/dbConfig')
const {
  getAllUsersQuery,
  updateUsersQuery
} = require('../helpers/usersQuery.js')

const getAllUsers = async sokaQuery => {
  try {
    const usersSearchList =
      '' + Object.values(await db.one(getAllUsersQuery(sokaQuery)))
    if (!usersSearchList) {
      return []
    }
    if (!usersSearchList.includes(',')) {
      return await db.many(
        `SELECT * FROM users WHERE id = ${usersSearchList}`,
        usersSearchList
      )
    }

    return await db.tx(t => {
      const queries = usersSearchList
        .split(',')
        .map(id => t.many(`SELECT * FROM users WHERE id = ${id}`, id))
      return t.batch(queries)
    })
  } catch (err) {
    return console.error(err.message)
  }
}

const getUsers = async ids => {
  try {
    if (!ids.includes(',')) {
      return await db.one('SELECT * FROM users WHERE id=$1', ids)
    }

    return await db.tx(t => {
      const queries = ids
        .split(',')
        .map(id => db.one('SELECT * FROM users WHERE id=$1', id))
      return t.batch(queries)
    })
  } catch (err) {
    return 'error'
  }
}

const createUsers = async users => {
  try {
    if (!users.length) {
      return await db.one(
        `INSERT INTO users \n
        (name, lastname, username, location, gender, karma, badges, image, goals, experience, availability, matchRequests, pendingReview) \n
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
        [
          users.name,
          users.lastname,
          users.username,
          users.location,
          users.gender,
          users.karma,
          users.badges,
          users.image,
          users.goals,
          users.experience,
          users.availability,
          users.matchRequests,
          users.pendingReview
        ]
      )
    }

    return await db.tx(t => {
      const queries = users.map(user =>
        db.one(
          `INSERT INTO users \n
          (name, lastname, username, location, gender, karma, badges, image, goals, experience, availability, matchRequests, pendingReview) \n
          VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
          [
            user.name,
            user.lastname,
            user.username,
            user.location,
            user.gender,
            user.karma,
            user.badges,
            user.image,
            user.goals,
            user.experience,
            user.availability,
            user.matchRequests,
            user.pendingReview
          ]
        )
      )
      return t.batch(queries)
    })
  } catch (err) {
    return 'error'
  }
}

const updateUsers = async (ids, users) => {
  try {
    const dbQuery = updateUsersQuery(ids, users)
    if (!ids.includes(',')) {
      return await db.one(dbQuery.qString, dbQuery.qParams)
    }

    return await db.tx(t => {
      const queries = dbQuery.map(q => db.one(q.qString, q.qParams))
      return t.batch(queries)
    })
  } catch (err) {
    return 'error'
  }
}

const deleteUsers = async ids => {
  try {
    if (!ids.includes(',')) {
      return await db.one('DELETE FROM users WHERE id=$1 RETURNING *;', ids)
    }
    return await db.any(`DELETE FROM users WHERE id IN (${ids}) RETURNING *;`)
  } catch (err) {
    return 'error'
  }
}

module.exports = {
  getAllUsers,
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers
}
