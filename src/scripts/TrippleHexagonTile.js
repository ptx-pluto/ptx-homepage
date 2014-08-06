(function(){

    'use strict';

    PTX.TrippleHexagonTile = Class.create(PTX.HexagonTile, {

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

            this.imgUrl = 'http://classes.yale.edu/fractals/Vlinders.gif';

            this.$inner = this.$.polygon(getTripleHexagonArray(this.isUp, this.centerX, this.centerY, this.edge, this.innerRatio));

            this.$inner.attr({
                fill: 'none',
                stroke: 'red',
                'stroke-width': 5,
                'stroke-dashoffset': this.edges,
                'stroke-dasharray': this.edges,
                'stroke-linecap': 'square'
            });

        },

        promiseContent: function(){
            return PTX.promiseImg(this.imgUrl)
                .then(function(){
                    this.$img = this.$.image(this.imgUrl, 0, 0, 350, 350);
                    this.$frame = this.$.polygon(getTripleHexagonArray(this.isUp, this.centerX, this.centerY, this.edge, this.frameRatio));
                    this.$img.attr({
                        mask: this.$frame,
                        opacity: 0
                    });
                    this.$frame.attr({
                        fill: 'tomato'
                    });
                }.bind(this));
        },

        promiseAppear: function(){
            return this.promiseOutline()
                .then(this.promiseContent.bind(this))
                .then(function(){
                    return this.promiseAnimate(this.$img, { opacity: 1 }, 500);
                }.bind(this));
        }

    });

    function getTripleHexagonArray(isUp, centerX, centerY, edge, ratio){
        if (isUp) {
            return getUpTrippleHexagonArray(centerX, centerY, edge, ratio);
        }
        else {
            return getDownTrippleHexagonArray(centerX, centerY, edge, ratio);
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
            x1, y1-e,
            x1+d, y1-e/2,
            x1+d, centerY-e/2,
            x3+d, y3-e/2,
            x3+d, y3+e/2,
            x3, y3+e,
            centerX, centerY+e,
            x2, y2+e,
            x2-d, y2+e/2,
            x2-d, y2-e/2,
            centerX-d, centerY-e/2,
            x1-d, y1-e/2,
            x1, y1-e
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