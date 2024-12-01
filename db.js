// Importing Mongoose to connect and interact with the MongoDB database
const mongoose = require('mongoose');
require('dotenv').config();

// Defining the URL for the MongoDB server and the 'hotels' database
// 'localhost:27017' is the default address for MongoDB running locally


// const mongoURL = process.env.MONGODB_URL_LOCAL;
// const mongoURL = 'mongodb://localhost:27017/hotels'
// const mongoURL = process.env.atlas
// const mongoURL ='mongodb+srv://mtahir776655:qwerty12345@cluster0.7fqd2.mongodb.net/hotels?retryWrites=true&w=majority'

const mongoURL = process.env.DB_URL;






// Connecting to the MongoDB server using the URL
mongoose.connect(mongoURL);

// Storing the connection object in a variable for monitoring and handling events
const db = mongoose.connection;

// Event listener: Executes when the connection to MongoDB is successful
db.on('connected', () => {
    console.log('Connected to MongoDB server !!'); // Log a success message
});

// Event listener: Executes when there is an error while connecting to MongoDB
db.on('error', (err) => {
    console.error('MongoDB connection error !!', err); // Log the error details
});

// Event listener: Executes when the MongoDB connection is closed or disconnected
db.on('disconnected', () => {
    console.log('MongoDB disconnected !!'); // Log a message indicating disconnection
});

// Exporting the database connection object for use in other files
module.exports = db;

