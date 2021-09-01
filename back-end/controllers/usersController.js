const users = require('express').Router()
const {
  getAllUsers,
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers
} = require('../queries/users')

const { postCheck, putCheck } = require('../helpers/verifyData')
const feedController = require('./feedController')

const msgInvalidQuery = () => 'Invalid data caused database to return an error.'
const catchError = value => value === 'error'

users.use('/:id/feed', feedController)

users.get('/', async (req, res) => {
  const allUsers = await getAllUsers(req.query)
  res.json(allUsers)
})

users.get('/:ids', async (req, res) => {
  const { ids } = req.params
  try {
    const users = await getUsers(ids)
    if (catchError(users)) throw msgInvalidQuery()

    res.json(users.length ? users : [users])
  } catch (err) {
    res.status(400).json({ error: err })
  }
})

users.post('/', postCheck, async (req, res) => {
  try {
    const newUser = await createUsers(req.body)
    if (catchError(newUser)) throw msgInvalidQuery()

    res.json(newUser.length ? newUser : [newUser])
  } catch (err) {
    res.status(400).json({ error: err })
  }
})

users.put('/:ids', putCheck, async (req, res) => {
  const { ids } = req.params
  try {
    const updatedUsers = await updateUsers(ids, req.body)
    if (catchError(updatedUsers)) throw msgInvalidQuery()

    res.json(updatedUsers.length ? updatedUsers : [updatedUsers])
  } catch (err) {
    res.status(400).json({ error: err })
  }
})

users.delete('/:ids', async (req, res) => {
  const { ids } = req.params
  try {
    const deletedUsers = await deleteUsers(ids)
    if (catchError(deletedUsers)) throw msgInvalidQuery()
    res.json(deletedUsers.length ? deletedUsers : [deletedUsers])
  } catch (err) {
    res.status(400).json({ error: err })
  }
})

module.exports = users
