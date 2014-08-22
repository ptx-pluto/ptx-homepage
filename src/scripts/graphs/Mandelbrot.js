var _ = require('underscore');

var VisualGraph = require('./VisualGraph.js'),
    utils = require('../utils.js');

module.exports = Class.create(VisualGraph, {

    initialize: function($super, options){

        var width = jQuery(window).width(),
            height = jQuery(window).height();

        _.defaults(options, {
            iterLimit: 200,
            scale: width/3,
            moduleLimit: 20,
            container: document.body,
            width: width,
            height: height,
            rowOrigin: Math.floor(height/2),
            colOrigin: Math.floor(width * 0.70),
            fps: 30
        });

        $super(options);

        this.ITER_LIMIT = options.iterLimit;
        this.MODULE_LIMIT = options.moduleLimit;
        this.SCALE = options.scale;
        this.ROW_ORIGIN = options.rowOrigin;
        this.COL_ORIGIN = options.colOrigin;
        this.FRAME_INTERVAL = Math.floor(1000/options.fps);

        var ctx = this.$canvas.getContext('2d');
        this.data = ctx.createImageData(this.width, this.height);
        this.buffer = this.data.data;
        this.plane = new Float32Array(this.width*this.height*2);
        this.pass = [];
        this.iteration = 0;

        var row, col, offset;
        for (col=0; col<this.width; col++) {
            for (row=0; row<this.height; row++) {
                offset = 4 * (row * this.width + col);
                this.pass[row*this.width+col] = false;
                this.buffer[offset] = this.buffer[offset+1] = this.buffer[offset+2] = this.buffer[offset+3] = 255;
            }
        }

        var _self = this, lastTime = 0;
        function render(){
            if (_self.iteration > _self.ITER_LIMIT) {
                console.log('iteration terminated');
                return;
            }
            var currentTime = new Date().getTime();
            var delta = currentTime-lastTime;
            if (lastTime === 0 || delta > _self.FRAME_INTERVAL) {
                lastTime = currentTime;
                _self.render();
            }
            requestAnimationFrame(render);
        }
        render();
    },

    render: function(){
        var col, row;
        for (col=0; col<this.width; col++) {
            for (row=0; row<this.height; row++) {
                if (!this.pass[row*this.width+col]) {
                    this.iterPoint(row,col);
                }
            }
        }
        var ctx = this.$canvas.getContext('2d');
        ctx.putImageData(this.data, 0,0);
        this.iteration++;
    },

    iterPoint: function(row, col) {
        var offset = 2*(row*this.width+col);
        var r = this.plane[offset], i = this.plane[offset+1];
        var result = utils.complexSquare(r,i);
        r = result[0] + (col-this.COL_ORIGIN)/this.SCALE;
        i = result[1] + (this.ROW_ORIGIN - row)/this.SCALE;
        this.plane[offset] = r;
        this.plane[offset+1] = i;
        if (utils.complexModule(r,i) > this.MODULE_LIMIT) {
            this.pass[row*this.width+col] = true;
            var color = utils.iterDiscreteColor(this.iteration);
            var bufferOffset = 4 * (row * this.width + col);
            this.buffer[bufferOffset] = color[0];
            this.buffer[bufferOffset+1] = color[1];
            this.buffer[bufferOffset+2] = color[2];
        }
    }

});