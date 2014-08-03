(function(){

    'use strict';

    PTX.HexagonTile = Class.create({

        initialize: function(options){
            var innerRatio = 0.9;

            this.grid = options.grid;
            this.$line = options.$line;
            this.$ = options.$container;
            this.edge = options.edge;
            this.edges = Math.ceil(this.edge*6);

            this.centerX = this.edge * Math.cos(Math.PI/6);
            this.centerY = this.edge;

            this.$inner = this.$.polygon(getHexagonArray(this.centerX, this.centerY, this.edge*innerRatio));

            this.$inner.attr({
                fill: 'none',
                stroke: 'red',
                'stroke-width': 5,
                'stroke-dashoffset': this.edges,
                'stroke-dasharray': this.edges,
                'stroke-linecap': 'square'
            });
        },

        promiseAppear: function(){
            return this.promiseOutline()
                .then(this.promiseFill.bind(this));
        },

        promiseFade: function(){
            return this.promiseAnimate(this.$, { opacity: 0 }, 500);
        },

        promiseOutline: function(){
            return this.promiseAnimate(this.$inner, { 'stroke-dashoffset': 0 }, 1200);
        },

        promiseFill: function(){
            return this.promiseAnimate(this.$inner, { 'fill': '#FF0526' }, 500);
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

    function getHexagonArray(centerX, centerY, edge){
        var dist = edge * Math.cos(Math.PI/6);
        return [
            centerX, centerY-edge,
            centerX+dist, centerY-edge/2,
            centerX+dist, centerY+edge/2,
            centerX, centerY+edge,
            centerX-dist, centerY+edge/2,
            centerX-dist, centerY-edge/2,
            centerX, centerY-edge
        ];
    }

    PTX.getHexagonArray = getHexagonArray;

}());