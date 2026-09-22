const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    if (isConnected || mongoose.connection.readyState === 1) {
        isConnected = true;
        return;
    }

    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb+srv://avinilitltd:z7xxvbQrFJ6nlNn4@3p-communications.in3ic.mongodb.net/3p_communications_db?retryWrites=true&w=majority&appName=3p-communications';

        const conn = await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        });

        isConnected = conn.connections[0].readyState === 1;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        // Do not call process.exit(1) on serverless environments to prevent killing the function
    }
};

module.exports = connectDB;

