var http = require('http');
var Twit = require('twit')
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

    var T = new Twit({
        consumer_key:'DKlnb0jfOm7XIcXsibEA',
        consumer_secret:'VqihxLm3uzNUrFHtSjgC5r0xxnSO9jRVNCTddkJjOE',
        access_token: '35589724-yHGfmtfEdpNIqsH4Il9n8dIw7t8YpSmew6ie2a8',
        access_token_secret: 'cIRa8yisaPOSG02BxdezNWR1VjCMGwiVLhhYdEt6P8'
    });

    T.get('search/tweets', { q: query, count: 100 }, function(err, reply) {
        if(err)
            res.send(500, JSON.stringify(err));
        else
            res.send(200, JSON.stringify(reply));
    })

};