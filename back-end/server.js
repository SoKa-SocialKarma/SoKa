// DEPENDENCIES
<<<<<<< HEAD
const app = require('./app.js');
=======
const app = require('./app.js')
const colors = require("colors")
>>>>>>> ae7040d7ff1ef2cc7381230e3e6a6f5a3b7f152e

// CONFIGURATION
require('dotenv').config();

const PORT = process.env.PORT;

// LISTEN
app.listen(PORT, () => {
<<<<<<< HEAD
	console.log(`Server running on port: http://localhost:${PORT}`);
});
=======
	console.log('🎧 Listening on port : '.trap.yellow +`${PORT} `.cyan + '🎧')
})
>>>>>>> ae7040d7ff1ef2cc7381230e3e6a6f5a3b7f152e
