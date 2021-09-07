const db = require('../database/dbConfig')
const {
  getAllUsersQuery,
  updateUsersQuery
} = require('../helpers/setDbQuery.js')

const getAllUsers = async frontQuery => {
  try {
    const dbQuery = getAllUsersQuery(frontQuery)
    if (!dbQuery.qParams.length) return await db.any(dbQuery.qString)
        return await db.any(dbQuery.qString, dbQuery.qParams)
  } catch (err) {
    return 'error'
  }
}

const getUsers = async ids => {
  try {
    if (!ids.includes(','))
      return await db.one('SELECT * FROM users WHERE id=$1', ids)

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
    if (!users.length)
      return await db.one(
        'INSERT INTO users (name, lastname, email, username, pw_hsp, location, gender, image, karma, badges, interests, requests, goals) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *',
        [
          users.name,
          users.lastname,
          users.email,
          users.username,
          users.pw_hsp,
          users.location,
          users.gender,
          users.image,
          users.karma,
          users.badges,
          users.interests,
          users.requests,
          users.goals
        ]
      )

    return await db.tx(t => {
      const queries = users.map(user =>
        db.one(
          'INSERT INTO users (name, lastname, email, username, pw_hsp, location, gender, karma, image, badges, interests, requests, goals) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *',
          [
            users.name,
            users.lastname,
            users.email,
            users.username,
            users.pw_hsp,
            users.location,
            users.gender,
            users.karma,
            users.image,
            users.badges,
            users.interests,
            users.requests,
            users.goals
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
    if (!ids.includes(','))
      return await db.one(dbQuery.qString, dbQuery.qParams)

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
    if (!ids.includes(','))
      return await db.one('DELETE FROM users WHERE id=$1 RETURNING *', ids)

    return await db.any(`DELETE FROM users WHERE id IN (${ids}) RETURNING *`)
    // return await db.tx(t => {
    //     const queries = ids.split(",").map(id => db.one("DELETE FROM users WHERE id=$1 RETURNING *", id));
    //     return t.batch(queries);
    // })
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
