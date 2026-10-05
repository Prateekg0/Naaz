const mongoose = require('mongoose')
const config = require('config')

// Hosting providers should set MONGO_URI to the complete connection string,
// including the database name (for example, ...mongodb.net/Naaz?...).
const mongoUri = process.env.MONGO_URI || config.get('MONGO_URI')

mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('MongoDB connection failed:', err.message)
        process.exit(1)
    })

module.exports = mongoose.connection;
