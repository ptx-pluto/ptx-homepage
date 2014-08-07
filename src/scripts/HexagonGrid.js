(function(){
    'use strict';

    var $ = jQuery;

    PTX.HexagonGrid = Class.create({

        initialize: function(options){
            _.defaults(options, {
                $container: document.body,
                rows: 7,
                cols: 9,
                edge: 100
            });
            _.extend(this, options);

            var _self = this;

            this.tileWidth = 2 * this.edge * Math.cos(Math.PI/6);
            this.rowDelta = 1.5 * this.edge;
            this.lineDelta = this.tileWidth/2;
            this.paddingTop = this.edge;
            this.paddingLeft = 20+this.tileWidth/2;
            this.totalHeight = this.edge*1.5*(this.rows-1);
            this.totalWidth = this.tileWidth*(this.cols+1);

            var promiseAllTiles = [];

            this.$ = Snap(this.totalWidth, this.totalHeight);

            this.combined = [];

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

            var testTiles1 = [
                this.getTile(1,2),
                this.getTile(1,1),
                this.getTile(2,2)
            ];

            var testTiles2 = [
                this.getTile(2,3),
                this.getTile(3,2),
                this.getTile(3,3)
            ];

            var pos = [this.getTilePosition(3,2)[0], this.getTilePosition(2,3)[1]];

            Promise.all(promiseAllTiles)
                .then(function(){
                    return Promise.all([
                        _self.getTile(2,4).promiseContent('http://www.vision-call.co.uk/images/stories/events/sample.jpg'),
                        _self.trippleTileTest(testTiles1, _self.getTilePosition(1,1), false),
                        _self.trippleTileTest(testTiles2, pos, true)
                    ]);
                });
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

        trippleTileTest: function(tiles, offsets, isUp){
            var testTripple = new PTX.TrippleHexagonTile({
                tiles: tiles,
                grid: this,
                isUp: isUp,
                $container: this.$.svg(offsets[0], offsets[1]),
                edge: this.edge
            });
            return Promise.all(tiles.map(function(tile){
                return tile.promiseFade();
            })).then(testTripple.promiseAppear.bind(testTripple));
        }

    });

})();