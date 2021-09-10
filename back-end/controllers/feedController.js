const feed = require('express').Router({ mergeParams: true })
const {
  getAllPossibleMatches,
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
    res.status(404).send('Error')
  }
})

feed.get('/goals', async (req, res) => {
  const { id } = req.params
  try {
    const filteredGoals = await getFilteredGoals(id)
    res.status(200).json(filteredGoals)
  } catch (err) {
    res.status(404).statusMessage(err)
  }
})

feed.get('/radius', async (req, res) => {
  const { id } = req.params
  try {
    const filteredRadius = await getFilteredRadius(id)
    res.status(200).json(filteredRadius)
  } catch (err) {
    res.status(404).statusMessage(err)
  }
})

feed.get('/matches', async (req, res) => {
  const { id } = req.params
  try {
    const filteredMatches = await getFilteredMatches(id)
    res.status(200).json(filteredMatches)
  } catch (err) {
    res.status(404).statusMessage(err)
  }
})

feed.get('/availability', async (req, res) => {
  const { id } = req.params
  try {
    const filteredAvailability = await getFilteredAvailability(id)
    const data = await filteredNestedDuplicates(filteredAvailability)
    res.status(200).json(data)
  } catch (err) {
    res.status(404).statusMessage(err)
  }
})


// filteredNestedDuplicates
// [[{2},{3},{5}],[{1},{2}],[{5}]] ->>> [{1},{2},{3},{5}]

const filteredNestedDuplicates = list => {
  let data = {}
  let flat = []

  if(list.length ===1) {
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

module.exports = feed
