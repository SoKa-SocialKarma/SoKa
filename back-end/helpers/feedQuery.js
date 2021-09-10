const getAllPossibleMatchesQuery = ({ id, radius }) => {
  if (radius) {
    return `SELECT id, username, radius FROM users WHERE id != ${id} AND radius <= ${radius};`
  }

  return `WITH RECURSIVE matches (id, username, goalsList) \n
  AS (SELECT id, username, goals->'goals' FROM users WHERE id = ${id} \n
  UNION ALL SELECT users.id, users.username, users.goals FROM users \n
  JOIN matches ON users.goals->'goals' @> matches.goalsList) \n
  SELECT DISTINCT * FROM matches WHERE id != ${id};`
}

const getFilteredGoalsQuery = id => {
  return `WITH RECURSIVE matches (id, username, goalsList) \n
    AS (SELECT id, username, goals->'goals' FROM users WHERE id = ${id} \n
    UNION ALL SELECT users.id, users.username, users.goals FROM users \n
    JOIN matches ON users.goals->'goals' @> matches.goalsList) \n
    SELECT DISTINCT * FROM matches WHERE id != ${id};`
}

const getFilteredRadiusQuery = id => {
  return `WITH RECURSIVE matches (miles, id, username, radius) \n
    AS (SELECT radius, id, username, radius FROM users WHERE id = ${id} \n
    UNION SELECT users.radius, users.id, users.username, users.radius FROM users \n
    INNER JOIN matches ON matches.miles >= users.radius) SELECT id, username, radius FROM matches WHERE id !=${id};`
}

const getFilteredMatchesQuery = id => {

    return `SELECT matchRequests->'matchRequests' as matchesList FROM users WHERE id = ${id}`

    // return `WITH RECURSIVE matches (object, id, username, list) \n
    // AS (SELECT matchRequests, id, username, CAST (matchRequests->'matchRequests' AS INTEGER) FROM users WHERE id = ${id} \n
    // UNION SELECT users.matchRequests, CAST( users.matchRequests->'matchRequests' AS INTEGER), users.username, users.id FROM users \n
    // INNER JOIN matches ON matches.list = users.id) SELECT DISTINCT * FROM matches WHERE id != ${id};`
}

// WITH RECURSIVE matches (object, id, username, list) AS (SELECT matchRequests, id, username, CAST (matchRequests->'matchRequests' AS INTEGER) FROM users WHERE id = 1 UNION SELECT users.matchRequests, CAST( users.matchRequests->'matchRequests' AS INTEGER), users.username, users.id FROM users INNER JOIN matches ON matches.list = users.id) SELECT * FROM matches;

const getFilteredAvailabilityQuery = id => {
    
    return `SELECT availability->'days' as daysList FROM users WHERE id = ${id}` 
}






module.exports = {
  getAllPossibleMatchesQuery,
  getFilteredGoalsQuery,
  getFilteredRadiusQuery,
  getFilteredMatchesQuery,
  getFilteredAvailabilityQuery
}
