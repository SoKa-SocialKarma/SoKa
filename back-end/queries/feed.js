const db = require('../database/dbConfig');

const { getAllPossibleMatchesQuery} = require('../helpers/feedQuery')

const getAllPossibleMatches = async (id) => {
  try {
    const dbFeedQuery = getAllPossibleMatchesQuery(id)
    // if (!dbFeedQuery.qParams.length){
    // }

    const possibleMatches = await db.any(dbFeedQuery.qString)
    return possibleMatches
} catch (err) {
  return 'Error query not returned'
}
};
const getFilteredGoals = async (id) => {
  try {
  
} catch (err) {
  return 'error'
}
};
const getFilteredRadius = async (id) => {
  try {
  
} catch (err) {
  return 'error'
}
};
const getFilteredMatches = async (id) => {
  try {
  
} catch (err) {
  return 'error'
}
};
const getFilteredAvailability = async (id) => {
  try {
  
} catch (err) {
  return 'error'
}
};

module.exports = {
getAllPossibleMatches,
getFilteredGoals,
getFilteredRadius,
getFilteredMatches,
getFilteredAvailability
}