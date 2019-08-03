const express = require('express');

const router = express.Router();

const actions = require('./data/helpers/actionModel');

router.get('/', async (req, res)=> {
    try{
        const actionInfo = await actions.get();
        res.status(200).json(actionInfo);
    }catch(error){
        res.status(500).json({
            message: 'Error adding the action'
        })
    }
});

router.get('/:id',  validateActionId, async(req, res) => {
    try {
        const action = await actions.get(req.params.id);
        res.status(200).json(action);
      } catch (error) {
        // log error to server
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the action',
        });
      }

});

router.post('/', async (req, res) => {
  try {
    const post = await actions.insert(req.body);
    res.status(201).json(post);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error adding the action',
    });
  }
});

router.delete('/:id', async(req, res) => {
  try {
      const count = await actions.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({ message: 'The action has been nuked' });
      } else {
        res.status(404).json({ message: 'The action could not be found' });
      }
    } catch (error) {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error removing the action',
      });
    }

});
router.put('/:id',  async (req, res) => {
  try{
      const action = await actions.update(req.params.id, req.body);
      if(action){
          res.status(200).json(action);
      }else{
          res.status(404).json({message: 'the action could not be found'
      })
      }
  }catch (error){
      console.log(error);
      res.status(500).json({
          message: 'error updating the action.'
      })
  }

});

 

async function validateActionId(req, res, next) {
  try {
    const { id } = req.params.id
    const action = await actions.get(id)
    if (action) {
      console.log('Action validation success')
      console.log(req.params)
      req.action = action
      next()
    } else {
      res.status(404).json({
        message: 'The action you are looking for could not be found '
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}




module.exports = router;