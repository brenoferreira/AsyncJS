var http = require('http');
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.jquery = function(req, res){
    res.render('jquery', { title: '$.Deferred' });
};

exports.rx = function(req, res){
    res.render('rx', { title: 'Rx.JS' });
};

exports.twitter = function(req, res){
    var query = req.query.q;

    var options = {
        host: 'search.twitter.com',
        port: 80,
        path: '/search.json?q=' + query
    };
    var result = "";

    http.get(options, function(response){
        response.on('data', function(data){
            result += data;
        });

        response.on('error', function(error){
            res.send(500, 'error');
        });

        response.on('end', function(){
            res.json(result);
        });
    });
};