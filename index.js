const express = require('express');
const app = express();
const port = 3000;

const users = require('./data/users');
const posts = require('./data/posts');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.get('/', (req, res) => {
    res.send('Work in progress...')
});

// get all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

app.post('/api/users', (req, res) => {
    if(req.body.name && req.body.username && req.body.email) {
        if(users.find((u) => u.username == req.body.username)) {
            res.json({ error: 'Username Already Taken' });
            return;
        };

        const user = {
            id: users[users.length - 1].id + 1,
            name: req.body.name,
            username: req.body.username,
            email: req.body.email
        };
    
        users.push(user);
        res.json(users[users.length - 1]);
    } else res.json({ error: 'Insufficient Data' });
});

app.get('/api/users/:id', (req, res, next) => {
    const user = users.find((u) => u.id == req.params.id);
    if(user) res.json(user)
        else next()
});

app.patch('/api/users/:id', (req, res) => {
    const user = users.find((u, i) => {
        if(u.id == req.params.id) {
            for(const key in req.body) {
                users[i][key] = req.body[key];
            };
        };
        return true;
    });

    if(user) res.json(user)
        else next();
});

app.delete("/api/users/:id", (req, res, next) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        users.splice(i, 1);
        return true;
      }
    });
    if (user) res.json(user);
    else next();
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
    res.json({ error: 'resource not found' });
});

app.listen(port, () => {
    console.log(`server listening on port: ${port}`);
});