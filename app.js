const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const app = express();


app.use(bodyparser.urlencoded({extended:true}))

app.get("/", function (req, res) {
  res.sendFile(__dirname+"/index.html")
});

app.post("/", function(req, res){


  
const query = req.body.cityName;
const apiKey = "335ec707f10bd2617b67c9a3713b91a9";
const unit = "metric";
const url =
  "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
https.get(url, function (response) {
  response.on("data", function (data) {
    const weatherDetails = JSON.parse(data);
    const temp = weatherDetails.main.temp;
    const weatherdes = weatherDetails.weather[0].description;
    const icon = weatherDetails.weather[0].icon;

    const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    res.write("<p>The weather is currently " + weatherdes + "</p>");
    res.write(
      "<h1>The temperature in "+query+" is " + temp + " degree celcius</h1>"
    );
    res.write("<img src=" + imageUrl + ">");
    res.send();
  });
});
})




app.listen(3000, function () {
  console.log("server is running at port 3000");
});
