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

    var asyncSum = function(timeout){
        var deferred = $.Deferred();

        if(timeout > 3){
            deferred.reject('larger than 3');
        }
        setTimeout(function(){
            deferred.resolve(timeout);
        }, 1000);

        return deferred.promise();
    };

    var asyncSumTest = function(){
        asyncSum(1)
            .then(function(result){
                return asyncSum(result + 1);
            })
            .then(function(result){
                return asyncSum(result + 1);
            })
            .done(function(result){
                alert('waited ' + result + ' times');
            })
            .fail(function(error){
                alert(error);
            });
    };

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

    asyncProgressTest();
});