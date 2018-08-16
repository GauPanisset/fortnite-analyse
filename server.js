const Express = require("express");
const BP = require("body-parser");
const serveStatic = require('serve-static');


const app = Express();

const PORT = process.env.PORT || 8080;

app.use(BP.json());

app.use(function(req, res, next) {
  req.header("Access-Control-Allow-Origin", "*");
  req.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
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
