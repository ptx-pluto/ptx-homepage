'use strict';

var HexagonGridView = require('./HexagonGridView.js'),
    ContentTilesView = require('./ContentTilesView.js');

module.exports = Ember.ContainerView.extend({

    tagName: 'div',

    classNames: [
        'hexagon-grid__container'
    ],

    childViews: ['grid'],

    grid: HexagonGridView.create(),

    didInsertElement: function(){
        var contents = ContentTilesView.create({
            content: this.get('controller')
        });
        this.set('contents', contents);
        this.pushObject(contents);
    }

});