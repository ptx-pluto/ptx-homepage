var HexagonGrid = require('./hexagon-grid/HexagonGrid.js');
var Mandelbrot = require('./graphs/Mandelbrot.js');

window.Promise = Promise || RSVP.Promise;

jQuery(function(){
    //new Mandelbrot({});
    new HexagonGrid({});
});