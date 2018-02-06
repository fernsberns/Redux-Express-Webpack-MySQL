const path = require('path');
const express = require('express');
const webpack = require('webpack');
const mongoose = require('mongoose');
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
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}
app.get('/api/books', function(req, res) {
  var query = connection.query('select * from books', function(err, result) {
    // console.log(query.sql);
    res.json(result);
  });
});

app.use(bodyParser.json());
app.post('/api/books/add', function(req, res) {
  console.log("Req body:", req.body);
  var newBook = req.body;
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
  console.info('Listening on port %s, Please open http://localhost:3000', port);
});
