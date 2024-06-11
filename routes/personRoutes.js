const express = require('express')
const router = express.Router()

const Person = require('./../models/person');

router.get('/',async (req,res)=>{
    try{
      const data =await Person.find()
      console.log('Data fetched')
      console.log(data)
      res.status(200).json(data)
    }
    catch(err){
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  
  router.get('/:workType',async (req,res)=>{
    try{
      const workparam = req.params.workType;
      if(workparam == 'Chef'||workparam == 'Manager'||workparam == 'Waiter')
        {
          const response = await Person.find({work:workparam})
          console.log('data of $workparam fetched successfully')
          res.status(200).json(response)
        }
        else {
          res.status(404).json({error:'Not found'})
        }
    }
    catch(err){
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  })

router.post('/', async (req, res) => {
    try {
      const data = req.body;
      const newPerson = new Person(data);
      const response = await newPerson.save();
      console.log('Data saved:', response);
      res.status(201).json(response);
    } catch (err) {
      console.error('Error saving data:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  router.put('/:id', async (req,res) => {
    try{
      const person_id = req.params.id;
      const updatedPersonData = req.body;
      const response = await Person.findByIdAndUpdate(person_id,updatedPersonData,{
        new:true,
        runValidators:true
      });

      if(!response){
        res.status(404).json({error:'Person not found'})
      }

      console.log('Data saved:', response);
      res.status(200).json(response);
    }
    catch(err){
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  router.delete('/:id',async (req,res)=>{
    try{
      const person_id = req.params.id;
      const response = await Person.findByIdAndDelete(person_id);

      if(!response){
        res.status(404).json({error:'Person not found'})
      }
      console.log('Data Deleted:', response);
      res.status(200).json(response);
    }
    catch(err)
    {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  })


  module.exports = router;
