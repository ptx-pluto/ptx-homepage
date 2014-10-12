'use strict';

var HexagonGridView = require('./HexagonGridView.js'),
    ContentTileView = require('./ContentTileView.js');

module.exports = Ember.ContainerView.extend({

    tagName: 'svg',

    childViews: ['grid'],

    grid: HexagonGridView.create(),

    didInsertElement: function(){
        var contents = Ember.CollectionView.extend({
            itemViewClass: ContentTileView,
            tagName: 'svg'
        }).create({
            content: this.get('controller')
        });
        this.set('contents', contents);
        this.pushObject(contents);
    }

});