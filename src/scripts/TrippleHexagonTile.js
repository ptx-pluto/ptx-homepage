(function(){

    'use strict';

    PTX.TrippleHexagonTile = Class.create(PTX.HexagonTile, {

        initialize: function(options){
            var innerRatio = 0.9;

            this.tiles = options.tiles;
            this.isUp = options.isUp;
            this.grid = options.grid;
            this.$ = options.$container;
            this.edge = options.edge;
            this.edges = Math.ceil(this.edge*12);

            this.centerX = 2*this.edge * Math.cos(Math.PI/6);
            if (this.isUp) {
                this.centerY = 2*this.edge;
            }
            else {
                this.centerY = 1.5*this.edge;
            }

            this.$inner = this.$.polygon(getTripleHexagonArray(this.isUp, this.centerX, this.centerY, this.edge*innerRatio));

            this.$inner.attr({
                fill: 'none',
                stroke: 'red',
                'stroke-width': 5,
                'stroke-dashoffset': this.edges,
                'stroke-dasharray': this.edges,
                'stroke-linecap': 'square'
            });
        }

    });

    function getTripleHexagonArray(isUp, centerX, centerY, edge){
        var dist = edge * Math.cos(Math.PI/6);
        if (isUp) {
            return [
                centerX, centerY-2*edge,
                centerX+dist, centerY-1.5*edge,
                centerX+dist, centerY-0.5*edge,
                centerX+2*dist, centerY,
                centerX+2*dist, centerY+edge,
                centerX+dist, centerY+1.5*edge,
                centerX, centerY+edge,
                centerX-dist, centerY+1.5*edge,
                centerX-2*dist, centerY+edge,
                centerX-2*dist, centerY,
                centerX-dist, centerY-0.5*edge,
                centerX-dist, centerY-1.5*edge,
                centerX, centerY-2*edge,
            ];
        }
        else {
            return [
                centerX, centerY+2*edge,
                centerX+dist, centerY+1.5*edge,
                centerX+dist, centerY+0.5*edge,
                centerX+2*dist, centerY,
                centerX+2*dist, centerY-edge,
                centerX+dist, centerY-1.5*edge,
                centerX, centerY-edge,
                centerX-dist, centerY-1.5*edge,
                centerX-2*dist, centerY-edge,
                centerX-2*dist, centerY,
                centerX-dist, centerY+0.5*edge,
                centerX-dist, centerY+1.5*edge,
                centerX, centerY+2*edge,
            ];
        }
    }

}());