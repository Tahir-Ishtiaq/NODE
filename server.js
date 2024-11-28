// Importing the Express library to create a web server
const express = require('express');

// Initializing the Express app
const app = express();

// Importing the database connection setup
const db = require('./db');

// Importing the Body-Parser library to handle JSON data in HTTP requests
const bodyParser = require('body-parser');

// Telling the app to use Body-Parser to parse incoming JSON data
app.use(bodyParser.json());

// Importing the Person model, which defines the structure of our database collection

// const Person = require('./models/person');
// const MenuItem = require('./models/menuItem');

// Defining a GET route at the root URL ('/')
app.get('/', function (req, res) {
  // When someone visits the root URL, send this response
  res.send('Hello World!! The Server Is Live Now');
});



const personRoutes= require('./routes/personRoutes');
app.use('/person', personRoutes)


const menuItemRoutes= require('./routes/menuItemRoutes');
app.use('/menuItem', menuItemRoutes)









// Starting the server to listen on port 3000
app.listen(3000, () => {
  // Log a message when the server is running
  console.log('3000 is live');
});




























// {
  // "name":"Tahir",
  // "age":21,
  // "work":"chef",
  // "mobile":"03093724412",
  // "email":"m.tahir776655@gmail.com",
  // "address":"Garden East, Karachi",
  // "salary":20000
// }


// app.get('/name', function (req, res) {
//     res.send('My Name is Tahir')
//   })

// app.get('/age', function (req, res) {
//     res.send('My age is 21')
//   })

//   app.get('/gender', function (req, res) {
//     res.send('My gender is male')
//   })

//   app.get('/hobbies', function (req, res) {
//     let hobbies={
//         game:'cricket',
//         music:'classic',
//         film:'action'
//     }
//     res.send(hobbies)
//   })

//   app.get('/person',(req,res)=>{
//     res.send('this is person');
    
    
//   })