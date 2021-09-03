// DEPENDENCIES
const app = require('./app.js')
const colors = require("colors")

// CONFIGURATION
require('dotenv').config();

const PORT = process.env.PORT

// LISTEN
app.listen(PORT, () => {
	console.log('🎧 Listening on port : '.trap.yellow +`${PORT} `.cyan + '🎧')
})
