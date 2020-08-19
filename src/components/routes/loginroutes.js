var express = require('express');
var router = express.Router();
//var mariadb = require('mariadb');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('Connected!');
});

router.post('/register', async (req, res) => {
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  var user = {
    email: req.body.email,
    password: encryptedPassword,
  };

  connection.query('INSERT INTO users SET ?', user, function (
    error,
    results,
    fields
  ) {
    if (error) {
      res.send({
        code: 400,
        failed: 'Username already exists',
      });
    } else {
      res.send({
        code: 200,
        success: 'User registered successfully',
      });
    }
  });
});

// exports.register = async function(req,res){
//   const password = req.body.password;
//   const encryptedPassword = await bcrypt.hash(password, saltRounds)

//   var users={
//      "email":req.body.email,
//      "password":encryptedPassword
//    }

//   connection.query('INSERT INTO users SET ?', users , function (error, results, fields) {
//     if (error) {
//       res.send({
//         "code":400,
//         "failed":"Username already exists"
//       })
//     } else {
//       localStorage.setItem('currentUser', JSON.stringify(users));
//       res.send({
//         "code":200,
//         "success":"User registered successfully"
//           });
//       }
//   });

// }

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  connection.query(
    'SELECT * FROM users WHERE email = ?',
    email,
    async function (error, results, fields) {
      if (error) {
        res.send({
          code: 400,
          failed: 'No email exists',
        });
      } else {
        if (results.length > 0) {
          const comparison = await bcrypt.compare(
            password,
            results[0].password
          );
          const user = {
            email,
            password,
          };
          if (comparison) {
            const token = jwt.sign(
              {
                email: results[0].email,
                password: results[0].password,
              },
              process.env.JWT_TOKEN,
              {
                expiresIn: 3600,
              }
            );
            return res.status(200).json({
              token: token,
              email,
            });

            // res.status(200).json({
            //   message:"Auth Success",
            //   token:token
            // }).send({
            //   "code":200
            // })
          } else {
            res.status(204).json({
              msg: 'Email and password do not match.',
            });
          }
        } else {
          res.status(206).json({
            code: 404,
            msg: 'Email does not exist.',
          });
        }
      }
    }
  );
});

// exports.login = async function(req,res){
//   const email = req.body.email;
//   const password = req.body.password;

//   connection.query('SELECT * FROM users WHERE email = ?', email , async function (error, results, fields) {
//     if (error) {
//       res.send({
//         "code":400,
//         "failed":"No email exists"
//       })
//     }else{
//       if(results.length > 0){
//         const comparison = await bcrypt.compare(password, results[0].password)
//         const user = {
//           email,
//           password
//         }
//         if(comparison){
//             const token = jwt.sign
//             ({
//               email: results[0].email,
//               password: results[0].password
//             },process.env.JWT_TOKEN
//             ,{
//                 expiresIn: 3600
//             }
//             )
//             return res.status(200).json({
//               token: token
//             })

//             // res.status(200).json({
//             //   message:"Auth Success",
//             //   token:token
//             // }).send({
//             //   "code":200
//             // })

//         }
//         else{
//           res.status(204).json({
//                "msg":"Email and password do not match."
//           })
//         }
//       }

//       else{
//       res.status(206).json({
//         "code":404,
//         "msg":"Email does not exist."
//           })
//     }
//     }
//     });

// }

router.get('/get', (req, res) => {
  connection.query('SELECT * FROM events', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

// router.get('/getTasks', (req,res) => {
//   const userID = localStorage.getItem('currentUser')
//   connection.query('SELECT * FROM tasks ',  function (error, results, fields) {
//     if (error) throw error;
//     res.send(results)
//   });
// })

// exports.getEvents = async function(req,res){
//   connection.query('SELECT * FROM events', function (error, results, fields) {
//     if (error) throw error;
//     res.send(results)
//   });
// }

router.get('/getUser', (req, res) => {
  connection.query('SELECT * FROM users WHERE email = ?', email, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});

// exports.getUser = async function(req,res){
//   connection.query('SELECT * FROM users WHERE email = ?', email, function (error, results, fields) {
//     if (error) throw error;
//     res.send(results)
//   });
// }

router.post('/events/:eventID', (req, res) => {
  const eventID = req.body.eventID;
  connection.query('SELECT * FROM events WHERE eventID = ?', eventID, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});

// exports.getEventDetails = async function(req,res){
//   const eventID = req.body.eventID
//   connection.query('SELECT * FROM events WHERE eventID = ?', eventID, function (error, results, fields) {
//     if (error) throw error;
//     res.send(results)
//   });
// }

module.exports = router;
