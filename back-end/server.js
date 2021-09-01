// DEPENDENCIES
const app = require('./app.js')

// CONFIGURATION
require('dotenv').config();

const PORT = process.env.PORT

// LISTEN
app.listen(PORT, () => {
	console.log(`Server running on port: http://localhost:${PORT}`)
})
