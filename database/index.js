const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useMongoClient: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database connected')
});
  let repoSchema = mongoose.Schema({
    id: {type: Number, unique: true, required: true, dropDups: true},
    reponame: String,
    username: String,
    forks: Number,
    url: String
  });
  let Repo = mongoose.model('Repo', repoSchema);

let save = (err, res, apiData, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var parsedData = JSON.parse(apiData);
  console.log(parsedData);
  Promise.all(parsedData.map((repoObj) => {
    var temp = new Repo({
      id: repoObj.id,
      reponame: repoObj.name, 
      username: repoObj.owner.login, 
      forks: repoObj.forks, 
      url: repoObj.html_url
    });
    return temp.save((err, temp) => {
      if(err) {return console.error(err);}
    });
  })).then((data) => {
    callback(data);
  });
}

let find = (callback) => {
  // should query mongo db, and send back top 25 repos
  Repo
  .find()
  .limit(25)
  .sort('-forks')
  .find((err, repos) => {
  	if(err) {return console.error(err);}
  	// send repos to client
  	callback(repos);
  });
  // Repo.remove();

}

module.exports.save = save;
module.exports.find = find;