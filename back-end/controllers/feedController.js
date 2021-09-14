/**  =====================================================  
*                 filteredNestedDuplicates
*    =====================================================
 
*   Takes in an array of arrays and flattens it into a 
*   single array of non duplicated Objects.

*   @param   {Array} list - An array of arrays.  
*   @returns {Array} data - An array of Objects.
*   [[{2},{3},{5}],[{1},{2}],[{5}]] ->>> [{1},{2},{3},{5}]
**/


const filteredNestedDuplicates = list => {
  if (list === undefined) {
    return 'No data found with the current id.!'
  }

  let data = {}
  let flat = []

  if (list.length === 1) {
    return list
  }

  list.forEach(arr => {
    flat = [...flat, ...arr]
  })
  flat.forEach(item => {
    if (!data[item.id]) {
      data[item.id] = item
    }
  })
  return Object.values(data)
}

/**  =====================================================  
*                     feedController
*    =====================================================
**/

const feed = require('express').Router({ mergeParams: true })
const {
  getAllPossibleMatches,
  getFilteredFriends,
  getFilteredGoals,
  getFilteredRadius,
  getFilteredMatches,
  getFilteredAvailability
} = require('../queries/feed.js')

feed.get('/', async (req, res) => {
  const { id } = req.params

  try {
    const sokaQuery = Object.assign({ id: id }, req.query)
    const allMatches = await getAllPossibleMatches(sokaQuery)
    res.status(200).json(allMatches)
  } catch (err) {
    res.status(404).send(err)
  }
})

feed.get('/friends', async (req, res) => {
  const { id } = req.params
  try {
    const filteredFriends = await getFilteredFriends(id)
    const data = await filteredNestedDuplicates(filteredFriends)
    res.status(200).json(data)
  } catch (err) {
    res.status(404).send(err)
  }
})

feed.get('/goals', async (req, res) => {
  const { id } = req.params
  try {
    const filteredGoals = await getFilteredGoals(id)
    const data = await filteredNestedDuplicates(filteredGoals)
    res.status(200).json(data)
  } catch (err) {
    res.status(404).send(err)
  }
})

feed.get('/radius', async (req, res) => {
  const { id } = req.params
  try {
    const filteredRadius = await getFilteredRadius(id)
    res.status(200).json(filteredRadius)
  } catch (err) {
    res.status(404).send(err)
  }
})

feed.get('/matches', async (req, res) => {
  const { id } = req.params
  try {
    const filteredMatches = await getFilteredMatches(id)
    res.status(200).json(filteredMatches)
  } catch (err) {
    res.status(404).send(err)
  }
})

feed.get('/availability', async (req, res) => {
  const { id } = req.params
  try {
    const filteredAvailability = await getFilteredAvailability(id)
    const data = await filteredNestedDuplicates(filteredAvailability)
    res.status(200).json(data)
  } catch (err) {
    res.status(404).send(err)
  }
})

module.exports = feed
