const express = require('express');
const router = express.Router();
const Person = require('../models/person');


// Defining a POST route to add a new person to the database
router.post('/', async (req, res) => {
    try {
      // Getting the data from the request body (sent by the client)
      const data = req.body;
  
      // Creating a new Person document using the data provided
      const newPerson = new Person(data);
  
      // Saving the new Person document to the database
      const response = await newPerson.save();
      console.log('Data saved'); // Log success message to the console
  
      // Sending a success response to the client with the saved data
      res.status(200).json(response);
    } catch (err) {
      // Log the error if something goes wrong
      console.log(err);
  
      // Sending an error response to the client
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
  router.get('/', async (req, res)=>{
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