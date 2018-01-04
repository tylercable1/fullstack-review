const express = require('express');
let app = express();
const db = require('../database/index.js');
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())
app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  // console.log(data);
  github.getReposByUsername(req.body.queryStr, (err, res, body) => db.save(null, null, body))

  // console.log(req.body);
  res.send('hey it worked')
  // db.save(data);
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.find((repos) => res.json(repos))
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

