const express = require('express');

const router = express.Router();
const projects = require('./data/helpers/projectModel');

router.get ('/', async (req, res)=> {
    try{
        const projects = await projects.get(req.body);
        res.status(200).json(projects)
    }catch (error){
        res.status(500).json({
            message: 'Error retrieving the projects.'
        })
    }
});

router.get('/:id', async (req, res) => {
    try{
      const project = await projects.getById(req.params.id)
      if(project){
        res.status(200).json(project)
      }else{
        res.status(404).json({
          message: 'The post you are looking for cannot be found'
        })
      }
    } catch (error){
      console.log(error)
      res.status(500).json({
        message: 'Could not retrieve the project.'
      })
    }
 });

module.exports = router;

