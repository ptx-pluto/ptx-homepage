require('./libs');

window.Promise = Promise || RSVP.Promise;

var PTX = window.PTX = {};

require('./VisualGraph');
require('./Mandelbrot');
require('./*');

//PTX.promiseReady().then(function(){});

jQuery(function(){
//    new PTX.Mandelbrot({});
    new PTX.HexagonGrid({});
});