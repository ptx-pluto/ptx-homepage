var _ = require('underscore');

var outlines = require('./outlines.js'),
    HexagonTile = require('./HexagonTile.js'),
    utils = require('../utils.js');

module.exports = Class.create(HexagonTile, {

    initialize: function(options){
        this.tiles = options.tiles;
        this.isUp = options.isUp;
        this.grid = options.grid;
        this.$ = options.$container;
        this.edge = options.edge;
        this.edges = Math.ceil(this.edge*12);
        this.frameRatio = 0.8;
        this.innerRatio = 0.9;

        this.centerX = 2*this.edge * Math.cos(Math.PI/6);
        if (this.isUp) {
            this.centerY = 2*this.edge;
        }
        else {
            this.centerY = 1.5*this.edge;
        }

        this.$inner = this.$.polygon(outlines.getTripleHexagonArray(this.isUp, this.centerX, this.centerY, this.edge, this.innerRatio));

        this.$inner.attr({
            fill: 'none',
            stroke: 'red',
            'stroke-width': 5,
            'stroke-dashoffset': this.edges,
            'stroke-dasharray': this.edges,
            'stroke-linecap': 'square'
        });

    },

    promiseContent: function(url){
        this.imgUrl = url;
        return Promise.all([
            utils.promiseImg(this.imgUrl),
            this.tiles[0].promiseAppear(),
            this.tiles[1].promiseAppear(),
            this.tiles[2].promiseAppear()
        ]).then(function(){
            return Promise.all(this.tiles.map(function(tile){
                return tile.promiseFade();
            }));
        }.bind(this))
            .then(this.promiseOutline.bind(this))
            .then(function(){
                this.$img = this.$.image(this.imgUrl, 0, 0, 350, 350);
                this.$frame = this.$.polygon(outlines.getTripleHexagonArray(this.isUp, this.centerX, this.centerY, this.edge, this.frameRatio));
                this.$img.attr({
                    'clip-path': this.$frame,
                    opacity: 0
                });
                this.$frame.attr({
                    fill: 'tomato'
                });
                return this.promiseAnimate(this.$img, { opacity: 1 }, 500);
            }.bind(this));
    },


    promiseOutline: function(){
        return this.promiseAnimate(this.$inner, { 'stroke-dashoffset': 0 }, 1000);
    },

    promiseAppear: function(){
        return this.promiseOutline()
            .then(this.promiseContent.bind(this))
            .then(function(){
                return this.promiseAnimate(this.$img, { opacity: 1 }, 500);
            }.bind(this));
    }

});