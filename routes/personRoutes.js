const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

// Defining a POST route to add a new person to the database
router.post('/signup', async (req, res) => {
    try {
      // Getting the data from the request body (sent by the client)
      const data = req.body;
  
      // Creating a new Person document using the data provided
      const newPerson = new Person(data);
  
      // Saving the new Person document to the database
      const response = await newPerson.save();
      console.log('Data saved'); // Log success message to the console

      const payload = {
        id: response.id,
        username: response.username
    }
      const token = generateToken(payload);
      console.log("Token is : ", token);
      res.status(200).json({response: response, token: token});
    } catch (err) {
      // Log the error if something goes wrong
      console.log(err);
  
      // Sending an error response to the client
      res.status(500).json({ error: 'Internal server error' });
    }
  });




  // Login Route
router.post('/login', async(req, res) => {
  try{
      // Extract username and password from request body
      const {username, password} = req.body;

      // Find the user by username
      const user = await Person.findOne({username: username});

      // If user does not exist or password does not match, return error
      if( !user || !(await user.comparePassword(password))){
          return res.status(401).json({error: 'Invalid username or password'});
      }

      // generate Token 
      const payload = {
          id: user.id,
          username: user.username
      }
      const token = generateToken(payload);

      // resturn token as response
      res.json({token})
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});




// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try{
      const userData = req.user;
      console.log("User Data: ", userData);

      const userId = userData.id;
      const user = await Person.findById(userId);

      res.status(200).json({user});
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})




  
  router.get('/',jwtAuthMiddleware, async (req, res)=>{
    try{
      const personsData = await Person.find();
      console.log('Data fetch!!');
      
      res.status(200).json(personsData);
    }
    catch(err){
      console.error('error in fetching data',err)
      res.status(500).json({error:'internal server error'})
    }
  })



  router.get('/:workType', async(req,res)=>{
    try{
      const workType = req.params.workType;
    if(workType =='chef' || workType =='waiter' || workType =='manager' ){
      const response = await Person.find({work: workType});
      console.log('Data fetch');
      res.status(200).json(response);
    }
    else{
      res.status(404).json({error: 'Invalid work type'})
    }
    }
    catch(err){
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  })


  router.put('/:id', async (req,res)=>{
    try{
      const personId = req.params.id;
      const updatedPersonData = req.body;

      const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
        new:true,
        runValidators: true,
      })
      if(!response){
        return res.status(404).json({error: 'Person not found'})
      }

      console.log('Data Updated');
      res.status(200).json(response); 
      
    }
    catch(err){
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  })


  router.delete('/:id', async (req,res)=>{
    try{
      const personId = req.params.id;

      const response = await Person.findByIdAndDelete(personId);
      if(!response){
        return res.status(404).json({error: 'Person not found'})
      }

      console.log('Data Deleted');
      res.status(200).json({messgae: 'person Deleted Successfully'}); 
      
    }
    catch(err){
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  })

  module.exports= router;