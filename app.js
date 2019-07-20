const express = require("express");
var port = process.env.PORT || 3000;
const app = express();
const bodyParser = require("body-parser");
const axios = require('axios');
var nasaIds = [];

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render('home');

});

app.post('/search', function(req, res){
    var query = req.body.search;
    axios.get('https://images-api.nasa.gov/search?q=' + query)
    .then(function(response){
        var data = response.data.collection.items;
        res.render('results', {results: data, query: query, id: nasaIds});
    })
    .catch(function (err) {
        console.log(err);
    });
});

app.get('/search/:id', function(req, res){
    axios.get('https://images-api.nasa.gov/search?q=' + req.params.id)
    .then(function(response){
        var data = response.data.collection.items;
        axios.get('https://images-api.nasa.gov/asset/' + req.params.id)
        .then(function(imgData){
            var imgUrl = imgData.data.collection.items[0];
            res.render('show', {item: data, url: imgUrl});
        })
        .catch(function(error){
            console.log('Error with image data: ' + error);
        });
    })
    .catch(function(err){
        console.log('Error with meta data: ' + err);
    });
});

app.get('/daily', function(req, res) {
    axios.get('https://api.nasa.gov/planetary/apod?api_key=D2Ch46PGEv2WMJB5fUSXceBZWjmVJB5GqT2leg8E')
    .then(function(response){
        var image = response.data;
        res.render('daily', {image: image});
    })
    .catch(function(err){
        console.log(err);
    });
});

app.listen(port, function(){
    console.log('Starfindr server started on ' + port);
})
