const express = require('express')
const router = express.Router()

const Menu = require('./../models/menu')

router.get('/',async(req,res)=>{
    try{
      const data = await Menu.find();
      console.log('data fetched')
      res.status(200).json(data);
    }
    catch(err){
      console.log('Error fetching data',err) 
      res.status(500).json({error: 'Internal server error'})
    }
  })

  router.get('/:t',async(req,res)=>{
    try{
    const taste = req.params.t;
    if(taste == 'sweet'|| taste =='sour' || taste=='spicy')
        {
            const data = await Menu.find({taste:taste})
            console.log('data fetched')
            res.status(200).json(data);
        }
        else {
            res.status(404).json({err:'taste not found'})
        }
    }
    catch(err){
      console.log('Error fetching data',err) 
      res.status(500).json({error: 'Internal server error'})
    }
  })

  router.post('/',async (req, res)=>{
    try{
      const data = req.body;
      const newMenu = new Menu(data);
      const response = await newMenu.save();
      console.log('Data Saved');
      res.status(201).json(response);
    }
    catch(err){
      console.log('Error saving data',err);
      res.status(500).json({error:'Internal server error'})
    }
  })

  // comment added for testing purpose
  module.exports = router;