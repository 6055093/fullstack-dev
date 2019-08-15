const express = require('express');
const multer = require('multer');
const app = express();
const reloadMagic = require('./reload-magic.js');
const upload = multer({
  dest: __dirname + '/public/images',
});
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const data = require('./data.js');
const passwords = {};
const sessions = {};
const items = data.items;
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

app.use(require('body-parser').text());

reloadMagic(app);

app.use('/', express.static('build')); // Needed for the HTML and JS files
app.use('/', express.static('public')); // Needed for local assets

// Your endpoints go after this line

app.get('/session', (req, res) => {
  const sessionId = req.cookies.sid;
  if (sessions[sessionId]) {
    const username = sessions[sessionId];
    return res.send(JSON.stringify({ success: true, username }));
  }
  res.send(JSON.stringify({ success: false }));
});

app.get('/items', (req, res) => {
  res.send(JSON.stringify({ success: true, items }));
});

app.post('/logout', (req, res) => {
  const sessionId = req.cookies.sid;
  delete sessions[sessionId];
  res.send(JSON.stringify({ success: true }));
});

app.post('/login', upload.none(), (req, res) => {
  console.log("**** I'm in the login endpoint");
  console.log('this is the parsed body', req.body);
  const username = req.body.username;
  const enteredPassword = req.body.password;
  const expectedPassword = passwords[username];
  console.log('expected password', expectedPassword);
  if (enteredPassword === expectedPassword) {
    console.log('password matches');
    const sessionId = generateId();
    console.log('generated id', sessionId);
    sessions[sessionId] = username;
    res.cookie('sid', sessionId);
    res.send(JSON.stringify({ success: true }));
    return;
  }
  res.send(JSON.stringify({ success: false }));
});

const generateId = () => {
  return '' + Math.floor(Math.random() * 100000000);
};

app.post('/signup', upload.none(), (req, res) => {
  console.log("**** I'm in the signup endpoint");
  console.log('this is the body', req.body);
  const username = req.body.username;
  const enteredPassword = req.body.password;
  if (passwords[username]) {
    return res.send({ success: false, message: 'Username taken' });
  }
  passwords[username] = enteredPassword;
  console.log('passwords object', passwords);
  const sessionId = generateId();
  console.log('generated id', sessionId);
  sessions[sessionId] = username;
  res.cookie('sid', sessionId);
  res.send(JSON.stringify({ success: true }));
});

app.post('/sell-item', upload.single('image'), (req, res) => {
  console.log("**** I'm in the sell item endpoint");
  console.log('this is the body', req.body, req.file);

  items.push({
    ...req.body,
    image: '/images/' + req.file.filename,
    id: items.length,
  });
  res.send(JSON.stringify({ success: true, items }));
});
app.post('/charge', async (req, res) => {
  try {
    let { status } = await stripe.charges.create({
      amount: 2000,
      currency: 'usd',
      description: 'An example charge',
      source: req.body,
    });

    res.json({ status });
  } catch (err) {
    res.status(500).end();
  }
});

// Your endpoints go before this line

app.all('/*', (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + '/build/index.html');
});

app.listen(4000, '0.0.0.0', () => {
  console.log('Server running on port 4000');
});
