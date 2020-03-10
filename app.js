const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  //You have to replace the "usX" with the "us number" at the end of your API Key.
  //Add Audience ID 
  const url = "https://us19.api.mailchimp.com/3.0/lists/";
  const options = {
    method: "POST",
    auth: //"ADD ANY USER NAME: ADD YOUR MAILCHIMP API KEY"
  };
  const request = https.request(url, options, function(response) {
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});
app.listen(3000, function() {
  console.log("Our port Server is running on port 3000");
});


