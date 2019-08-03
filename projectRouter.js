const express = require('express');

const router = express.Router();
const projects = require('./data/helpers/projectModel');
const actions = require('./data/helpers/actionModel');

router.get ('/', async (req, res)=> {
    try{
        const projectsInfo = await projects.get();
        res.status(200).json(projectsInfo)
    }catch (error){
        res.status(500).json({
            message: 'Error retrieving the projects.'
        })
    }
});

router.get('/:id', async (req, res) => {
    try{
      const project = await projects.get(req.params.id)
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

 router.get('/:id/actions', async (req, res) => {
    try{
      const project = await projects.get(req.params.id)
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

 router.get('/:id/actions/:id', async (req, res) => {
    try{
      const project = await projects.get(req.params.id)
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

//  router.post('/:id/actions', async (req, res) => {
//     try {
//       const actionInfo =    {...req.body, project_id:
//     req.params.id};
//      const post  = await actions
//     .insert(actionInfo)
    
//       res.status(201).json(post);
//     } catch (error) {
//       // log error to server
//       console.log(error);
//       res.status(500).json({
//         message: 'Error adding the action',
//       });
//     }
//   });
router.post('/:id/actions/:id',  (req, res) => {
    const actionInfo = { ...req.body, project_id: req.params.id };
    actions 
     .insert(actionInfo)
     .then(action => {
      res.status(201).json(action);
     })
     .catch(err => res.status(500).json(err));
   });

//    router.put('/:id/actions/:id',  async (req, res) => {
//     try{
//         const action = await actions.update(req.params.id, req.body);
//         if(user){
//             res.status(200).json(action);
//         }else{
//             res.status(404).json({message: 'the user could not be found'
//         })
//         }
//     }catch (error){
//         console.log(error);
//         res.status(500).json({
//             message: 'error updating the user.'
//         })
//     }
  
//   });

  router.put('/:id',  async (req, res) => {
    try {
      const project = await Projects.update(req.params.id, req.body)
      if (project) {
        res.status(200).json(project)
      } else {
        res.status(404).json({
          message: 'The project you are trying to update could not be found.'
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: 'Could not update the project .'
      })
    }
  })

module.exports = router;

