const db = require('../database/dbConfig')
const {
  getAllUsersQuery,
  updateUsersQuery
} = require('../helpers/usersQuery.js')

const columns = `id, name, lastname, username, location, gender, radius, 
karma, image, badges, goals->'goals' AS goals, experience->'experience' AS experience, availability->'days' AS availableDays,
matchrequests AS requests, pendingreview AS toDoReview`

const getAllUsers = async sokaQuery => {
  try {
    const usersSearchList =
      '' + Object.values(await db.one(getAllUsersQuery(sokaQuery)))
    if (!usersSearchList) {
      return []
    }
    if (!usersSearchList.includes(',')) {
      return await db.many(
        `SELECT ${columns} FROM users WHERE id = ${usersSearchList}`,
        usersSearchList
      )
    }

    return await db.tx(t => {
      const queries = usersSearchList
        .split(',')
        .map(id => t.many(`SELECT ${columns} FROM users WHERE id = ${id}`, id))
      return t.batch(queries)
    })
  } catch (err) {
    return console.error(err.message)
  }
}

const getUsers = async ids => {
  try {
    if (!ids.includes(',')) {
      return await db.one(`SELECT ${columns} FROM users WHERE id=$1`, ids)
    }

    return await db.tx(t => {
      const queries = ids
        .split(',')
        .map(id => db.one(`SELECT ${columns} FROM users WHERE id=$1`, id))
      return t.batch(queries)
    })
  } catch (err) {
    return 'error'
  }
}

// , username, location, gender, karma, image, badges, goals,  availability, matchRequests, pendingReview)
const createUsers = async users => {
  console.log('INSIDE CREATE USERS')
  console.log(users)
  try {
    if (!users.length) {
      return await db.one(
        `INSERT INTO users \n
        (uuid, name, lastname, experience, radius)
        VALUES ($1,$2,$3,$4,$5) RETURNING *`,
        [
          users.uuid,
          users.name,
          users.lastname,
          users.experience.experience,
          users.radius
        ]
      )
    }

    return await db.tx(t => {
      const queries = users.map(user =>
        db.one(
          `INSERT INTO users \n
          (uuid, name, lastname, experience, radius)
          VALUES ($1,$2,$3,$4,$5) RETURNING *`,
          [
            users.uuid,
            users.name,
            users.lastname,
            users.experience,
            users.radius
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

const blockNewUser = async user => {
  try {
    return await db.one('INSERT INTO username_newuserblocked (uuid, blocked) VALUES ($1,$2) RETURNING *;', [ user.uuid, user.blocked ] )
  } catch (err) {
    return 'error'
  }
}

module.exports = {
  getAllUsers,
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
  blockNewUser
}
