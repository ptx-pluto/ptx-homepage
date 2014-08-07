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
    };

    PTX.complexProduct = function(r1, i1, r2, i2) {
        var r = r1*r2 - i1*i2,
            i = r1*i2 + i1*r2;
        return [r,i];
    };

    PTX.complexSquare = function(r,i){
        return PTX.complexProduct(r,i,r,i);
    };

    PTX.complexModule = function(r,i){
        return Math.sqrt(r*r + i*i);
    };

    PTX.promiseReady = function(){
        return new Promise(function(resolve, reject){
            document.onreadystatechange = function(){
                if (document.readyState === 'complete') {
                    resolve();
                }
            };
        });
    };

    PTX.promiseImg = function(url){
        return new Promise(function(resolve, reject){
            var img = document.createElement('img');
            img.onload = function(){
                resolve(img, url);
            };
            img.src = url;
        });
    };

    PTX.promiseDelay = function(time){
        return new Promise(function(resolve, reject){
            _.delay(resolve, time);
        });
    };

}());