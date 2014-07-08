require('./libs');

var PTX = window.PTX = {};

require('./VisualGraph');
require('./Mandelbrot');
require('./*');

PTX.promiseReady().then(function(){
    var g = new PTX.Mandelbrot({});
});
