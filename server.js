const Express = require("express");
const BP = require("body-parser");
const serveStatic = require('serve-static');


const router = Express.Router();
const app = Express();

const PORT = process.env.PORT || 8080;

app.use(BP.json());

app.use(serveStatic(__dirname + "/dist"));

app.listen(PORT, (err) => {

  if (err) {
    console.log(err);
  }
  else {
    console.log('app listening on port ' + PORT);
  }
});
