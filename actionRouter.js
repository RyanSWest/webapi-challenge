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

router.get('/:id',  async(req, res) => {
    try {
        const action = await actions.getById(req.params.id);
        res.status(200).json(action);
      } catch (error) {
        // log error to server
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the action',
        });
      }

});




module.exports = router;