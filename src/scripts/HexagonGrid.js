(function(){
    'use strict';

    PTX.HexagonGrid = Class.create({

        initialize: function(options){
            _.defaults(options, {
                $container: document.body,
                rows: 5,
                cols: 8,
                edge: 100
            });
            _.extend(this, options);

            var _self = this,
                tileWidth = 2 * this.edge * Math.cos(Math.PI/6),
                rowDelta = 1.5 * this.edge,
                lineDelta = tileWidth/2;

            this.tileWidth = 2 * this.edge * Math.cos(Math.PI/6);
            this.rowDelta = 1.5 * this.edge;
            this.lineDelta = lineDelta = tileWidth/2;

            var promiseAllTiles = [];

            this.$ = Snap(1400, 800);

            this.combined = [];

            this.lines = _.range(this.rows).map(function(row){
                var ld = row % 2 === 0 ? 0 : lineDelta;
                return _self.$.svg(ld, row*rowDelta);
            });

            this.grid = this.lines.map(function(line){
                return _.range(_self.cols).map(function(col){
                    var newTile = new PTX.HexagonTile({
                        grid: _self,
                        edge: _self.edge,
                        $line: line,
                        $container: line.svg(col*tileWidth, 0)
                    });
                    promiseAllTiles.push(newTile.promiseAppear());
                    return newTile;
                });
            });

            var testTiles1 = [
                this.getTile(1,2),
                this.getTile(1,1),
                this.getTile(2,2)
            ];

            var testTiles2 = [
                this.getTile(2,3),
                this.getTile(2,4),
                this.getTile(3,3)
            ];

            Promise.all(promiseAllTiles)
                .then(function(){
                    return _self.trippleTileTest(testTiles1, _self.getTilePosition(1,1));
                })
                .then(function(){
                    return _self.trippleTileTest(testTiles2, _self.getTilePosition(2,3));
                });
        },

        getTile: function(row, col){
            return this.grid[row][col];
        },

        getTilePosition: function(row, col){
            return [
                    row % 2 === 0 ? col*this.tileWidth : col*this.tileWidth + this.lineDelta,
                    row * this.rowDelta
            ];
        },

        trippleTileTest: function(tiles, offsets){
            var testTripple = new PTX.TrippleHexagonTile({
                tiles: tiles,
                grid: this,
                isUp: false,
                $container: this.$.svg(offsets[0], offsets[1]),
                edge: this.edge
            });
            return Promise.all(tiles.map(function(tile){
                return tile.promiseFade();
            })).then(testTripple.promiseAppear.bind(testTripple));
        }

    });

})();