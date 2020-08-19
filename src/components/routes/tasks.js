var express = require('express');
var router = express.Router();
//var mariadb = require('mariadb');
const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test-db',
  port: process.env.DB_PORT,
});

// const connection = mariadb.createPool({
//   host: 'mydb.com',
//   user: 'root',
//   password: '1234',
//   connectionLimit: 5,
//   connection_name = 'ti-tids-demo:northamerica-northeast1:engagementapp'
// });

router.post('/post', (req, res, next) => {
  const taskName = req.body.taskName;
  const dateDue = req.body.dateDue;
  const userID = req.body.userID;

  var tasks = {
    taskname: taskName,
    taskDate: dateDue,
    userID: userID,
  };

  connection.query('INSERT INTO tasks SET ?', tasks, function (
    error,
    results,
    fields
  ) {
    if (error) {
      res.send({
        code: 400,
        failed: 'Error occurred.',
      });
    } else {
      res.send({
        code: 200,
        success: 'Added task!',
      });
    }
  });
});

router.get('/getTasks', (req, res) => {
  connection.query('SELECT * FROM tasks', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

router.post('/getUser', (req, res) => {
  console.log(req.body);
  // const currentUser = localStorage.getItem('currentUser')
  const email = 'admin';
  connection.query('SELECT * FROM users', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

module.exports = router;
