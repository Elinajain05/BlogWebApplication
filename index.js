import express from "express";
import bodyParser from "body-parser";

const app = express();
let posts = [];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.render('index', { posts });
});

app.get('/new', (req, res) => {
  res.render('new');
});

app.post('/create', (req, res) => {
  const { title, content } = req.body;
  posts.push({ id: Date.now(), title, content });
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render('edit', { post });
});

app.post('/update/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    post.title = req.body.title;
    post.content = req.body.content;
  }
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});