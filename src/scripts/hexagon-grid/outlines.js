'use strict';

module.exports.getHexagonArray = function(centerX, centerY, edge){
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
    /*
     return [
     centerX, centerY-edge,
     centerX-dist, centerY-edge/2,
     centerX-dist, centerY+edge/2,
     centerX, centerY+edge,
     centerX+dist, centerY+edge/2,
     centerX+dist, centerY-edge/2,
     centerX, centerY-edge
     ];
     */
};


module.exports.getTripleHexagonArray = function(isUp, centerX, centerY, edge, ratio){
    if (isUp) {
        return getUpTrippleHexagonArray(centerX, centerY, edge, ratio);
    }
    else {
        return getDownTrippleHexagonArray(centerX, centerY, edge, ratio);
    }
};

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


/**
 *
 * @param tiles
 * @param grid
 * @returns {{isUp: Boolean, position}}
 */
module.exports.getTrippleTileConfig = function(tiles, grid){
    var offsets, isUp;
    if (tiles[0].row === tiles[1].row) {
        arrangeTiles(tiles, 0, 1, 2);
    }
    else if (tiles[1].row === tiles[2].row) {
        arrangeTiles(tiles, 1, 2, 0);
    }
    else if (tiles[0].row === tiles[2].row) {
        arrangeTiles(tiles, 0, 2, 1);
    }
    else {
        throw 'tiles does not form tripple tile';
    }
    isUp = getOrientation(tiles);
    if (isUp) {
        offsets = [
            grid.getTilePosition(tiles[0].row, tiles[0].col)[0],
            grid.getTilePosition(tiles[2].row, tiles[2].col)[1]
        ];
    }
    else {
        offsets = grid.getTilePosition(tiles[0].row, tiles[0].col);
    }

    return {
        isUp: isUp,
        position: offsets
    };

    function arrangeTiles(tiles, long1, long2, short){
        var t1, t2, t3;
        if (tiles[long1].col === tiles[long2].col+1) {
            t1 = tiles[long2];
            t2 = tiles[long1];
            t3 = tiles[short];
        }
        else if (tiles[long1].col === tiles[long2].col-1) {
            t1 = tiles[long1];
            t2 = tiles[long2];
            t3 = tiles[short];
        }
        else {
            throw 'tiles does not form tripple tile';
        }
        tiles[0] = t1;
        tiles[1] = t2;
        tiles[2] = t3;
    }

    function getOrientation(tiles){
        var longRow = tiles[0].row,
            shortRow = tiles[2].row,
            shortCol = tiles[2].col,
            longCol = tiles[0].col;

        var orientation;

        if (shortRow === longRow+1) {
            orientation = false;
        }
        else if (shortRow === longRow-1) {
            orientation = true;
        }
        else {
            throw 'tiles does not form tripple tile';
        }

        if (longRow%2===0 && shortCol===longCol) {
            return orientation;
        }
        else if (longRow%2===1 && shortCol===longCol+1) {
            return orientation;
        }
        else {
            throw 'tiles does not form tripple tile';
        }
    }

};