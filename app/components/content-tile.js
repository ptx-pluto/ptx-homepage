import Ember from 'ember';
import _ from 'npm:underscore';
import ContentTileMixin from '../mixins/content-tile';
import outlines from '../utils/outlines';
import utils from '../utils/utils';

export default Ember.Component.extend(ContentTileMixin, {

    tagName: 'g',

    classNames: ['content-tile', 'isSingle'],

    grid: null, // required

    content: null, //required

    edge: Ember.computed.alias('grid.edge'),

    tiles: Ember.computed.alias('content.tiles'),

    image: Ember.computed.alias('content.image'),

    height: function(){
        return this.get('edge')*2;
    }.property('edge'),

    width: function(){
        return this.get('edge')*Math.sqrt(3);
    }.property('edge'),

    uuid: function(){
        return _.uniqueId('content-tile-');
    }.property(),

    clip1: function(){
        return 'url(#' + this.get('clip1id') + ')';
    }.property('clip1id'),

    clip1id: function(){
        return this.get('uuid') + '__clip1';
    }.property('uuid'),

    center: function(){

        var grid = this.get('grid'),
            tiles = this.get('tiles'),
            edge = this.get('edge'),
            tile = tiles[0],
            row = tile.row,
            col = tile.col,
            pos = grid.getTilePosition(row, col),
            x = pos[0], y = pos[1],
            deltaX = edge * Math.cos(Math.PI/6),
            deltaY = edge;

        return [ x+deltaX, y+deltaY ];

    }.property('content'),

    corner: function(){
        var grid = this.get('grid'),
            tiles = this.get('tiles'),
            tile = tiles[0],
            row = tile.row,
            col = tile.col,
            pos = grid.getTilePosition(row, col);
        return { x: pos[0], y: pos[1] };
    }.property('tiles'),

    getOutline: function(ratio){
        var edge = this.get('grid.edge'),
            center = this.get('center');
        return outlines.getHexagonPoints(center[0], center[1], edge*ratio);
    },

    outerPoints: function(){
        var RATIO = 0.95;
        return this.getOutline(RATIO);
    }.property('center', 'content'),


    innerPoints: function(){
        var RATIO = 0.85;
        return this.getOutline(RATIO);
    }.property('center', 'content'),

    hideOnInit: function(){
        Snap(this.get('element')).attr({ opacity: 0 });
    }.on('didInsertElement'),

    getReady: function(){

        var _self = this,
            tiles = this.get('tiles'),
            grid = this.get('grid');

        grid.promiseTilesReady(tiles)
            .then(function(ts){
                return Promise.all(ts.map(function(ti){
                    return utils.promiseSanpAnimate(Snap(ti.get('element')), { opacity: 0 }, 500, null);
                }));
            })
            .then(function(){
                return utils.promiseSanpAnimate(Snap(_self.get('element')), { opacity: 1 }, 500, null);
            }).then(function(){
                //console.log('animated');
            });

    }.on('init')

});
