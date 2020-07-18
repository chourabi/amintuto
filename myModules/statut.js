var mongo = require('mongodb');
var mysql = require('mysql');
var url = require("url");


exports.addStatut = function(req,bigres){


    /******************************************************************************************* */

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"
      });
    
      var method = req.method;
      var headers = req.headers;

      console.log(method);
    
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
                          con.query(sql,[token], function (err, resultUser) {
                            if (err) throw err;
                            
                            if (resultUser.length === 1) {
                                // add commetn in mongo db 

                                var MongoClient = require('mongodb').MongoClient;
                                var url = "mongodb://localhost:27017/";
                                
                                MongoClient.connect(url, function(err, db) {
                                  if (err) throw err;
                                  var dbo = db.db("movies");
                                  var statut = { title:requestBody.statut, add_date: new Date(), user:resultUser[0]  };
                            
                                  dbo.collection("statuts").insertOne(statut, function(err, res) {
                                    if (err) throw err;
                                    console.log("1 statut inserted");
                                    db.close();
                                    bigres.send({success:true});
                                  });
                                });
                            



                                
                            } else {
                                bigres.writeHead(403, { 'Content-Type': 'application/json' });
                                bigres.write(JSON.stringify({ code: 403, message: "Invalid user.", success: false }));
                                bigres.end();
                                
                            }

                          })
    
                        });
    
    
    
                        
                    } catch (err) {
    
                    }
    
                });
               } else {
                bigres.writeHead(403, { 'Content-Type': 'application/json' });
                bigres.write(JSON.stringify({ code: 403, message: "Access denied. 1", success: false }));
                bigres.end();
               }
    
            }else{
                bigres.writeHead(403, { 'Content-Type': 'application/json' });
                bigres.write(JSON.stringify({ code: 403, message: "Access denied. 2", success: false }));
                bigres.end();
            }
        }else{
            bigres.writeHead(403, { 'Content-Type': 'application/json' });
            bigres.write(JSON.stringify({ code: 403, message: "Access denied. 3", success: false }));
            bigres.end();
        }



}





exports.deleteStatus = function(req,bigres){


    /******************************************************************************************* */

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"
      });
    
      var method = req.method;
      var headers = req.headers;

      console.log(method);
    
      if (method === "DELETE") {
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

                        console.log(requestBody);
    

                        var con = mysql.createConnection({
                            host: "localhost",
                            user: "root",
                            password: "",
                            database: "mydb"
                          });
      
                          con.connect(function(err) {
                            if (err) throw err;
                            var sql = "SELECT * FROM `users` WHERE token=?";
                            con.query(sql,[token], function (err, resultUser) {
                              if (err) throw err;
                              
                              if (resultUser.length === 1) {
                                  // add commetn in mongo db 
                                  var MongoClient = require('mongodb').MongoClient;
                                  var url = "mongodb://localhost:27017/";
                                  var documentID = requestBody.id;

                                  MongoClient.connect(url, function(err, db) {
                                    if (err) throw err;
                                    var dbo = db.db("movies");
                                    var myquery = { _id : mongo.ObjectId(documentID) }
                                    dbo.collection("statuts").deleteOne(myquery, function(err, obj) {
                                      if (err) throw err;
                                      console.log("1 document deleted");
                                      db.close();
                                    });
                                  });




                                 bigres.end();
                              
  
  
  
                                  
                              } else {
                                  bigres.writeHead(403, { 'Content-Type': 'application/json' });
                                  bigres.write(JSON.stringify({ code: 403, message: "Invalid user.", success: false }));
                                  bigres.end();
                                  
                              }
  
                            })
      
                          });
                       
    
    
    
                        
                    } catch (err) {
    
                    }
    
                });
               } else {
                bigres.writeHead(403, { 'Content-Type': 'application/json' });
                bigres.write(JSON.stringify({ code: 403, message: "Access denied. 1", success: false }));
                bigres.end();
               }
    
            }else{
                bigres.writeHead(403, { 'Content-Type': 'application/json' });
                bigres.write(JSON.stringify({ code: 403, message: "Access denied. 2", success: false }));
                bigres.end();
            }
        }else{
            bigres.writeHead(403, { 'Content-Type': 'application/json' });
            bigres.write(JSON.stringify({ code: 403, message: "Access denied. 3", success: false }));
            bigres.end();
        }



}




exports.updateStatus = function(req,bigres){

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"
      });
    
      var method = req.method;
      var headers = req.headers;

      console.log(method);
    
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

                        console.log(requestBody);
    

                        var con = mysql.createConnection({
                            host: "localhost",
                            user: "root",
                            password: "",
                            database: "mydb"
                          });
      
                          con.connect(function(err) {
                            if (err) throw err;
                            var sql = "SELECT * FROM `users` WHERE token=?";
                            con.query(sql,[token], function (err, resultUser) {
                              if (err) throw err;
                              
                              if (resultUser.length === 1) {
                                  // add commetn in mongo db 
                                  var MongoClient = require('mongodb').MongoClient;
                                  var url = "mongodb://localhost:27017/";
                                  var documentID = requestBody.id;

                                  MongoClient.connect(url, function(err, db) {
                                    if (err) throw err;
                                    var dbo = db.db("movies");
                                    var myquery = { _id : mongo.ObjectId(documentID) }
                                    var newvalues = { $set: {name: "Mickey", title: requestBody.statut } };
                                    dbo.collection("statuts").updateOne(myquery,newvalues ,function(err, obj) {
                                      if (err) throw err;
                                      console.log("1 document updated");
                                      db.close();
                                    });
                                  });




                                 bigres.end();
                              
  
  
  
                                  
                              } else {
                                  bigres.writeHead(403, { 'Content-Type': 'application/json' });
                                  bigres.write(JSON.stringify({ code: 403, message: "Invalid user.", success: false }));
                                  bigres.end();
                                  
                              }
  
                            })
      
                          });
                       
    
    
    
                        
                    } catch (err) {
    
                    }
    
                });
               } else {
                bigres.writeHead(403, { 'Content-Type': 'application/json' });
                bigres.write(JSON.stringify({ code: 403, message: "Access denied. 1", success: false }));
                bigres.end();
               }
    
            }else{
                bigres.writeHead(403, { 'Content-Type': 'application/json' });
                bigres.write(JSON.stringify({ code: 403, message: "Access denied. 2", success: false }));
                bigres.end();
            }
        }else{
            bigres.writeHead(403, { 'Content-Type': 'application/json' });
            bigres.write(JSON.stringify({ code: 403, message: "Access denied. 3", success: false }));
            bigres.end();
        }

}





exports.getAllStatus = function(req,res){
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb"
      });
    
      var method = req.method;
      var headers = req.headers;

      console.log(method);
    
      if (method === "GET") {
        if (headers['content-type'] === "application/json") {
               if (headers['authorization'] !== null ) {

                var token = headers['authorization'];
    
                  
    
                        var con = mysql.createConnection({
                          host: "localhost",
                          user: "root",
                          password: "",
                          database: "mydb"
                        });
    
                        con.connect(function(err) {
                          if (err) throw err;
                          var sql = "SELECT * FROM `users` WHERE token=?";
                          con.query(sql,[token], function (err, resultUser) {
                            if (err) throw err;
                            
                            if (resultUser.length === 1) {
                                // add commetn in mongo db 

                                var MongoClient = require('mongodb').MongoClient;
                                var url = "mongodb://localhost:27017/";
                                
                                MongoClient.connect(url, function(err, db) {
                                  if (err) throw err;
                                  var dbo = db.db("movies");
                                  dbo.collection("statuts").find({ }).sort({add_date:-1}) .toArray(function(err, result) {
                                    if (err) throw err;
                                    console.log(result);
                                     res.send(result);
                                  });
                                });
                            



                                
                            } else {
                                res.writeHead(403, { 'Content-Type': 'application/json' });
                                res.write(JSON.stringify({ code: 403, message: "Invalid user.", success: false }));
                                res.end();
                                
                            }

                          })
    
                        });
    
    
    
                
               } else {
                res.writeHead(403, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify({ code: 403, message: "Access denied. 1", success: false }));
                res.end();
               }
    
            }else{
                res.writeHead(403, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify({ code: 403, message: "Access denied. 2", success: false }));
                res.end();
            }
        }else{
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ code: 403, message: "Access denied. 3", success: false }));
            res.end();
        }





}