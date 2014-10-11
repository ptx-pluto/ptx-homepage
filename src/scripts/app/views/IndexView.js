'use strict';

var HexagonGridView = require('./HexagonGridView.js');
//var ContentTileView = require('./ContentTileView.js');

module.exports = Ember.ContainerView.extend({

    tagName: 'svg',

    childViews: ['grid'],

    grid: HexagonGridView.create()

/*
    didInsertElement: function(){
        var contents = Ember.CollectionView.extend({
            itemViewClass: ContentTileView
        }).create({
            content: this.get('controllers')
        });
        this.set('contents', contents);
    }
*/

});