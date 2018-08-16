const Express = require("express");
const BP = require("body-parser");
const serveStatic = require('serve-static');


const app = Express();

const PORT = process.env.PORT || 8080;

app.use(BP.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.use(serveStatic(__dirname + "/dist"));

app.use('/read', require('./read.js').router);

app.listen(PORT, (err) => {

  if (err) {
    console.log(err);
  }
  else {
    console.log('app listening on port ' + PORT);
  }
});
