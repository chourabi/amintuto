var mysql = require('mysql');
var movie = require("./myModules/movies");
var user = require("./myModules/users");
var statut = require("./myModules/statut");

const express = require('express')
const app = express()



app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});



app.get('/listmovies',  function (req, res) {
  movie.getAllMovies(req,res);
})


app.post('/users/add',function(req,res){
  user.createUser(req,res);
})


app.post('/users/auth',function(req,res){
  user.auth(req,res);
})


app.post('/comment/add',function(req,res){
  movie.addComment(req,res);
});


app.get('/movie/details',function(req,res){

  movie.getMovieDetails(req,res);

});

app.get('/statut/list',function(req,res){

  statut.getAllStatus(req,res);

});


app.post('/statut/add',function(req,res){

  statut.addStatut(req,res);

});


app.delete('/statut/delete',function(req,res){

  statut.deleteStatus(req,res);

});


app.post('/statut/update',function(req,res){

  statut.updateStatus(req,res);

});













app.listen(3500)