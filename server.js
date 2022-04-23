const express = require("express")
const app = express();
const https=require('https')
var bodyParser = require("body-parser")
const ejs = require('ejs')
const port = 3000
app.set('view engine', 'ejs')
var path = require("path")
const {Router, response} = require("express");

app.use(bodyParser.urlencoded({extended: true}))

app.use("/", require("./routes/root"));
app.use("/blogs", require("./routes/blogs"));
app.use("/reviews", require("./routes/reviews"));
app.use("/categories", require("./routes/categories"));
app.use("/assets", express.static(__dirname+"/assets"));
app.use('/js',express.static(__dirname +'/js'));


app.get("/",((req, res) => {
    res.sendFile(__dirname+"index.html")
}))



app.post("/",((req, res) => {
    let cityName = req.body.city
    let key = "4df015897fa37bd9eced801f518cc5e7"
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key + "&units=metric&mode=json"
    https.get(url, function (response) {
        response.on('data', data=>{
            //console.log(data)
            let a = JSON.parse(data)
            let temp=a.main.temp
            let cond=a.weather[0].description
            res.send("weather in "+cityName+"is: "+cond+""+temp+" degrees above celcius")
    })
    })
   // res.send(response)
    }))


    app.listen(port, function (){
            console.log(`App listening at http://localhost:${port}`)
    })

