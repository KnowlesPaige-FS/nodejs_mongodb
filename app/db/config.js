const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${conn.connection.localhost}`);
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDB;