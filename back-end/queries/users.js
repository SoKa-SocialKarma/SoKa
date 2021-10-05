const db = require('../database/dbConfig')
const {
  getAllUsersQuery,
  updateUsersQuery
} = require('../helpers/usersQuery.js')

const columns = `id, name, lastname, coordinates->'coordinates' AS coordinates, username, location, gender, radius, 
karma, image, badges, goals->'goals' AS goals, experience->'experience' AS experience, availability->'days' AS availableDays,
matchrequests AS requests, pendingreview AS toDoReview`

const getAllUsers = async sokaQuery => {

  if (sokaQuery.sokabadges){
    return await db.many(`SELECT * FROM badges;`)
  }
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

const createUsers = async users => {

  try {
    if (!users.length) {
      return await db.one(
        `INSERT INTO users \n
        (uuid, name, lastname, username, location, coordinates, gender, radius, karma, image,\n
        badges, goals, experience, availability, matchRequests, pendingReview)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING *`,
        [
          users.uuid,
          users.name,
          users.lastname,
          users.username,
          users.location,
          users.coordinates,
          users.gender,
          users.radius,
          users.karma,
          users.image,
          users.badges,
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
        (uuid, name, lastname, username, location, coordinates, gender, radius, karma, image,\n
        badges, goals, experience, availability, matchRequests, pendingReview)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING *`,
        [
          users.uuid,
          users.name,
          users.lastname,
          users.username,
          users.location,
          users.coordinates,
          users.gender,
          users.radius,
          users.karma,
          users.image,
          users.badges,
          users.goals,
          users.experience,
          users.availability,
          users.matchRequests,
          users.pendingReview
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
    return await db.one(
      'INSERT INTO username_newuserblocked (uuid, blocked) VALUES ($1,$2) RETURNING *;', 
      [ user.uuid, user.toggle ? !user.blocked : user.blocked ] )
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
