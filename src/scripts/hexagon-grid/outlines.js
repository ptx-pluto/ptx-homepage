module.exports.getTripleHexagonArray = getTripleHexagonArray;
module.exports.getHexagonArray = getHexagonArray;


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