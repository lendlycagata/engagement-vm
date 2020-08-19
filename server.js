var express = require('express');
var bodyParser = require('body-parser');
var app = express();

const admin = require('./src/components/routes/admin');
const login = require('./src/components/routes/loginroutes');
const task = require('./src/components/routes/tasks');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
var router = express.Router();
// test route
router.get('/', function (req, res) {
  res.json({ message: 'Backend engagement app' });
});

//route to handle user registration and login
// router.post('/register',login.register);
// router.post('/login',login.login)
// router.post('/events/:eventID', login.getEventDetails)
// router.get('/get', login.getEvents)
app.use('/uploads', express.static('./uploads'));
app.use('/api', login);
app.use('/admin', admin);
app.use('/task', task);

app.listen(4000);
