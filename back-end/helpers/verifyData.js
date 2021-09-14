/**  =========================================================================  
*                            [*]CheckFailed
*   =========================================================================
* 
*   Takes in any argument and checks if it's of the expected type.

*   @param   {Any} any - Object of any type to be verified.
*   @returns {Boolean} - Returns true if the object is valid, false if not.

*   @summary  Checks if the object is valid. 
*             True continues the verification process.
*             False calls notPass function with a message as argument, 
*             wich returns an Object with the error message.
**/

const pass = { pass: true }
const notPass = message => ({ pass: false, error: `Invalid ${message}.` })

const nameCheckFailed = name => {
  return typeof name !== 'string' || !name.trim()
}
const lastnameCheckFailed = lastname => {
  return typeof lastname !== 'string' || !lastname.trim()
}
const usernameCheckFailed = username => {
  return (
    typeof username !== 'string' || !username.trim() || username.length > 16
  )
}
const locationCheckFailed = location => {
  return typeof location !== 'string' || !location.trim()
}
const genderCheckFailed = gender => {
  return typeof gender !== 'string' || !gender.trim()
}
const radiusCheckFailed = radius => {
  return (
    typeof radius !== 'number' ||
    isNaN(radius) ||
    Number(radius) <= 0 ||
    Number(radius) > 30
  )
}
const karmaCheckFailed = karma => {
  return (
    typeof karma !== 'number' ||
    isNaN(karma) ||
    Number(karma) <= 0 ||
    Number(karma) > 5
  )
}
const imageCheckFailed = image => {
  if (image.name && image.url && image.album) {
    return (
      typeof image.name !== 'string' ||
      !image.name.trim() ||
      typeof image.url !== 'string' ||
      image.url.length < 11 ||
      (image.url.slice(0, 7) !== 'http://' &&
        image.url.slice(0, 8) !== 'https://') ||
      typeof image.url !== 'string' ||
      !image.url.trim()
    )
  }

  return true
}
const badgesCheckFailed = badges => {
  return typeof badges !== 'boolean'
}
const goalsCheckFailed = goals => {
  if (goals.goals) {
    return typeof goals.goals !== 'object'
  }
  return true
}
const experienceCheckFailed = experience => {
  if (experience.experience) {
    return typeof experience.experience !== 'object'
  }
  return true
}
const availabilityCheckFailed = availability => {
  if (availability.days) {
    return typeof availability.days !== 'object'
  }
  return true
}
const matchRequestsCheckFailed = matchRequests => {
  if (matchRequests.matchRequests && matchRequests.acceptedMatchesHistory) {
    return (
      typeof matchRequests.matchRequests !== 'object' ||
      typeof matchRequests.acceptedMatchesHistory !== 'object'
    )
  }
  return true
}
const pendingReviewCheckFailed = pendingReview => {
  if (
    pendingReview.pendingReview &&
    pendingReview.reviewing &&
    pendingReview.reviewing.id &&
    pendingReview.reviewing.username
  ) {
    return (
      typeof pendingReview.pendingReview !== 'boolean' ||
      typeof pendingReview.reviewing !== 'object' ||
      typeof pendingReview.reviewing.id !== 'number' ||
      typeof pendingReview.reviewing.username !== 'string'
    )
  }

  return true
}

/**  =========================================================================  
*                             postCheck
*    =========================================================================
 
*    Takes in a request, response and next function.

*    @param   {Object} req - An object containing the request body. 
*    @param {Function} res - A Function that sends a response.
*    @param {Function} next - A Function that calls the next middleware.
*    @returns {Function} next - An error message or a call to next middleware.
**/

const postCheck = (req, res, next) => {
  const verifyUser = ({
    name,
    lastname,
    username,
    location,
    gender,
    radius,
    karma,
    image,
    badges,
    goals,
    experience,
    availability,
    matchRequests,
    pendingReview
  }) => {
    if (nameCheckFailed(name)) return notPass(name ? 'name' : 'name not found!')
    if (lastnameCheckFailed(lastname))
      return notPass(lastname ? 'lastname' : 'lastname not found!')
    if (usernameCheckFailed(username))
      return notPass(username ? 'username' : 'username not found!')
    if (locationCheckFailed(location))
      return notPass(location ? 'location' : 'location not found!')
    if (genderCheckFailed(gender))
      return notPass(gender ? 'gender' : 'gender not found!')
    if (radiusCheckFailed(radius))
      return notPass(radius ? 'radius' : 'radius not found!')
    if (karmaCheckFailed(karma))
      return notPass(karma ? 'karma it must be a number' : 'karma not found!')
    if (imageCheckFailed(image))
      return notPass(
        image
          ? 'image link, it must begin with http:// or https://'
          : 'image not found!'
      )
    if (badgesCheckFailed(badges))
      return notPass(
        badges ? 'badges it must be type Boolean' : 'badges not found!'
      )
    if (goalsCheckFailed(goals))
      return notPass(goals ? 'goals it must be type JSON' : 'goals not found!')
    if (experienceCheckFailed(experience))
      return notPass(
        experience ? 'experience it must be type JSON' : 'experience not found!'
      )
    if (availabilityCheckFailed(availability))
      return notPass(
        availability
          ? 'availability it must be type JSON'
          : 'availability not found!'
      )
    if (matchRequestsCheckFailed(matchRequests))
      return notPass(
        matchRequests
          ? 'matchRequests it must be type JSON'
          : 'matchRequests not found!'
      )
    if (pendingreviewCheckFailed(pendingReview))
      return notPass(
        pendingReview
          ? 'pendingReview it must be type JSON'
          : 'pendingReview not found!'
      )

    return pass
  }

  if (!req.body.length) {
    const result = verifyUser(req.body)
    return result.pass ? next() : res.status(400).json({ error: result.error })
  }

  for (let i = 0; i < req.body.length; i++) {
    const result = verifyU(req.body[i])
    if (!result.pass)
      return res.status(400).json({ error: result.error, index: i })
  }

  next()
}

/**  =========================================================================  
*                             putCheck
*    =========================================================================
 
*    Takes in a request, response and next function.

*    @param   {Object} req - An object containing the request body. 
*    @param {Function} res - A Function that sends a response.
*    @param {Function} next - A Function that calls the next middleware.
*    @returns {Function} next - An error message or a call to next middleware.
**/

const putCheck = (req, res, next) => {
  const verifyUser = user => {
    const {
      name,
      lastname,
      username,
      location,
      gender,
      radius,
      karma,
      image,
      goals,
      experience,
      availability,
      matchRequests,
      pendingReview
    } = user

    const keys = Object.keys(user)
    let count = 0

    if (keys.includes('name')) {
      if (nameCheckFailed(name)) return notPass('name')
      count++
    }
    if (keys.includes('lastname')) {
      if (lastnameCheckFailed(lastname)) return notPass('lastname')
      count++
    }
    if (keys.includes('username')) {
      if (usernameCheckFailed(username)) return notPass('username')
      count++
    }
    if (keys.includes('location')) {
      if (locationCheckFailed(location)) return notPass('location')
      count++
    }
    if (keys.includes('gender')) {
      if (genderCheckFailed(gender)) return notPass('gender')
      count++
    }
    if (keys.includes('radius')) {
      if (radiusCheckFailed(radius)) return notPass('radius')
      count++
    }
    if (keys.includes('karma')) {
      if (karmaCheckFailed(karma)) return notPass('karma')
      count++
    }
    if (keys.includes('image')) {
      if (imageCheckFailed(image))
        return notPass('image link, it should begin with http:// or https://')
      count++
    }
    if (keys.includes('goals')) {
      if (goalsCheckFailed(goals)) return notPass('goals')
      count++
    }
    if (keys.includes('experience')) {
      if (experienceCheckFailed(experience)) return notPass('experience')
      count++
    }
    if (keys.includes('availability')) {
      if (availabilityCheckFailed(availability)) return notPass('availability')
      count++
    }
    if (keys.includes('matchRequests')) {
      if (matchRequestsCheckFailed(matchRequests))
        return notPass('matchRequests')
      count++
    }
    if (keys.includes('pendingReview')) {
      if (pendingReviewCheckFailed(pendingReview))
        return notPass('pendingReview')
      count++
    }
    return count > 0
      ? pass
      : notPass('Missing data, required data not found :(')
  }

  const { id } = req.params

  if (!id.includes(',') && !req.body.length) {
    const result = verifyUser(req.body)
    return result.pass ? next() : res.status(400).json({ error: result.error })
  }
  if (ids.split(',').length !== req.body.length) {
    return res
      .status(400)
      .json({ error: 'Number of ids does not match number of inputs.' })
  }
  for (let i = 0; i < req.body.length; i++) {
    const result = verifyUser(req.body[i])
    if (!result.pass)
      return res.status(400).json({ error: result.error, index: i })
  }

  next()
}

module.exports = {
  postCheck,
  putCheck
}
