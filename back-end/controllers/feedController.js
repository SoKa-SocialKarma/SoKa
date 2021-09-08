const feed = require('express').Router()
// const { getAllPosibleMatches } = ('../queries/feed.js')

// feed.get('/', (req, res) => {
//   const { userId } = req.params
//   try {
//     const allMatches = await getAllPosibleMatches(userId)
//     res.status(200).json(allMatches)
//   } catch (err) {
//     res.status(404).statusMessage(err)
//   }
// });

// feed.get('/users/:id/feed/goals', (req, res) => {
//   res.send('SHOW /user/:id/feed/goals')
// });


// feed.get('/users/:id/feed/radius', (req, res) => {
//   res.send('SHOW /user/:id/feed/radius')
// });


// feed.get('/users/:id/feed/friends', (req, res) => {
//   res.send('SHOW /user/:id/feed/friends')
// });

// feed.get('/users/:id/feed/matches', (req, res) => {
//   res.send('SHOW /user/:id/feed/matches')
// });

// feed.get('/users/:id/feed/availability', (req, res) => {
//   res.send('SHOW /user/:id/feed/availability')
// });

module.exports = feed