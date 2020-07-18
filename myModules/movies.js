
var mysql = require('mysql');
var url = require("url");


// knoing as the get movie function is public and don't required a authentification
exports.getAllMovies =  function(req,res){
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "mydb"
    });
    con.connect(async function(err) {
        if (err) throw err;
        await con.query("SELECT * FROM movies",  function (err, result, fields) {
          if (err) throw err;
          res.send(  { data:result , movie_count:result.length }  );
              con.end();
              res.end();  
        });
    });



}


exports.addComment = function(req,res){
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
  });

  var method = req.method;
  var headers = req.headers;

  if (method === "POST") {
    if (headers['content-type'] === "application/json") {
           if (headers['authorization'] !== null ) {

            let body = [];
            let requestBody = {};
            var token = headers['authorization'];

            

            req.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body).toString();
                try {
                    requestBody = JSON.parse(body);

                    var con = mysql.createConnection({
                      host: "localhost",
                      user: "root",
                      password: "",
                      database: "mydb"
                    });

                    con.connect(function(err) {
                      if (err) throw err;
                      var sql = "SELECT * FROM `users` WHERE token=?";
                      con.query(sql,[token], function (err, result) {
                        if (err) throw err;
                        
                        // result => id_user => add comment 

                        var con = mysql.createConnection({
                          host: "localhost",
                          user: "root",
                          password: "",
                          database: "mydb"
                        });
    
                        con.connect(function(err) {
                          if (err) throw err;
                          var sql = "INSERT INTO `comments`(`id_commenter`, `text`, `id_movie`) VALUES (?,?,?)";
                          con.query(sql,[result[0].id_user,requestBody.comment,requestBody.id_movie], function (err, result) {
                            if (err) throw err;
                            
                            res.send({success:true})
                            
    
                          })
    
                        });


                      })

                    });



                    
                } catch (err) {

                }

            });
           } else {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ code: 403, message: "Access denied.", success: false }));
            res.end();
           }

        }else{
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ code: 403, message: "Access denied.", success: false }));
            res.end();
        }
    }else{
        res.writeHead(403, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ code: 403, message: "Access denied.", success: false }));
        res.end();
    }


}


exports.getMovieDetails = function(req,res){
  var q = url.parse(req.url, true);
  var qdata = q.query; 
  var idMovie = qdata.id;

  
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM movies WHERE id=?",[idMovie], function (err, resultMovie, fields) {
    
   

    if( resultMovie.length === 1 ){
      // get the comments
      

      
      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"
      });

      con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM `comments`,`users` WHERE comments.id_commenter=users.id_user AND `id_movie`=?", [idMovie] ,function (err, resultComments, fields) {
          if (err) throw err;
         
          res.send({
            data:resultMovie[0],
            comment:resultComments
          });


        });
      });

    }



  });
});

  


}