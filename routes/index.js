var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next) {
  var resultArray = [];
  /////////////////////
  console.log('sdfsdf');
  ///////////////////
  mongo.connect(url, (err, database) => {
    
    assert.equal(null, err);
    var dbTest = database.db('test');
    var cursor = dbTest.collection('user-data').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      database.close();
      res.render('index', {items: resultArray});
    });
  });
});

router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  mongo.connect(url, function(err, client) {
    // console.log('Post first' + db); /////////////////////////////////////////////////////
    var db = client.db('test');
    assert.equal(null, err);
    db.collection('user-data').insertOne(item, function(err, result) {
      // console.log('Post secound' + db); /////////////////////////////////////////////////////
      assert.equal(null, err);
      // console.log('Item inserted');
      client.close();
    });
  });
  res.redirect('/');
});

router.post('/update', function(req, res, next) {
  
});

router.post('/delete', function(req, res, next) {
  
});

module.exports = router;
