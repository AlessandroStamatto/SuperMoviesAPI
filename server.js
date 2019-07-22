
var express = require('express');
var firebase = require('firebase');
var bodyParser = require('body-parser');
var url = require('url');

var app = express();
app.use(bodyParser.json()); //need to parse HTTP request body

const firebaseConfig = {
  apiKey: "AIzaSyB-QtASXSMzvx_qoUCll7OmDlvB16ZvP8k",
  authDomain: "superfilmesapi.firebaseapp.com",
  databaseURL: "https://superfilmesapi.firebaseio.com",
  projectId: "superfilmesapi",
  storageBucket: "superfilmesapi.appspot.com",
  messagingSenderId: "77316420348",
  appId: "1:77316420348:web:9cfcbcb68574729e"
};
firebase.initializeApp(firebaseConfig);

//Fetch instances
app.get('/', function (req, res) {

	console.log("HTTP Get Recebido");
	var filmesReference = firebase.database().ref("/Filmes/");

	filmesReference.on("value", 
			  function(snapshot) {
					console.log(snapshot.val());
					res.json(snapshot.val());
					filmesReference.off("value");
					}, 
			  function (errorObject) {
					console.log("Leitura falhou: " + errorObject.code);
					res.send("Leitura falhou: " + errorObject.code);
			 });
});

//Create new instance
app.put('/', function (req, res) {

	console.log("HTTP Put Recebido");

    console.log(req.body);

	var title = req.body.title; // título do filme
	var poster_path = req.body.poster_path; // link para capa do filme
	var vote_average = req.body.vote_average; // pontuação média do filme
    var overview = req.body.overview; // sinopse do filme

	var referencePath = '/Filmes/'+title+'/';
	var filmesReference = firebase.database().ref(referencePath);
	filmesReference.set({title, poster_path, vote_average, overview}, 
				 function(error) {
					if (error) {
						res.send("Não foi possível salvar novo filme." + error);
					} 
					else {
						res.send("Filme salvo com sucesso!");
					}
			});
});

//Update existing instance
app.post('/', function (req, res) {

	console.log("HTTP POST Recebido");

	var title = req.body.title; // título do filme
	var poster_path = req.body.poster_path; // link para capa do filme
	var vote_average = req.body.vote_average; // pontuação média do filme
    var overview = req.body.overview; // sinopse do filme

	var referencePath = '/Filmes/'+title+'/';
	var filmesReference = firebase.database().ref(referencePath);
	filmesReference.update({title, poster_path, vote_average, overview}, 
				 function(error) {
					if (error) {
						res.send("Não foi possível atualizar dados do filme." + error);
					} 
					else {
						res.send("Dados do filme atualizados com sucesso!");
					}
			    });
});

//Delete an instance
app.delete('/', function (req, res) {

   console.log("HTTP DELETE Recebido");
   
   query = url.parse(req.url, true).query;
   console.log(query);

   var title = query.title; // título do filme
   var referencePath = '/Filmes/'+title+'/';
   var filmesReference = firebase.database().ref(referencePath);
   filmesReference.remove();
   res.send("Filme removido!");
});

var server = app.listen(8080, function () {
  
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);
});