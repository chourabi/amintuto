
var mysql = require('mysql');
const TokenGenerator = require('uuid-token-generator');
 



exports.createUser = function(req,res){
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
                let body = [];
                let requestBody = {};
    
                req.on('data', (chunk) => {
                    body.push(chunk);
                }).on('end', () => {
                    body = Buffer.concat(body).toString();
                    try {
                        requestBody = JSON.parse(body);
                        console.log(requestBody);

                        con.connect(function(err) {
                            if (err) throw err;
                            var sql = "INSERT INTO `users`(`user_name`, `email`, `password`, `avatar`) VALUES (?,?,?,?)";
                            con.query(sql,[requestBody.username,requestBody.email,requestBody.password,requestBody.avatar], function (err, result) {
                              if (err) throw err;
                              res.end();
                            });
                          });

                    } catch (err) {
    
                    }

                    
                   
    



                });

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



exports.auth = function(req,res){
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
                let body = [];
                let requestBody = {};
    
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
                            var sql = "SELECT * FROM `users` WHERE email=? AND password=?";
                            con.query(sql,[requestBody.email,requestBody.password], function (err, result) {
                              if (err) throw err;
                                if (result.length === 1) {
                                    // update user , set token = chag3iba
                                    const tokgen2 = new TokenGenerator(256, TokenGenerator.BASE62);
                                    var token =tokgen2.generate();
                                    var con = mysql.createConnection({
                                        host: "localhost",
                                        user: "root",
                                        password: "",
                                        database: "mydb"
                                      });
                                      con.connect(function(err) {
                                        if (err) throw err;
                                        var sql = "UPDATE `users` SET `token`=? WHERE email=?";
                                        con.query(sql,[token,requestBody.email], function (err, result) {
                                          if (err) throw err;
                                          //connected
                                          res.send({success:true,token:token})
                                          
                                        });
                                      });


                                    
                                }else{
                                    
                                }

                              
                            });
                          });

                    } catch (err) {
    
                    }

                    
                   
    



                });

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
