'use strict';

var HexagonGridView = require('./views/HexagonGridView.js'),
    HexagonRowView = require('./views/HexagonRowView.js'),
    HexagonTileView = require('./views/HexagonTileView.js'),
    IndexView = require('./views/IndexView.js');

module.exports = function(App){

    App.HexagonGridView = HexagonGridView;
    App.HexagonRowView = HexagonRowView;
    App.HexagonTileView = HexagonTileView;
//    App.IndexView = IndexView;

};