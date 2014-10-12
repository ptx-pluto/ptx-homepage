'use strict';

var _ = require('underscore');

var SnapSvgMixin = require('./SnapSvgMixin.js'),
    settings = require('../settings.js'),
    TILE_OUTLINE_DURATION = settings.TILE_OUTLINE_DURATION,
    outlines = require('../../hexagon-grid/outlines.js'),
    utils = require('../../utils.js');

module.exports = Ember.View.extend(SnapSvgMixin, {

    tagName: 'svg',

    classNames: [
        'hexagon-grid__tile'
    ],

    isReady: false,

    grid: Ember.computed.alias('parentView.parentView'),

    line: Ember.computed.alias('parentView'),

    row: Ember.computed.alias('parentView.row'),

    col: Ember.computed.alias('content'),

    edge: Ember.computed.alias('parentView.edge'),

    edges: function(){
        return Math.ceil(this.get('edge')*6);
    }.property('edge'),

    centerX: function(){
        return this.get('edge') * Math.cos(Math.PI/6);
    }.property('edge'),

    centerY: Ember.computed.alias('edge'),

    didInsertElement: function(){
        var handler = Snap(this.get('element'));
        this.set('$snap', handler);

        var innerRatio = 0.9;
        var edge = this.get('edge'),
            edges = this.get('edges'),
            centerX = this.get('centerX'),
            centerY = this.get('centerY'),
            col = this.get('col'),
            tileWidth = 2 * edge * Math.cos(Math.PI/6);

        handler.attr({
            x: col * tileWidth
        });

        var $inner = handler.polygon(outlines.getHexagonArray(centerX, centerY, edge*innerRatio));
        $inner.attr({
            fill: 'none',
            stroke: 'red',
            'stroke-width': 5,
            'stroke-dashoffset': edges,
            'stroke-dasharray': edges,
            'stroke-linecap': 'square'
        });
        this.set('$inner', $inner);
    },

    readyCallback: function(callback){
        this.readyQueue = this.readyQueue || [];
        this.readyQueue.push(callback);
    },

    promiseReady: function(){
        if (this.get('isReady')) {
            return Promise.resolve();
        }
        var _self = this;
        if (!this.readyPromise) {
            this.readyPromise = new Promise(function(resolve, reject){
                _self.readyCallback = function(){
                    resolve();
                }
            });
        }
        return this.readyPromise;
    },

    promiseAppear: function(delay){
        if (this.appearPromise) {
            return this.appearPromise;
        }
        this.appearPromise = Promise
            .resolve()
            .then(function(){
                if (delay) {
                    return utils.promiseDelay(delay);
                }
            })
            .then(this.promiseOutline.bind(this))
            .then(this.promiseFill.bind(this))
            .then(function(){
                this.set('isReady', true);
                if (_.isFunction(this.readyCallback)) {
                    this.readyCallback();
                }
            }.bind(this));
        return this.appearPromise;
    },


    promiseOutline: function(){
        var $inner = this.get('$inner');
        return this.promiseAnimate($inner, { 'stroke-dashoffset': 0 }, TILE_OUTLINE_DURATION);
    },

    promiseFill: function(){
        var $inner = this.get('$inner');
        return this.promiseAnimate($inner, { 'fill': '#FF0526' }, 500);
    }

});