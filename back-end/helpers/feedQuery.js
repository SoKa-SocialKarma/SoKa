/**  =====================================================================  
*                         getAllPossibleMatchesQuery
*    =====================================================================
* 
*    Takes in an Object with the following key/value pairs:
*
*    {id,name,lastname,username,location,gender,radius,karma,
*      badges, goal, experience, availability, sortBy, order}

*    @param   {Object} sokaQuery - An Object from req.query.  
*    @returns {String} qString - A database query for PSQL.
*    @returns {String} qString - If no argument is passed, returns a query 
*                      with random matches as data feed.
*
*    @example sokaQuery = 
*    'http://localhost:4000/users/1/feed?
*     name=Tal&lastname=Hernandez&username=T-mon&location=New&gender=Female
*     &radius=15&karma=5&badges=false'
*   
*    qString, will verify each argument of the request query, and
*    proceed to create a database query that will return the ids of users that
*    matches the search parameters.
*   
*    @summary Will return a database query for PSQL. 
*    Using INTERSECT to filter matching user's id against the next argument,
*    returning a query that eventually will return a database object
*    {ids: [1,2,3,4,5]}, the latter will run a db.tx and search for each 
*    user id with 'SELECT * FROM users WHERE id = ids[i]'
**/


const getAllPossibleMatchesQuery = ({
  id,
  name,
  lastname,
  username,
  location,
  gender,
  radius,
  karma,
  badges,
  goal,
  experience,
  availability
}) => {

  let qString = `WITH results AS (`
  let amIFirst = true

  if (goal){
    qString += `${amIFirst ? '' : 'INTERSECT '}SELECT id FROM users WHERE EXISTS (SELECT * FROM 
    jsonb_array_elements_Text(goals->'goals') as g(tag) WHERE g.tag ILIKE '%${goal}%' AND id != ${id}) `
    amIFirst = false
  }

  if (experience){
    qString += `${amIFirst ? '' : 'INTERSECT '}SELECT id FROM users WHERE EXISTS (SELECT * FROM jsonb_array_elements_Text(experience->'experience') 
    as e(tag) WHERE e.tag ILIKE '%${experience}%' AND id != ${id}) `
    amIFirst = false
  }

  if (availability) {
    qString += `${amIFirst ? '' : 'INTERSECT '}SELECT id FROM users WHERE EXISTS (SELECT * FROM jsonb_array_elements_Text(availability->'days') 
    as d(tag) WHERE d.tag ILIKE '%${availability}%' AND id != ${id}) `
    amIFirst = false
  }
    
  if (name) {
    qString += `${amIFirst ? '' : 'INTERSECT '}SELECT id FROM users WHERE id != ${id} AND name ILIKE '%${name}%'`
    amIFirst = false
  }

  if (lastname) {
    qString += `${amIFirst ? '' : 'INTERSECT '}SELECT id FROM users WHERE id != ${id} AND lastname ILIKE '%${lastname}%'`
    amIFirst = false
  }
  
  if (username) {
    qString += `${amIFirst ? '' : 'INTERSECT '}SELECT id FROM users WHERE id != ${id} AND username ILIKE '%${username}%'`
    amIFirst = false
  }

  if (location) {
    qString += `${amIFirst ? '' : 'INTERSECT '}SELECT id FROM users WHERE id != ${id} AND location ILIKE '%${location}%'`
    amIFirst = false
  }

  if (gender) {
    qString += `${amIFirst ? '' : 'INTERSECT '}SELECT id FROM users WHERE id != ${id} AND gender = '${gender}'`
    amIFirst = false
  }

  if (radius) {
    qString += `${amIFirst ? '' : 'INTERSECT '}SELECT id FROM users WHERE id != ${id} AND radius <= '${radius}'`
    amIFirst = false
  }

  if (karma) {
    qString += `${amIFirst ? '' : 'INTERSECT '}SELECT id FROM users WHERE id != ${id} AND karma <= ${karma}`
    amIFirst = false
  }

  badges = badges?.toUpperCase()
  if (badges === 'TRUE' || badges === 'FALSE') {
    qString += `${amIFirst ? '' : 'INTERSECT '}SELECT id FROM users WHERE id != ${id} AND badges = ${badges}`
    amIFirst = false
  }

qString += ` ) SELECT array_agg(id) AS ids FROM results;`

  return amIFirst ?
  `SELECT array_agg(id) AS ids FROM users WHERE id != ${id};`
  : qString
}


/**  =====================================================  
*                filtered[*]Query
*    =====================================================
 
*   Takes in an integer as id.

*   @param   {Int} id - An integer id.  
*   @returns {String} String - A query string.
**/


const getFilteredFriendsQuery = id => {
  return `SELECT friends->'friends' FROM username_friends WHERE id = ${id}`
}

const getFilteredGoalsQuery = id => {
  return `SELECT goals->'goals' FROM users WHERE id = ${id}`
}

const getFilteredRadiusQuery = id => {
  return `WITH RECURSIVE matches (miles, id, username, radius) \n
  AS (SELECT radius, id, username, radius FROM users WHERE id = ${id} \n
  UNION SELECT users.radius, users.id, users.username, users.radius FROM users \n
  INNER JOIN matches ON matches.miles >= users.radius) SELECT id, username, radius FROM matches WHERE id !=${id};`
}

const getFilteredMatchesQuery = id => {
  return `SELECT matchRequests->'matchRequests' as matchesList FROM users WHERE id = ${id}`
}

const getFilteredAvailabilityQuery = id => {
  return `SELECT availability->'days' as daysList FROM users WHERE id = ${id}`
}

module.exports = {
  getAllPossibleMatchesQuery,
  getFilteredFriendsQuery,
  getFilteredGoalsQuery,
  getFilteredMatchesQuery,
  getFilteredRadiusQuery,
  getFilteredAvailabilityQuery
}

//   Database QUERY using Recursive CTE for Goals

//   return `WITH RECURSIVE matches (id, username, goalsList) \n
//   AS (SELECT id, username, goals->'goals' FROM users WHERE id = ${id} \n
//   UNION ALL SELECT users.id, users.username, users.goals FROM users \n
//   JOIN matches ON users.goals->'goals' @> matches.goalsList) \n
//   SELECT DISTINCT * FROM matches WHERE id != ${id};`

//   Database QUERY using Recursive CTE for Match Requests

// return `WITH RECURSIVE matches (object, id, username, list) \n
// AS (SELECT matchRequests, id, username, CAST (matchRequests->'matchRequests' AS INTEGER) FROM users WHERE id = ${id} \n
// UNION SELECT users.matchRequests, CAST( users.matchRequests->'matchRequests' AS INTEGER), users.username, users.id FROM users \n
// INNER JOIN matches ON matches.list = users.id) SELECT DISTINCT * FROM matches WHERE id != ${id};`
