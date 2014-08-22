var _ = require('underscore');

var outlines = require('./outlines.js'),
    utils = require('../utils.js');

module.exports = Class.create({

    initialize: function(options){
        var innerRatio = 0.9;

        this.grid = options.grid;
        this.$line = options.$line;
        this.$ = options.$container;
        this.edge = options.edge;
        this.edges = Math.ceil(this.edge*6);
        this.centerX = this.edge * Math.cos(Math.PI/6);
        this.centerY = this.edge;

        this.$inner = this.$.polygon(outlines.getHexagonArray(this.centerX, this.centerY, this.edge*innerRatio));
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
            this.promiseAppear()
        ]).then(function(){
            this.$img = this.$.image(this.imgUrl, 0, 0, 350, 350);
            this.$frame = this.$.polygon(outlines.getHexagonArray(this.centerX, this.centerY, this.edge*0.8));
            this.$img.attr({
                'clip-path': this.$frame,
                opacity: 0
            });
            this.$frame.attr({
                fill: 'tomato'
            });
            return Promise.all([
                this.promiseAnimate(this.$img, { 'opacity': 1 }, 800),
                this.promiseAnimate(this.$inner, { 'fill': 'none' }, 800)
            ]);
        }.bind(this));
    },

    promiseAppear: function(delay){
        if (!this.promiseReady) {
            if (delay) {
                this.promiseReady = utils.promiseDelay(delay)
                    .then(this.promiseOutline.bind(this))
                    .then(this.promiseFill.bind(this));
            }
            else {
                this.promiseReady = this.promiseOutline().then(this.promiseFill.bind(this));
            }
        }
        return this.promiseReady;
    },

    promiseFade: function(){
        return this.promiseAnimate(this.$, { opacity: 0 }, 500);
    },

    promiseOutline: function(){
        return this.promiseAnimate(this.$inner, { 'stroke-dashoffset': 0 }, 900);
    },

    promiseFill: function(){
        return this.promiseAnimate(this.$inner, { 'fill': '#FF0526' }, 1000);
    },

    promiseBlink: function(){
        var _self = this;
        return this.promiseAnimate(_self.$, { 'opacity': 0 }, 200)
            .then(function(){
                return _self.promiseAnimate(_self.$, { 'opacity': 1 }, 200);
            });
    },

    promiseAnimate: function($el, attrs, duration){
        return new Promise(function(resolve, reject){
            $el.animate(attrs, duration, null, resolve);
        });
    }

});