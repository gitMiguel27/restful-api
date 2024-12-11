const express = require('express');
const app = express();
const port = 3000;

const users = require('./data/users');
const posts = require('./data/posts');

app.get('/', (req, res) => {
    res.send('Work in progress...')
});

// get all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

app.get('/api/users/:id', (req, res, next) => {
    const user = users.find((u) => u.id == req.params.id);
    if(user) res.json(user)
        else next()
});

// get all posts
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

app.get('/api/posts/:id', (req, res, next) => {
    const post = posts.find((p) => p.id == req.params.id);
    if(post) res.json(post)
        else next()
});

app.use((req, res) => {
    res.status(404)
    res.json({error: 'resource not found'});
});

app.listen(port, () => {
    console.log(`server listening on port: ${port}`);
});