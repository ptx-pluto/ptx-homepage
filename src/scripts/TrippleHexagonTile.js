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

            if (this.isUp) {
                this.$inner = this.$.polygon(getTripleHexagonArray(this.isUp, this.centerX, this.centerY, this.edge*innerRatio));
            }
            else {
                this.$inner = this.$.polygon(getDownTrippleHexagonArray(this.centerX, this.centerY, this.edge, 0.9));
            }


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

    function getUpTrippleHexagonArray(centerX, centerY, edge, ratio){
        var dist = edge * Math.cos(Math.PI/6),
            e = edge * ratio,
            d = e * Math.cos(Math.PI/6);

        var x1 = centerX,
            y1 = centerY-edge,
            x2 = centerX-dist,
            y2 = centerY+edge/2,
            x3 = centerX+dist,
            y3 = centerY+edge/2;

        return [

        ];

    }

    function getDownTrippleHexagonArray(centerX, centerY, edge, ratio){
        var dist = edge * Math.cos(Math.PI/6),
            e = edge * ratio,
            d = e * Math.cos(Math.PI/6);

        var x1 = centerX-dist,
            y1 = centerY-edge/2,
            x2 = centerX+dist,
            y2 = centerY-edge/2,
            x3 = centerX,
            y3 = centerY+edge;

        return [
            x1, y1-e,
            x1+dist, centerY-e,
            x2, y2-e,
            x2+d, y2-e/2,
            x2+d, y2+e/2,
            x3+d, centerY+e/2,
            x3+d, y3+e/2,
            x3, y3+e,
            x3-d, y3+e/2,
            x3-d, centerY+e/2,
            x1-d, y1+e/2,
            x1-d, y1-e/2,
            x1, y1-e
        ];

    }


}());