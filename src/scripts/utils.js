var _ = require('underscore');

module.exports.iterDiscreteColor = iterDiscreteColor;
module.exports.complexProduct = complexProduct;
module.exports.complexSquare = complexSquare;
module.exports.complexModule = complexModule;
module.exports.promiseReady = promiseReady;
module.exports.promiseImg = promiseImg;
module.exports.promiseDelay = promiseDelay;


/**
 * @param {number} iteration
 * @return {number[]} -- rgba
 */
function iterDiscreteColor(iteration){
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

function complexProduct(r1, i1, r2, i2) {
    var r = r1*r2 - i1*i2,
        i = r1*i2 + i1*r2;
    return [r,i];
}

function complexSquare(r,i){
    return complexProduct(r,i,r,i);
}

function complexModule(r,i){
    return Math.sqrt(r*r + i*i);
}

function promiseReady(){
    return new Promise(function(resolve, reject){
        document.onreadystatechange = function(){
            if (document.readyState === 'complete') {
                resolve();
            }
        };
    });
}

function promiseImg(url){
    return new Promise(function(resolve, reject){
        var img = document.createElement('img');
        img.onload = function(){
            resolve(img, url);
        };
        img.src = url;
    });
}

function promiseDelay(time){
    return new Promise(function(resolve, reject){
        _.delay(resolve, time);
    });
}