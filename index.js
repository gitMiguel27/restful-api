const express = require("express");
const app = express();
const port = 3000;

const users = require("./data/users");
const posts = require("./data/posts");

const userRoutes = require('./routes/userRoutes')

const bodyParser = require("body-parser");

//MIDDLEWARE
app.use('/api/users', userRoutes)
// app.use('/api/posts', postRoutes)
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json({ extended: true }));

app.use(express.json()) //modern version of above

app.get("/", (req, res) => {
  res.send("Work in progress!");
});


//posts
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

app.get("/api/posts/:id", (req, res, next) => {
  const post = posts.find((p) => p.id == req.params.id);
  if (post) res.json(post);
  else next();
});

app.use((req, res) => {
  res.status(404);
  res.json({ error: "resource not found" });
});

app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});