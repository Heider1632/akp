var express = require('express');
var bodyParser = require('body-parser');
var path = require("path");
var app = express();

app.set('json spaces', 2);

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));


const controller = require("./src/akp");

app.get('/', function (req, res) {
  res.render('home');
});

app.post('/process', controller.akp);

app.get('/trace', controller.view);

app.set('port',process.env.PORT || 3000);

app.listen(app.get('port'), function () {
  console.log('Example app listening on port 7777!');
});