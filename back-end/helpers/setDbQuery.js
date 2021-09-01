const getAllUsersQuery = ({ search, location, badges, sortBy, order }) => {
    let qString = "SELECT * FROM users";
    const qParams = [];

    if (search) {
        qParams.push(`%${search}%`);
        qString += ` WHERE name ILIKE $${qParams.length}`;
    }

    if (location) {
        qParams.push(`%${location}%`);
        qString += `${qString.includes("WHERE") ? " AND" : " WHERE"} location ILIKE $${qParams.length}`;
    }

    badges = badges?.toUpperCase();
    if (badges === "TRUE" || badges === "FALSE") {
        qString += `${qString.includes("WHERE") ? " AND" : " WHERE"} badges=${badges}`;
    }

    const columns = ["id", "username", "karma"];
    sortBy = sortBy?.toLowerCase();
    order = order?.toUpperCase();
    if (columns.includes(sortBy)) {
        qString += ` ORDER BY ${sortBy} ${order === "ASC" || order === "DESC" ? order : "ASC"}`;
    }

    return { qString, qParams };
}

const updateUsersQuery = (ids, data) => {
    const constructQuery = (id, user) => {
        let qString = "UPDATE users SET";
        const qParams = [];

        const params = ["name", "lastname", "email", "username", "password", "location", "gender", "image", "interests", "requests", "goals"];
        for (const key in user) {
            if (params.includes(key)) {
                qParams.push(user[key]);
                qString += `${qParams.length > 1 ? "," : ""} ${key}=$${qParams.length}`;
            }
        }

        qParams.push(id);
        qString += ` WHERE id=$${qParams.length} RETURNING *`;
        return { qString, qParams };
    }

    if (!ids.includes(",")) {
        if (data.length) {
            data = data[0];
        }
        return constructQuery(ids, data);
    }

    return ids.split(",").map((id, i) => constructQuery(id, data[i]));
}

module.exports = {
    getAllUsersQuery,
    updateUsersQuery
}