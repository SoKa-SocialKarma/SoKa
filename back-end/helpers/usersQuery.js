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
*    proceed to create a database query that will return the desired search.
*   
*    @summary Will return a database query for PSQL. 
*    Limited to 1 goal or 1 experience or 1 availability, at a time.
*    Able to sort by argument in ascendent or descendent order with
*    the sortBy & order parameters.
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
  availability,
  sortBy,
  order,
  limit
}) => {
  let qString = ''

  if (goal) {
    qString = `SELECT * FROM users WHERE EXISTS (SELECT * FROM \n
    jsonb_array_elements_Text(goals->'goals') as g(tag) WHERE g.tag ILIKE '%${goal}%') `
  } else if (experience) {
    qString = `SELECT * FROM users WHERE EXISTS (SELECT * FROM \n
    jsonb_array_elements_Text(experience->'experience') as e(tag) WHERE e.tag ILIKE '%${experience}%') `
  } else if (availability) {
    qString = `SELECT * FROM users WHERE EXISTS (SELECT * FROM \n
    jsonb_array_elements_Text(availability->'days') as d(tag) WHERE d.tag ILIKE '%${availability}%') `
  } else {
    qString = `SELECT * FROM users `
  }

  if (name) {
    qString += ` WHERE name ILIKE '%${name}%'`
  }
  if (lastname) {
    qString += `${
      qString.includes('WHERE') ? ' AND' : ' WHERE'
    } lastname ILIKE '%${lastname}%'`
  }
  if (username) {
    qString += `${
      qString.includes('WHERE') ? ' AND' : ' WHERE'
    } username ILIKE '%${username}%'`
  }
  if (location) {
    qString += `${
      qString.includes('WHERE') ? ' AND' : ' WHERE'
    } location ILIKE '%${location}%'`
  }
  if (gender) {
    qString += `${
      qString.includes('WHERE') ? ' AND' : ' WHERE'
    } gender = '${gender}'`
  }
  if (radius) {
    qString += `${
      qString.includes('WHERE') ? ' AND' : ' WHERE'
    } radius <= '${radius}'`
  }
  if (karma) {
    qString += `${
      qString.includes('WHERE') ? ' AND' : ' WHERE'
    } karma <= ${karma}`
  }
  if (limit){
    qString += `${
      qString.includes('WHERE') ? ' AND' : ''
    } LIMIT ${limit}`
  }

  badges = badges?.toUpperCase()
  if (badges === 'TRUE' || badges === 'FALSE') {
    qString += `${
      qString.includes('WHERE') ? ' AND' : ' WHERE'
    } badges=${badges}`
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

  return qString
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
