const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItem');

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log('Data saved');
    res.status(200).json(response);
  }
  catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/', async (req, res) => {
  try {
    const menuItemData = await MenuItem.find();
    console.log('Data fetch!!');
    res.status(200).json(menuItemData);
  }
  catch (err) {
    console.error('error in fetching data', err)
    res.status(500).json({ error: 'internal server error' })
  }
})


router.get('/:taste', async (req, res) => {
  try {
    const taste = req.params.taste;
    if (['sweet', 'spicy', 'sour'].includes(taste)) {
      const response = await MenuItem.find({ taste: taste })
      console.log('Data fetch!!');
      res.status(200).json(response);
    }
    else {
      res.status(404).json({ error: 'Invalid taste type.. only three tyoe are valid: [sweet,spicy,sour]' })
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Data not found' })
  }
})


router.put('/:id', async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const updatedMenuData = req.body;
    const response = await MenuItem.findByIdAndUpdate(menuItemId, updatedMenuData, {
      new: true,
      runValidators: true,
    })
    if (!response) {
      return res.status(404).json({ error: 'Item not found' })
    }
    console.log('Data Updated !!');
    res.status(200).json(response);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Data not found' })
  }
})


router.delete('/:id', async (req,res)=>{
  try{
    const itemId = req.params.id;

    const response = await MenuItem.findByIdAndDelete(itemId);
    if(!response){
      return res.status(404).json({error: 'Person not found'})
    }

    console.log('Data Deleted');
    res.status(200).json({messgae: 'Menu item Deleted Successfully'}); 
    
  }
  catch(err){
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
})



module.exports = router;