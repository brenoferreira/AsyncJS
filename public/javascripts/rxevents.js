/**
 * Created with JetBrains WebStorm.
 * User: brenoferreira
 * Date: 5/18/13
 * Time: 9:09 PM
 * To change this template use File | Settings | File Templates.
 */

$(function(){

    function churrasco() {
        var carnes = ['picanha', 'frango', 'coracao', 'linguica'];
        var cozinha = function () {
            var i = Math.ceil((Math.random() * 10 % 4) - 1);
            return carnes[i];
        };

        var garcom = Rx.Observable
            .interval(300)
            .map(function (i) {
                return cozinha();
            });
        var eu = garcom
            .where(function (carne) {
                return carne == 'picanha'
            })
            .sample(1000)
            .take(10);
        var observer = Rx.Observer.create(
            function (carne) { //onNext
                $('#churrasco').append('<p>' + carne + '</p>');
            },
            function (erro) { //onError
            },
            function () { //onCompleted
                $('#churrasco').append('<p>Passando mal!</p>');
            });
        var quantidadePicanha = eu.count(function (carne) {
            console.log(carne);
            return carne === 'picanha';
        });
        quantidadePicanha.subscribe(function (resultado) {
            $('#churrasco').append('<p>Comeu picanha ' + resultado + ' vezes</p>');
        });
        eu.subscribe(observer);
    }
    //churrasco();

    function desenho(){

        var Observable = Rx.Observable;

        Observable.fromEvent = function(element, event) {
            return Observable.create(function(observer){
                if(element){
                    element.addEventListener(event, function(e){
                        observer.onNext(e);
                    });

                    return function(){};
                }
                else{
                    observer.onError('Element ' + selector + ' does not exist');
                    return function(){};
                }
            });
        };


        var canvas = document.getElementById('canvas')

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        surface = canvas.getContext('2d');
        surface.lineWidth = 5;
        surface.strokeStyle = '#0000ff';

        var mouseDown = Rx.Observable
            .fromEvent(canvas, 'mousedown')
            .map(function(e){
                return getInputCoordinates(e);
            });

        var mouseMove = Rx.Observable
            .fromEvent(canvas, 'mousemove')
            .map(function(e){
                return getInputCoordinates(e);
            });

        var mouseUp = Rx.Observable.fromEvent(canvas, 'mouseup');

        var drawing = mouseMove
            .skipUntil(mouseDown)
            .takeUntil(mouseUp)
            .repeat();

        mouseDown.subscribe(function(c){
            surface.beginPath();
            surface.moveTo(c.x, c.y);
        });

        drawing.subscribe(function(c){
            surface.lineTo(c.x, c.y);
            surface.stroke();
        });

        function getInputCoordinates(e){
            return {
                x: e.clientX,
                y: e.clientY
            };
        }
    };
    desenho();
});