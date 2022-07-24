const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongoURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('MongoDB connected...');
    } catch(err) {
        console.log(err.message);

        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;