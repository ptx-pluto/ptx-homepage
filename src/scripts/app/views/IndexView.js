'use strict';

var HexagonGridView = require('./HexagonGridView.js'),
    ContentTilesView = require('./ContentTilesView.js');

module.exports = Ember.ContainerView.extend({

    tagName: 'svg',

    classNames: [
        'hexagon-grid__container'
    ],

    childViews: ['grid'],

    grid: HexagonGridView.create()

    /*
    didInsertElement: function(){
        var handler = Snap(this.get('element'));

        var edge = this.get('grid.edge'),
            rows = this.get('grid.rows'),
            cols = this.get('grid.cols'),
            tileWidth = this.get('grid.tileWidth'),
            totalHeight = this.get('grid.totalHeight'),
            totalWidth = this.get('grid.totalWidth');

        console.log(totalHeight);

        handler.attr({
            x: 0,
            y: 0,
            height: totalHeight,
            width: totalWidth
        });

        var contents = ContentTilesView.create({
            content: this.get('controller')
        });
        this.set('contents', contents);
//        this.pushObject(contents);
    }

*/

});