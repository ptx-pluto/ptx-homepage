(function(){

    'use strict';

    PTX.HexagonGrid = Class.create({

        initialize: function(options){
            _.defaults(options, {
                $container: document.body,
                rows: 7,
                cols: 9,
                edge: 100
            });
            _.extend(this, options);

            this.tileWidth = 2 * this.edge * Math.cos(Math.PI/6);
            this.rowDelta = 1.5 * this.edge;
            this.lineDelta = this.tileWidth/2;
            this.paddingTop = this.edge;
            this.paddingLeft = 20+this.tileWidth/2;
            this.totalHeight = this.edge*1.5*(this.rows-1);
            this.totalWidth = this.tileWidth*(this.cols+1);
            this.$ = Snap(this.totalWidth, this.totalHeight);

            PTX.promiseDelay(500)
                .then(this.promiseGrid.bind(this))
                .then(this.promiseContent.bind(this));
        },

        promiseGrid: function(){
            var _self = this,
                promiseAllTiles = [];

            this.lines = _.range(this.rows).map(function(row){
                var pos = _self.getTilePosition(row, 0);
                return _self.$.svg(pos[0], pos[1]);
            });

            this.grid = this.lines.map(function(line){
                return _.range(_self.cols).map(function(col){
                    var newTile = new PTX.HexagonTile({
                        grid: _self,
                        edge: _self.edge,
                        $line: line,
                        $container: line.svg(col*_self.tileWidth, 0)
                    });
                    promiseAllTiles.push(newTile.promiseAppear());
                    return newTile;
                });
            });
            return Promise.all(promiseAllTiles);
        },

        promiseContent: function(){
            var tripple1 = [
                [1,2],
                [1,1],
                [2,2]
            ];
            var tripple2 = [
                [2,3],
                [3,2],
                [3,3]
            ];
            var testimg1 = 'http://classes.yale.edu/fractals/Vlinders.gif';
            var testimg2 = 'http://www.jaeger-hansen.dk/testimage-sjh.jpg';
            var testimg3 = 'http://www.vision-call.co.uk/images/stories/events/sample.jpg';
            return Promise.all([
                this.getTile(2,4).promiseContent(testimg3),
                this.createTrippleTile(tripple1).promiseContent(testimg1),
                this.createTrippleTile(tripple2).promiseContent(testimg2)
            ]);
        },

        getTile: function(row, col){
            return this.grid[row][col];
        },

        getTilePosition: function(row, col){
            var xbase = col*this.tileWidth-this.paddingLeft;
            return [
                    row % 2 === 0 ? xbase : xbase + this.lineDelta,
                    row * this.rowDelta-this.paddingTop
            ];
        },

        createTrippleTile: function(tiles){
            var _self = this;
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
                    this.getTilePosition(tiles[0][0], tiles[0][1])[0],
                    this.getTilePosition(tiles[2][0], tiles[2][1])[1]
                ];
            }
            else {
                offsets = this.getTilePosition(tiles[0][0], tiles[0][1])
            }
            tiles = tiles.map(function(tile){
                return _self.getTile(tile[0], tile[1]);
            });

            return new PTX.TrippleHexagonTile({
                tiles: tiles,
                grid: this,
                isUp: isUp,
                $container: this.$.svg(offsets[0], offsets[1]),
                edge: this.edge
            });

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

    });

})();