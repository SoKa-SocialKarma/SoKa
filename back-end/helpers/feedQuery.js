const users = require("../controllers/usersController")

const getAllPossibleMatchesQuery = ({id, goals, radius, matches, availability})=>{

    let qString = 
`WITH RECURSIVE matches (id, username, goalsList) AS (SELECT id, username, goals->'goals' FROM users WHERE id = ${id} UNION ALL SELECT users.id, users.username, users.goals FROM users JOIN matches ON users.goals->'goals' @> matches.goalsList) SELECT DISTINCT * FROM matches WHERE id != ${id};`
    const qParams = [];


    // if (goals) {
    //     qParams.push(`%${location}%`);
    //     qString += `${qString.includes("WHERE") ? " AND" : " WHERE"} location ILIKE $${qParams.length}`;
    // }


    return { qString, qParams };
}

module.exports = {getAllPossibleMatchesQuery}