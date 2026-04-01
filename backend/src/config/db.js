const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Node.js conntected to MongoDB at ${conn.connection.host}`);
    } catch (error) {
        console.error(`Could not connect to database: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;