/**
 * Created with JetBrains WebStorm.
 * User: brenoferreira
 * Date: 5/18/13
 * Time: 9:09 PM
 * To change this template use File | Settings | File Templates.
 */

$(function(){
    var asyncOp = function(){
        var future = $.Deferred();

        setTimeout(function(){
            future.resolve('done');
        }, 1000);

        return future.promise();
    }

    asyncOp()
        .done(function(result){
           alert(result);
        })
        .fail(function(error){
            alert(error);
        });

    
});