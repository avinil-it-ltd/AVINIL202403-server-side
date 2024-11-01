const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://avinilitltd:z7xxvbQrFJ6nlNn4@3p-communications.in3ic.mongodb.net/3p_communications_db?retryWrites=true&w=majority&appName=3p-communications', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
