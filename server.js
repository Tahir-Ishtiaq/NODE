const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');



const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;


// Middleware Function
const logRequest =(req, res, next)=>{
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next()
}
app.use(logRequest);






app.use(passport.initialize());

const localAuthMiddelware = passport.authenticate('local', {session: false});
app.get('/',localAuthMiddelware,function (req, res) {
  res.send('Hello World!! The Server Is Live Now');
});



const personRoutes= require('./routes/personRoutes');
app.use('/person',personRoutes)


const menuItemRoutes= require('./routes/menuItemRoutes');
app.use('/menuItem', menuItemRoutes)









// Starting the server to listen on port 3000
app.listen(PORT, () => {
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