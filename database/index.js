const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useMongoClient: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database connected')
});


let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  reponame: String,
  username: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (apiData) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  apiData.forEach(repoObj, () => {
    var temp = new Repo({id: repoObj.id, reponame: repoObj.name, username: repoObj.owner.login, forks: repoObj.forks});
    temp.save((err, temp) => {
      if(err) {return console.error(err)};
    });
  });
}

module.exports.save = save;