const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// App configurations
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Data storage (in-memory for this version)
let posts = [];

// Routes
app.get('/', (req, res) => {
    res.render('home', { posts });
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/create', (req, res) => {
    const { title, content } = req.body;
    posts.push({ id: Date.now(), title, content });
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const post = posts.find(post => post.id === parseInt(req.params.id));
    res.render('edit', { post });
});

app.post('/edit/:id', (req, res) => {
    const { title, content } = req.body;
    const post = posts.find(post => post.id === parseInt(req.params.id));
    if (post) {
        post.title = title;
        post.content = content;
    }
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    posts = posts.filter(post => post.id !== parseInt(req.params.id));
    res.redirect('/');
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
