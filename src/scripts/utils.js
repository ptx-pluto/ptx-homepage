(function(){
    'use strict';

    /**
     * @param {number} iteration
     * @return {number[]} -- rgba
     */
    PTX.iterDiscreteColor = function(iteration){
        var INTERVAL = 50;
        var CYCLE = INTERVAL*3;
        iteration = iteration % CYCLE;
        var octave = Math.floor(iteration/INTERVAL),
            offset = iteration % INTERVAL;
        var result = [0,0,0,255],
            colorOffset = (255/INTERVAL)*offset,
            increase = octave,
            decrease = (octave - 1) % 3;
        result[increase] = colorOffset;
        result[decrease] = 255-colorOffset;
        return result;
    }

}());