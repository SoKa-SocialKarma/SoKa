const db = require('../database/dbconfig');

const getAllActivities = async () => {
    try {
        const allActivities = await db.any('SELECT * FROM activities');
        return allActivities;
    } catch (error) {
        return error;
    }
}

module.exports = {
    getAllActivities
}