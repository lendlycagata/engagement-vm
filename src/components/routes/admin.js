var express = require('express');
var router = express.Router();
//var mariadb = require('mariadb');
//const mysql = require('promise-mysql');
const mysql = require('mysql');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limts: {
    filesSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

// var connection = mysql.createConnection({
//   user: 'root',
//   password: 'root',
//   database: 'test_db',
//   connection_name: 'engageappmysql:us-central1:engage-instance',
// });

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

router.post('/adminpost', upload.single('eventPhoto'), (req, res, next) => {
  const eventName = req.body.eventName;
  const eventDate = req.body.eventDate;
  const eventVenue = req.body.eventVenue;
  const eventDetail = req.body.eventDetail;
  const eventStars = req.body.eventStars;
  const eventPhoto = req.file.path;
  const eventStart = req.body.eventStart;
  const eventEnd = req.body.eventEnd;

  var events = {
    eventName: eventName,
    eventDate: eventDate,
    eventVenue: eventVenue,
    eventDetail: eventDetail,
    eventStars: eventStars,
    eventPhoto: eventPhoto,
    eventStart: eventStart,
    eventEnd: eventEnd,
  };

  connection.query('INSERT INTO events SET ?', events, function (
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
        success: 'Added event!',
      });
    }
  });
});

module.exports = router;
