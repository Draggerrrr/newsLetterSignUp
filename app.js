const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/" , function( req, res){
   const fname =  req.body.firstname;
   const lname = req.body.lastname;
   const email =  req.body.email;

   const data = {
    members : [
        {
            email_address : email,
            status : "subscribed",
            merge_fields :{
            FNAME : fname,
            LNAME : lname
            }
        }
            ]
    };

   const jsonData = JSON.stringify(data);

   const url = "https://us21.api.mailchimp.com/3.0/lists/55d0e57beb";

   const options = {
     method : 'POST',
     auth : "sushil123:6ebb4bfb2326c874258ef70ba89e79da-us21"
   }

   const request = https.request(url, options , function(response) {

     if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
     }else{
        res.sendFile(__dirname + "/failure.html");
     }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
   })



   request.write(jsonData);
   request.end();
})


app.post("/failure", function(req, res){
    res.redirect("/");
})


app.listen( process.env.PORT || 3000);

// Mail Chimp 
//    6ebb4bfb2326c874258ef70ba89e79da-us21

//Audience Id
// 55d0e57beb