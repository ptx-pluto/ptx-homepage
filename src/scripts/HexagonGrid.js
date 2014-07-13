(function(){
    'use strict';

    var $ = jQuery;

    PTX.HexagonGrid = Class.create({

        initialize: function(options){
            _.defaults(options, {
                $container: document.body,
                lineLimit: 5,
                tileSize: 300,
                tilePadding: 5
            });
            _.extend(this, options);
            this.lines = [[]];
            this.verticalDelta = this.tileSize*(1-Math.sqrt(3)/6);
            $(this.$container).css('display', 'relative');
        },

        addOne: function(){
            var newTile = $('<div/>').addClass('hexagon-tile');
            var line;
            if (_.last(this.lines).length < this.lineLimit) {
                line = _.last(this.lines);
            }
            else {
                line = [];
                this.lines.push(line);
            }
            newTile
                .css('top', this.lines.length*this.verticalDelta)
                .css('left', line.length*this.tileSize)
                .appendTo(this.$container);
            line.push(newTile);
        }

    });

})();