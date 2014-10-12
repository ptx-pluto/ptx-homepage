'use strict';

module.exports.getTripleHexagonArray = getTripleHexagonArray;
module.exports.getHexagonArray = getHexagonArray;
module.exports.getTrippleTileConfig = getTrippleTileConfig;


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
}


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

function getTrippleTileConfig(tiles, grid){
    var offsets, isUp;
    if (tiles[0][0] === tiles[1][0]) {
        arrangeTiles(tiles, 0, 1, 2);
    }
    else if (tiles[1][0] === tiles[2][0]) {
        arrangeTiles(tiles, 1, 2, 0);
    }
    else if (tiles[0][0] === tiles[2][0]) {
        arrangeTiles(tiles, 0, 2, 1);
    }
    else {
        throw 'tiles does not form tripple tile';
    }
    isUp = getOrientation(tiles);
    if (isUp) {
        offsets = [
            grid.getTilePosition(tiles[0][0], tiles[0][1])[0],
            grid.getTilePosition(tiles[2][0], tiles[2][1])[1]
        ];
    }
    else {
        offsets = this.getTilePosition(tiles[0][0], tiles[0][1])
    }

    return new {
        isUp: isUp,
        position: offsets
    };

    function arrangeTiles(tiles, long1, long2, short){
        var t1, t2, t3;
        if (tiles[long1][1] === tiles[long2][1]+1) {
            t1 = tiles[long2];
            t2 = tiles[long1];
            t3 = tiles[short];
        }
        else if (tiles[long1][1] === tiles[long2][1]-1) {
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
        var longRow = tiles[0][0],
            shortRow = tiles[2][0],
            shortCol = tiles[2][1],
            longCol = tiles[0][1];

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

}