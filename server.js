const path = require('path');
const express = require('express');
const webpack = require('webpack');
const consign = require('consign')
const bodyParser = require('body-parser');
const cors = require('cors');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
var mysql = require('mysql');
var axios = require('axios');


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'react'
});
connection.connect();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

consign({cwd: 'app'})
  .include('models')
  .then('controllers')
  .then('routers')
  .into(app)
;

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });
  app.use(express.static('app/index.html'));
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  // app.get('*', function response(req, res) {
  //   res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
  //   res.end();
  // });
} else {
  console.log('error with express');
}

function getDateTime() {

  var date = new Date();

  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;

  var min  = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;

  var sec  = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;

  var year = date.getFullYear();

  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;

  var day  = date.getDate();
  day = (day < 10 ? "0" : "") + day;

  var datetime = year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
  return datetime;
}

app.get('/api/books', function(req, res) {
  var query = connection.query('select * from books WHERE deletedat IS NULL', function(err, result) {
    console.log(result, 'result -----------------');
    res.json(result);
  });
});

app.use(bodyParser.json());
app.post('/api/books/add', function(req, res) {
  // console.log("Req body:", req.body);
  
  var newBook = req.body;
  console.log(newBook, 'newbook');
  book = req.body;
        var query = connection.query('insert into books set ?', book, function (err, result) {
          console.log(query.sql);
          if (err) {
            console.error(err);
            return;
          }
          console.error(result);
        });
});

app.put('/api/books/:id',function(req,res){


	var id=req.params.id;
  console.log(id);
  
  var dateTime = getDateTime();
  console.log(dateTime);
  var sql = 'UPDATE books SET deletedat = ? WHERE id = ' + id + ';';
  var query = connection.query(sql, dateTime, function(err, result) {
    console.log(query.sql);
  });  
});

app.delete('/api/books/:id',function(req,res){


	var id=req.params.id;
  console.log(id);
  var query = connection.query('DELETE FROM books WHERE id = ?;', id, function(err, result) {
    console.log(query.sql);
  });  
});

app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.log(port);
  console.info('Listening on port %s, Please open http://localhost:3000', port);
});
