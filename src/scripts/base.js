var HexagonGrid = require('./hexagon-grid/HexagonGrid.js');

window.Promise = Promise || RSVP.Promise;

jQuery(function(){
//    new PTX.Mandelbrot({});
    new HexagonGrid({});
});