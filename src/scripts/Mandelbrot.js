(function(){
    'use strict';

    PTX.Mandelbrot = Class.create(PTX.VisualGraph, {

        initialize: function($super, options){
            $super(options);
            var ctx = this.$canvas.getContext('2d');
            this.data = ctx.createImageData(this.width, this.height);
            //this.plane = new Float32Array(this.width*this.height);
            this.iteration = 0;
            this.render();
        },

        render: function(){
            var col, row, color, offset, buffer = this.data.data;
            for (col=0; col<this.width; col++) {
                color = PTX.iterDiscreteColor(col);
                for (row=0; row<this.height; row++) {
                    offset = 4 * (row*this.width+col);
                    buffer[offset] = color[0];
                    buffer[offset+1] = color[1];
                    buffer[offset+2] = color[2];
                    buffer[offset+3] = color[3];
                }
            }
            var ctx = this.$canvas.getContext('2d');
            ctx.putImageData(this.data, 0,0);
        }

    });

})();