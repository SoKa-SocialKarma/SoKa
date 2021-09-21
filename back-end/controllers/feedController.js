/**  ========================================================= 
*                     feedController
*    =========================================================
**/

const feed = require('express').Router({ mergeParams: true })
const {filteredNestedDuplicates} = require('../helpers/noDuplicates')

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
    const data = await filteredNestedDuplicates(allMatches)
    res.status(200).json(data)
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
