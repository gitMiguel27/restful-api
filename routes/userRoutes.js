const express = require("express");
const router = express.Router();
const users = require('../data/users')

//USER ROUTES
//get all users
//localhost:3000/api/users/api/users
router.use(express.json())

router.get("/", (req, res) => {
  res.json(users);
});


router.post("/", (req, res) => {
    
console.log(req.body)
  if (req.body.name && req.body.username && req.body.email) {
    if (users.find((u) => u.username == req.body.username)) {
      res.json({ error: "Username Already Taken" });
      return;
    }
    //move code here
    const user = {
      id: users[users.length - 1].id + 1,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
    };
    
    users.push(user);
    res.json(users[users.length - 1]);
  } else res.json({ error: "Insufficent Data" });
});

router.get("/:id", (req, res, next) => {
  const user = users.find((u) => u.id == req.params.id);
  if (user) res.json(user);
  else next();
});

router.patch("/:id", (req, res) => {
  const user = users.find((u, i) => {
    if (u.id == req.params.id) {
      for (const key in req.body) {
        users[i][key] = req.body[key];
      }
    }
    return true;
  });

  if (user) res.json(user);
  else next();
});

router.delete("/:id", (req, res) => {
  const user = users.find((u, i) => {
    if (u.id == req.params.id) {
      users.splice(i, 1);
      return true;
    }
  });

  if (user) res.json(user);
});

module.exports = router;