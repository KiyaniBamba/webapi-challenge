const express = require("express");
const router = express.Router();
const Action = require("../data/helpers/actionModel");

// Create our reutilizable functions

function validateAction(req, res, next) {
    const { description, notes } = req.body;
    if (!Object.keys(req.body).length) {
      res.status(400).json({ message: "Enter action!" });
    } else if (!req.body.description) {
      res.status(400).json({ message: 'Enter "description" field!' });
    } else if (!req.body.notes) {
      res.status(400).json({ message: 'Description must be under 128 characters' });
    } else {
      next();
    }
  }

// CREATE endpoint for actions
router.post("/:id", validateAction, (req, res) => {
	const { id } = req.params;
	const { description, notes } = req.body;
	Action
		.insert({ project_id: id, description, notes })
        .then(action => 
            res.status(201).json(action)
            )
		.catch(error => {
			res
				.status(400)
				.json({ error: "New action is not saved" });
		});
});

//READ endpoint for actions
router.get("/", (req, res) => {
  Action
    .get()
    .then(actions => 
        res.status(200).json(actions)
        )
    .catch(err => {
      res.status(500).json({
        message: `Error:` + error.message
      });
    });
});

// Update action
router.put("/:id", validateAction, (req, res) => {
	const { id } = req.params;
	const { description, notes } = req.body;
	actionDb
		.update(id, { notes, description })
		.then(action => res.status(200).json(action))
		.catch(err => {
			res.status(400).json({ error: "Action not updated" });
		});
});

// DELETE an action
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Action
  .remove(id)
  .then(action => res.status(200).json("Action deleted"))
  .catch(err => {
      res.status(400).json({ error: "Action not deleted" });
  });
});


module.exports = router;