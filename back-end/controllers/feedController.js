const feed = require('express').Router()
const { getAllPosibleMatches } = ('../queries/feed.js')

feed.get('/', (req, res) => {
  const { userId } = req.params
  try {
    const allMatches = await getAllPosibleMatches(userId)
    res.status(200).json(allMatches)
  } catch (err) {
    res.status(404).statusMessage(err)
  }
});

feed.get('/goals', (req, res) => {
  const { userId } = req.params;
  try {
    const filteredGoals = getFilteredGoals(userId)
    res.status(200).json(filteredGoals)
  } catch (err) {
    res.status(404).statusMessage(err)
  }
});


feed.get('/radius', (req, res) => {
  const { userId } = req.params
  try {
    
  } catch (error) {
    
  }
  res.send('SHOW /user/:id/feed/radius')
});


feed.get('/friends', (req, res) => {
  res.send('SHOW /user/:id/feed/friends')
});

feed.get('/matches', (req, res) => {
  res.send('SHOW /user/:id/feed/matches')
});

feed.get('/availability', (req, res) => {
  res.send('SHOW /user/:id/feed/availability')
});

module.exports = feed