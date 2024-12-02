// Importing Mongoose to connect and interact with the MongoDB database
const mongoose = require('mongoose');
require('dotenv').config();

// Defining the URL for the MongoDB server and the 'hotels' database
// 'localhost:27017' is the default address for MongoDB running locally


const mongoURL =process.env.DB_URL;
// Online mongoDB atlas k cluster ko connect krny k leye phyly netwek access pr jana hai or wahan sy or wahan new IP add krni hai phr cluster mai aakr connect pr click kr k vs code new new link copy krni hai or ussy env file mai add krna hai DB_URL waly variable mai.. ye sab krny k baad he atlas wala databse connect hoga...


// const mongoURL = process.env.DB_URL_LOCAL;






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

