/**
 * Created with JetBrains WebStorm.
 * User: brenoferreira
 * Date: 5/18/13
 * Time: 9:09 PM
 * To change this template use File | Settings | File Templates.
 */

$(function(){
    var asyncOp = function(){
        var deferred = $.Deferred();

        setTimeout(function(){
            deferred.resolve('done');
        }, 1000);

        return deferred.promise();
    };

    var asyncOpTest = function(){
        asyncOp()
            .done(function(result){
                alert(result);
            })
            .fail(function(error){
                alert(error);
            });
    };

    var loadTwitter = function(){
        var deferred = $.Deferred();

        setTimeout(function(){
            deferred.resolve('twitter');
        }, 1000);

        return deferred.promise();
    }

    var loadFacebook = function(){
        var deferred = $.Deferred();

        setTimeout(function(){
            deferred.resolve('facebook');
        }, 1000);

        return deferred.promise();
    }

    var loadInstagram = function(){
        var deferred = $.Deferred();

        setTimeout(function(){
            deferred.resolve('instagram');
        }, 1000);

        return deferred.promise();
    }

    var chaining = function(){
        loadTwitter()
            .then(function(twitter){
                console.log(twitter);
                return loadFacebook();
            })
            .then(function(facebook){
                console.log(facebook);
                return loadInstagram();
            })
            .then(function(instagram){
                console.log(instagram);
            })
            .fail(function(error){
                alert('error');
            })
            .done(function(){
                alert('completed');
            })
    }

    var asyncProgress = function(){
        var deferred = $.Deferred();

        var i = 0;
        setInterval(function(){
            i += 10;
            deferred.notify(i);
            if(i == 100)
                deferred.resolve(i);
        }, 300);

        return deferred.promise();
    }

    var asyncProgressTest = function(){
        asyncProgress()
            .progress(function(progress){
                $('.bar').css('width', progress + '%');
            })
            .done(function(){
                $('.bar').addClass('bar-success');
            });
    }

    var loadScripts = function(){
        var d3 = $.getScript('/javascripts/dummies/dummy3.js');
        var d2 = $.getScript('/javascripts/dummies/dummy2.js');
        var d1 = $.getScript('/javascripts/dummies/dummy1.js');

        $.when(d1, d2, d3)
            .done(function(dummy1, dummy2, dummy3){
                alert('scripts loaded');
            });
    };

    var twitter = function(query){
        return $.get('/twitter?q=' + query);
    };

    var twitterTest = function(){
        $('form').submit(function(e){
            e.preventDefault();

            $('.btn').attr('disabled','disabled');

            var encodedQuery = encodeURIComponent($('#searchTxt').val());
            twitter(encodedQuery)
                .then(function(results){
                    return JSON.parse(results).results;
                })
                .then(function(tweets){
                    tweets.forEach(function(tweet){
                        $('#results').append('<p>' + tweet.text + '</p>');
                    });
                })
                .done(function(){
                    $('.btn').removeAttr('disabled');
                })
                .fail(function(error){
                    $('#results').html('<div class="alert alert-error">Houve um erro ao carregar os dados</div>')
                });
        });
    }

    chaining();
});