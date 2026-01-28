const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI) // no extra options needed
        console.log('✅ Database Connected');
    } catch (err) {
        console.error('❌ Failed Database:', err.message);
        process.exit(1);
    }
}

module.exports = connectDB
