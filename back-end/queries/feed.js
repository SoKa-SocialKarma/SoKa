const db = require('../database/dbConfig');

const getAllPosibleMatches = async (id) => {
  const { id } = req.params
  try {

  } catch (err) {
    return 'error'
  }
};

moduel.exports = {
  getAllPosibleMatches,
}
/* INDEX */
feed.get("/", async (req, res) => {
  const { userId } = req.params;
  try {
    const allMatches = await getAllPosibleMatches(userId);
    res.status(200).json(allMatches);
  } catch (err) {
    res.status(404).statusMessage(err);
  }
});