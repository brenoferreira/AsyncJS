
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