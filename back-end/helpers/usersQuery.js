/**  =====================================================================  
*                            getAllUsersQuery
*    =====================================================================
* 
*    Takes in an Object with the following key/value pairs:
*
*    {id,name,lastname,username,location,gender,radius,karma,
*      badges, goal, experience, availability, sortBy, order}

*    @param   {Object} sokaQuery - An Object from req.query.  
*    @returns {String} qString - A database query for PSQL.
*    @returns {String} qString - If no argument is passed, returns a query 
*                      with all the users in the database.
*
*    @example sokaQuery = 
*    'http://localhost:4000/users?location=Glendale&name=Carlos
*     &lastname=Cardozo&username=EZ&radius=7&karma=5&goal=Cardio
*     &experience=Body'
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


const getAllUsersQuery = ({
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
    jsonb_array_elements_Text(goals->'goals') AS g(tag) WHERE g.tag ILIKE '%${goal}%') `
    amIFirst = false
  }

  if (experience){
    qString += `${amIFirst ? '' : 'INTERSECT '}SELECT id FROM users WHERE EXISTS (SELECT * FROM 
    jsonb_array_elements_Text(experience->'experience') AS e(tag) WHERE e.tag ILIKE '%${experience}%') `
    amIFirst = false
  }

  if (availability) {
    qString += `${amIFirst ? '' : 'INTERSECT '}SELECT id FROM users WHERE EXISTS (SELECT * FROM 
    jsonb_array_elements_Text(availability->'days') AS d(tag) WHERE d.tag ILIKE '%${availability}%') `
    amIFirst = false
  }
    
  if (name) {
    qString += `${amIFirst ? '' : 'INTERSECT '}SELECT id FROM users WHERE name ILIKE '%${name}%'`
    amIFirst = false
  }

  if (lastname) {
    qString += `${amIFirst ? '' : 'INTERSECT '}SELECT id FROM users WHERE lastname ILIKE '%${lastname}%'`
    amIFirst = false
  }
  
  if (username) {
    qString += `${amIFirst ? '' : 'INTERSECT '}SELECT id FROM users WHERE username ILIKE '%${username}%'`
    amIFirst = false
  }

  if (location) {
    qString += `${amIFirst ? '' : 'INTERSECT '}SELECT id FROM users WHERE location ILIKE '%${location}%'`
    amIFirst = false
  }

  if (gender) {
    qString += `${amIFirst ? '' : 'INTERSECT '}SELECT id FROM users WHERE gender = '${gender}'`
    amIFirst = false
  }

  if (radius) {
    qString += `${amIFirst ? '' : 'INTERSECT '}SELECT id FROM users WHERE radius <= '${radius}'`
    amIFirst = false
  }

  if (karma) {
    qString += `${amIFirst ? '' : 'INTERSECT '}SELECT id FROM users WHERE karma <= ${karma}`
    amIFirst = false
  }

  badges = badges?.toUpperCase()
  if (badges === 'TRUE' || badges === 'FALSE') {
    qString += `${amIFirst ? '' : 'INTERSECT '}SELECT id FROM users WHERE badges = ${badges}`
    amIFirst = false
  }

qString += ` ) SELECT array_agg(id) AS ids FROM results;`

  return amIFirst ?
  `SELECT array_agg(id) AS ids FROM users;`
  : qString
}

const updateUsersQuery = (ids, data) => {
  const constructQuery = (id, user) => {
    let qString = 'UPDATE users SET'
    const qParams = []

    const params = [
      'name',
      'lastname',
      'username',
      'location',
      'gender',
      'radius',
      'karma',
      'image',
      'goals',
      'experience',
      'availability',
      'matchRequests',
      'pendingReview'
    ]
    for (const key in user) {
      if (params.includes(key)) {
        qParams.push(user[key])
        qString += `${qParams.length > 1 ? ',' : ''} ${key}=$${qParams.length}`
      }
    }

    qParams.push(id)
    qString += ` WHERE id=$${qParams.length} RETURNING *`
    return { qString, qParams }
  }

  if (!ids.includes(',')) {
    if (data.length) {
      data = data[0]
    }
    return constructQuery(ids, data)
  }

  return ids.split(',').map((id, i) => constructQuery(id, data[i]))
}

module.exports = {
  getAllUsersQuery,
  updateUsersQuery
}
