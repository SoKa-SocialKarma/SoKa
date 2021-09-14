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
*    'http://localhost:4000/users/1/feed/friends?
*     name=Tal&lastname=Hernandez&username=T-mon&location=New&gender=Female
*     &radius=15&karma=5&badges=false'
*   
*    qString, will verify each argument of the request query, and
*    proceed to create a database query that will return the desired search.
*   
*    @summary Will return a database query for PSQL. 
*    Limited to 1 goal or 1 experience or 1 availability, at a time.
*    Able to sort by argument in ascendent or descendent order with
*    the sortBy & order parameters.
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
  availability,
  sortBy,
  order
}) => {
  let qString = ''

  if (goal) {
    qString = `SELECT * FROM users WHERE EXISTS (SELECT * FROM \n
    jsonb_array_elements_Text(goals->'goals') as g(tag) WHERE g.tag ILIKE '%${goal}%') AND id != ${id} `
  } else if (experience) {
    qString = `SELECT * FROM users WHERE EXISTS (SELECT * FROM \n
    jsonb_array_elements_Text(experience->'experience') as e(tag) WHERE e.tag ILIKE '%${experience}%') AND id != ${id} `
  } else if (availability) {
    qString = `SELECT * FROM users WHERE EXISTS (SELECT * FROM \n
    jsonb_array_elements_Text(availability->'days') as d(tag) WHERE d.tag ILIKE '%${availability}%') AND id != ${id} `
  } else {
    qString = `SELECT * FROM users WHERE id != ${id} `
  }

  if (name) {
    qString += `AND name ILIKE '%${name}%'`
  }
  if (lastname) {
    qString += `AND lastname ILIKE '%${lastname}%'`
  }
  if (username) {
    qString += `AND username ILIKE '%${username}%'`
  }
  if (location) {
    qString += `AND location ILIKE '%${location}%'`
  }
  if (gender) {
    qString += `AND gender = '${gender}'`
  }
  if (radius) {
    qString += `AND radius <= '${radius}'`
  }
  if (karma) {
    qParams.push(`${karma}`)
    qString += `AND karma <= ${karma}`
  }

  badges = badges?.toUpperCase()
  if (badges === 'TRUE' || badges === 'FALSE') {
    qString += `AND badges = ${badges}`
  }

  const columns = [
    'id',
    'name',
    'lastname',
    'username',
    'location',
    'gender',
    'radius',
    'karma'
  ]
  sortBy = sortBy?.toLowerCase()
  order = order?.toUpperCase()
  if (columns.includes(sortBy)) {
    qString += ` ORDER BY ${sortBy} ${
      order === 'ASC' || order === 'DESC' ? order : 'ASC'
    }`
  }

  return qString !== `SELECT * FROM users WHERE id != ${id} `
    ? qString
    : `SELECT * FROM users WHERE id = ${id}`
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
