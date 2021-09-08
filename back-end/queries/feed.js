const db = require('../database/dbConfig');

const { getAllPosibleMatchesQuery} = require('../helpers/feedQuery')

const getAllPossibleMatches = async (id) => {
  console.log("USER ID: ", id)
  try {
    return {"message":"success"}
} catch (err) {
  return 'error'
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