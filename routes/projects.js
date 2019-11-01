const express = require("express");
const router = express.Router();
const Projects = require("../data/helpers/projectModel");

// Create our reutilizable function

function validateProject(req, res, next) {
    if (!Object.keys(req.body).length) {
      res.status(400).json({ message: "Need project's data" });
    } else if (!req.body.name) {
      res.status(400).json({ message: 'Please add name' });
    } else if (!req.body.description) {
      res.status(400).json({ message: 'Please add description' });
    } else {
      next();
    }
  }

//   CRUD operations

  // CREATE endpoint for actions
      router.post("/", validateProject, (req, res) => {
        Projects.insert(req.body)
          .then(user => {
            res.status(201).json(user);
          })
          .catch(err => {
            res
              .status(500)
              .json({ message: "We encountered an error while adding the project" });
          });
      });


//READ endpoint
  router.get("/", (req, res) => {
    Projects.get()
      .then(projects => {
        res.status(200).json(projects);
      })
      .catch(err => {
        res.status(500).json({
          message: "We encountered an error while retrieving the projects"
        });
      });
  });
  
  // Update
  router.put("/:id", validateProject, (req, res) => {
    const { id } = req.params;
    Projects.update(id, req.body)
      .then(project => {
        if (project) {
          res.status(200).json(project);
        } else {
          res.status(404).json({ message: "The project could not be found" });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: "We encountered an error while updating the project"
        });
      });
  });
  
  //Delete
  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    Projects.remove(id).then(data => {
      if (data) {
        res.status(200).json({ message: "The project has been deleted" });
      }
    });
  });
  
  // Display a messaging error if action is not associated to a project 
  router.get("/:id/actions", (req, res) => {
    const { id } = req.params;
    Projects.getProjectActions(id)
      .then(actions => {
        if (actions[0]) {
          res.status(200).json(actions);
        } else {
          res.status(404).json({ message: "The project could not be found" });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: "There is no action associated to this project"
        });
      });
  });
  


module.exports = router;